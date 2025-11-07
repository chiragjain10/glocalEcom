import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";
import { doc, getDoc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const unsubscribeRef = useRef(null);
  const isSyncingRef = useRef(false);

  const WISHLIST_STORAGE_KEY = "wishlist";

  const toPrimaryImage = (raw) => {
    return (
      raw?.image ||
      (Array.isArray(raw?.images) && raw.images[0]) ||
      (Array.isArray(raw?.imgs) && raw.imgs[0]) ||
      raw?.img ||
      raw?.thumbnail ||
      ""
    );
  };

  const normalizeProductForWishlist = (raw) => {
    if (!raw) return raw;
    return {
      ...raw,
      title: raw?.title || raw?.name || "Untitled",
      image: toPrimaryImage(raw),
    };
  };

  const persistWishlist = async (next) => {
    if (user) {
      try {
        const ref = doc(db, "wishlists", user.uid);
        await setDoc(ref, { items: next, updatedAt: serverTimestamp() }, { merge: true });
      } catch (err) {
        console.error("Failed to persist wishlist to Firestore", err);
      }
    } else {
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.error("Failed to persist wishlist to localStorage", err);
      }
    }
  };

  const mergeUniqueById = (a, b) => {
    const seen = new Set();
    const merged = [];
    [...a, ...b].forEach((item) => {
      if (!item || item.id == null) return;
      if (seen.has(item.id)) return;
      seen.add(item.id);
      merged.push(item);
    });
    return merged;
  };

  useEffect(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }

    if (user) {
      const ref = doc(db, "wishlists", user.uid);

      (async () => {
        try {
          const snap = await getDoc(ref);
          const remote = snap.exists() ? snap.data().items || [] : [];

          let localItems = [];
          try {
            localItems = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || "[]");
          } catch {}

          const merged = mergeUniqueById(remote, localItems);
          isSyncingRef.current = true;
          setWishlist(merged);
          await setDoc(ref, { items: merged, updatedAt: serverTimestamp() }, { merge: true });
          localStorage.removeItem(WISHLIST_STORAGE_KEY);
          isSyncingRef.current = false;
        } catch (err) {
          console.error("Failed to initialize wishlist for user", err);
        }
      })();

      unsubscribeRef.current = onSnapshot(ref, (docSnap) => {
        if (!docSnap.exists()) return;
        const data = docSnap.data();
        const items = Array.isArray(data.items) ? data.items : [];
        if (!isSyncingRef.current) {
          setWishlist(items);
        }
      });
    } else {
      try {
        const localItems = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || "[]");
        setWishlist(Array.isArray(localItems) ? localItems : []);
      } catch {
        setWishlist([]);
      }
    }

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [user]);

  const addToWishlist = async (product) => {
    const normalized = normalizeProductForWishlist(product);
    let nextSnapshot = [];
    setWishlist((prev) => {
      if (prev.some((p) => p.id === normalized.id)) {
        nextSnapshot = prev;
        return prev;
      }
      const next = [...prev, normalized];
      nextSnapshot = next;
      return next;
    });
    isSyncingRef.current = true;
    try {
      await persistWishlist(nextSnapshot);
    } finally {
      isSyncingRef.current = false;
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => {
      const next = prev.filter((item) => item.id !== id);
      persistWishlist(next);
      return next;
    });
  };

  const clearWishlist = () => {
    setWishlist(() => {
      const next = [];
      persistWishlist(next);
      return next;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
