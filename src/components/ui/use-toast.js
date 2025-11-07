import { useState, useEffect, useCallback } from "react";

const TOAST_LIMIT = 3;
let count = 0;

function generateId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

const toastStore = {
  state: {
    toasts: [],
  },
  listeners: [],
  
  getState: () => toastStore.state,
  
  setState: (nextState) => {
    if (typeof nextState === 'function') {
      toastStore.state = nextState(toastStore.state);
    } else {
      toastStore.state = { ...toastStore.state, ...nextState };
    }
    
    toastStore.listeners.forEach(listener => listener(toastStore.state));
  },
  
  subscribe: (listener) => {
    toastStore.listeners.push(listener);
    return () => {
      toastStore.listeners = toastStore.listeners.filter(l => l !== listener);
    };
  }
};

export const toast = ({ ...props }) => {
  const id = generateId();

  const update = (props) =>
    toastStore.setState((state) => ({
      ...state,
      toasts: state.toasts.map((t) =>
        t.id === id ? { ...t, ...props } : t
      ),
    }));

  const dismiss = () => toastStore.setState((state) => ({
    ...state,
    toasts: state.toasts.filter((t) => t.id !== id),
  }));

  toastStore.setState((state) => ({
    ...state,
    toasts: [
      { ...props, id, dismiss },
      ...state.toasts,
    ].slice(0, TOAST_LIMIT),
  }));

  return {
    id,
    dismiss,
    update,
  };
};

// Convenience functions for different toast types
export const toastSuccess = (title, description, options = {}) => {
  return toast({
    type: 'success',
    title,
    description,
    duration: 4000,
    ...options,
  });
};

export const toastError = (title, description, options = {}) => {
  return toast({
    type: 'error',
    title,
    description,
    duration: 6000,
    ...options,
  });
};

export const toastWarning = (title, description, options = {}) => {
  return toast({
    type: 'warning',
    title,
    description,
    duration: 5000,
    ...options,
  });
};

export const toastInfo = (title, description, options = {}) => {
  return toast({
    type: 'info',
    title,
    description,
    duration: 4000,
    ...options,
  });
};

export const toastCart = (title, description, options = {}) => {
  return toast({
    type: 'cart',
    title,
    description,
    duration: 3000,
    ...options,
  });
};

export const toastWishlist = (title, description, options = {}) => {
  return toast({
    type: 'wishlist',
    title,
    description,
    duration: 3000,
    ...options,
  });
};

export function useToast() {
  const [state, setState] = useState(toastStore.getState());
  
  useEffect(() => {
    const unsubscribe = toastStore.subscribe((state) => {
      setState(state);
    });
    
    return unsubscribe;
  }, []);
  
  useEffect(() => {
    const timeouts = [];

    state.toasts.forEach((toast) => {
      if (toast.duration === Infinity) {
        return;
      }

      const timeout = setTimeout(() => {
        toast.dismiss();
      }, toast.duration || 5000);

      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [state.toasts]);

  const dismiss = useCallback((toastId) => {
    toastStore.setState((state) => ({
      ...state,
      toasts: state.toasts.filter((t) => t.id !== toastId),
    }));
  }, []);

  return {
    toast,
    toasts: state.toasts,
    dismiss,
    toastSuccess,
    toastError,
    toastWarning,
    toastInfo,
    toastCart,
    toastWishlist,
  };
}
