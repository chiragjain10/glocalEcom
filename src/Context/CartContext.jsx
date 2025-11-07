import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";
import { doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const unsubscribeRef = useRef(null);
  const isSyncingRef = useRef(false);

  const CART_STORAGE_KEY = "cart";

  const toNumberPrice = (priceLike) => {
    if (typeof priceLike === "number") return priceLike;
    if (!priceLike) return 0;
    const n = Number(String(priceLike).replace(/[^0-9.-]+/g, ""));
    return Number.isFinite(n) ? n : 0;
  };

  const persistCart = async (nextCart) => {
    if (user) {
      try {
        const cartRef = doc(db, "carts", user.uid);
        await setDoc(
          cartRef,
          { items: nextCart, updatedAt: serverTimestamp() },
          { merge: true }
        );
      } catch (err) {
        console.error("Failed to persist cart to Firestore", err);
      }
    } else {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextCart));
      } catch (err) {
        console.error("Failed to persist cart to localStorage", err);
      }
    }
  };

  const mergeItems = (a, b) => {
    const idToItem = new Map();
    [...a, ...b].forEach((it) => {
      const existing = idToItem.get(it.id);
      if (existing) {
        idToItem.set(it.id, {
          ...existing,
          quantity: (existing.quantity || 1) + (it.quantity || 1),
        });
      } else {
        idToItem.set(it.id, { ...it, quantity: it.quantity || 1 });
      }
    });
    return Array.from(idToItem.values());
  };

  // Load cart depending on auth state
  useEffect(() => {
    // Clean up previous Firestore subscription if any
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }

    if (user) {
      const cartRef = doc(db, "carts", user.uid);

      // First time: pull doc once and merge any localStorage
      (async () => {
        try {
          const snap = await getDoc(cartRef);
          const remoteItems = snap.exists() ? snap.data().items || [] : [];

          let localItems = [];
          try {
            localItems = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
          } catch {}

          const merged = mergeItems(remoteItems, localItems);

          isSyncingRef.current = true;
          setCart(merged);
          await setDoc(cartRef, { items: merged, updatedAt: serverTimestamp() }, { merge: true });
          localStorage.removeItem(CART_STORAGE_KEY);
          isSyncingRef.current = false;
        } catch (err) {
          console.error("Failed to initialize cart for user", err);
        }
      })();

      // Subscribe to remote changes to keep in sync across tabs/devices
      unsubscribeRef.current = onSnapshot(cartRef, (docSnap) => {
        if (!docSnap.exists()) return;
        const data = docSnap.data();
        const items = Array.isArray(data.items) ? data.items : [];
        // Avoid echo loop when we are the originator
        if (!isSyncingRef.current) {
          setCart(items);
        }
      });
    } else {
      // Guest: load from localStorage
      try {
        const localItems = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
        setCart(Array.isArray(localItems) ? localItems : []);
      } catch {
        setCart([]);
      }
    }

    // Cleanup on unmount/change
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [user]);

  const normalizeProductForCart = (raw) => {
    const primaryImage = raw?.image
      || (Array.isArray(raw?.images) && raw.images[0])
      || (Array.isArray(raw?.imgs) && raw.imgs[0])
      || raw?.img
      || raw?.thumbnail
      || "";
    return {
      ...raw,
      title: raw?.title || raw?.name || "Untitled",
      image: primaryImage,
    };
  };

  const addToCart = async (product, quantity = 1) => {
    let nextSnapshot = [];
    const normalized = normalizeProductForCart(product);
    setCart((prev) => {
      const existing = prev.find((item) => item.id === normalized.id);
      const next = existing
        ? prev.map((item) =>
            item.id === normalized.id
              ? { ...item, quantity: Math.max(1, (item.quantity || 1) + (quantity || 1)) }
              : item
          )
        : [...prev, { ...normalized, quantity: quantity || 1 }];
      nextSnapshot = next;
      return next;
    });
    isSyncingRef.current = true;
    try {
      await persistCart(nextSnapshot);
    } finally {
      isSyncingRef.current = false;
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const next = prev.filter((item) => item.id !== id);
      persistCart(next);
      return next;
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) => {
      const next = prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
          : item
      );
      persistCart(next);
      return next;
    });
  };

  const clearCart = () => {
    setCart(() => {
      const next = [];
      persistCart(next);
      return next;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
