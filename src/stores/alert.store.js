import { create } from "zustand";

const useAlertStore = create((set) => ({
    isOpen: false,
    message: "",
    onConfirm: null,
    confirmText: "Confirm",
    cancelText: "Cancel",

    showAlert: ({ message, onConfirm, confirmText, cancelText }) => {
        set({
            isOpen: true,
            message,
            onConfirm,
            confirmText: confirmText || "Confirm",
            cancelText: cancelText || "Cancel",
        });
    },

    hideAlert: () => set({ isOpen: false, message: "", onConfirm: null, confirmText: "Confirm", cancelText: "Cancel" })
}));

export default useAlertStore;
