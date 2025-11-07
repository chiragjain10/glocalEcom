import { auth, db, storage } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from 'firebase/auth';

export const uploadOrderImages = async (user, files = []) => {
  if (!Array.isArray(files) || files.length === 0) return [];
  const userId = user?.uid || 'guest';
  const uploaded = await Promise.all(
    files.map(async (file, index) => {
      const storageRef = ref(
        storage,
        `orders/${userId}/${Date.now()}_${index}_${file.name}`
      );
      const snapshot = await uploadBytes(storageRef, file);
      return getDownloadURL(snapshot.ref);
    })
  );
  return uploaded;
};

export const createOrderAndParcelDocs = async ({
  user,
  order,
  imageUrls = [],
  paymentMethod,
  paymentStatus,
  paymentDetails = null,
}) => {
  const trackingId = genTrackingId(order?.id);

  const orderPayload = {
    userId: user?.uid || 'guest',
    userEmail: user?.email || order?.shipping?.email,
    orderId: order?.id,
    items: order?.items || [],
    shipping: order?.shipping || {},
    pricing: order?.pricing || {},
    paymentMethod,
    paymentStatus,
    paymentDetails: paymentDetails || undefined,
    status: paymentStatus === 'paid' ? 'processing' : 'pending',
    imageUrls,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    trackingId,
    trackingStatus: 'order_placed',
    trackingHistory: [
      {
        status: 'order_placed',
        timestamp: new Date(),
        description: 'Order has been placed successfully',
      },
    ],
  };

  const orderRef = await addDoc(collection(db, 'orders'), orderPayload);

  const parcelPayload = {
    userId: user?.uid || 'guest',
    parcelId: order?.id,
    fullName: order?.shipping?.fullName,
    phone: order?.shipping?.phone,
    email: order?.shipping?.email,
    pickupAddress: order?.shipping?.address,
    dropAddress: `${order?.shipping?.city || ''}, ${order?.shipping?.state || ''} ${order?.shipping?.zipCode || ''}`.trim(),
    weight: (order?.items || []).reduce((sum, item) => sum + (item.weight || 1), 0),
    description: `Order #${order?.id} - ${(order?.items || []).length} items`,
    status: 'received',
    imageUrl: imageUrls[0] || null,
    createdAt: serverTimestamp(),
    orderRef: orderRef.id,
    trackingId,
  };

  await addDoc(collection(db, 'parcels'), parcelPayload);

  return { orderDocId: orderRef.id, trackingId };
};

export const placeCODOrder = async ({ user, order, files = [] }) => {
  const imageUrls = await uploadOrderImages(user, files);
  return createOrderAndParcelDocs({
    user,
    order,
    imageUrls,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
  });
};

export const placePaidOrder = async ({
  user,
  order,
  files = [],
  gateway = 'razorpay',
  paymentDetails = {},
}) => {
  const imageUrls = await uploadOrderImages(user, files);
  return createOrderAndParcelDocs({
    user,
    order,
    imageUrls,
    paymentMethod: paymentDetails?.method || 'online',
    paymentStatus: 'paid',
    paymentDetails: { gateway, ...paymentDetails },
  });
};

// Simple tracking id generator
export const genTrackingId = (seed = '') => {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  const s = (seed || '').toString().slice(-4).toUpperCase();
  return `GLC-${ts}-${rnd}${s ? '-' + s : ''}`;
};

// Ensure user account exists from checkout details. If not logged-in, create Auth user,
// store profile in Firestore 'users' collection, and send a password setup email.
export const ensureUserFromCheckout = async (shipping = {}) => {
  const email = (shipping?.email || '').trim();
  if (!email) return null;

  // Generate a temporary strong password (user will reset via email)
  const tmpPassword = Math.random().toString(36).slice(-10) + 'Aa1!';

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, tmpPassword);
    const user = cred.user;

    // Update display name
    if (shipping?.fullName) {
      try { await updateProfile(user, { displayName: shipping.fullName }); } catch {}
    }

    // Store user profile in Firestore
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      fullName: shipping?.fullName || '',
      phone: shipping?.phone || '',
      address: shipping?.address || '',
      city: shipping?.city || '',
      state: shipping?.state || '',
      zipCode: shipping?.zipCode || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      source: 'checkout_auto_signup'
    }, { merge: true });

    // Send password reset to let user set their own password securely
    try { await sendPasswordResetEmail(auth, email); } catch {}

    return user;
  } catch (err) {
    // If account already exists, we cannot create; just return null and frontend can proceed as guest
    console.warn('ensureUserFromCheckout: could not create user', err?.code || err);
    return null;
  }
};
