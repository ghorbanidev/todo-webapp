import { createPortal } from "react-dom";
import useAlertStore from "../../stores/alert.store";
import Button from "./Button";

const Alert = () => {
    const { isOpen, message, onConfirm, confirmText, cancelText, hideAlert } = useAlertStore(state => state);

    if (!isOpen) return null;


    const handleConfirm = () => {
        if (onConfirm) onConfirm();
        hideAlert();
    };

    const handleCancel = () => hideAlert();

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md backdrop-saturate-150">
            <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-sm transition-all">
                <p className="text-center text-lg font-medium mb-6">{message}</p>
                <div className="flex justify-center gap-4">
                    <Button variant="secondary" onClick={handleCancel}> {cancelText}</Button>
                    <Button variant="danger" onClick={handleConfirm}> {confirmText}</Button>
                </div>
            </div>
        </div>,
        document.getElementById("portal-root")
    );
};

export default Alert;
