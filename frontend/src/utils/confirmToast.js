import { toast } from "sonner";

export const confirmToast = ({
    title,
    description,
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    onConfirm
}) => {
    toast(title, {
        description,
        action: {
            label: confirmLabel,
            onClick: onConfirm
        },
        cancel: {
            label: cancelLabel
        }
    });
};