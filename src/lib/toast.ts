import { toast } from "sonner";

interface ToastProps {
  message?: string;
  type: "default" | "success" | "info" | "warning" | "error";
}

export default function showToast({ message, type }: ToastProps) {
  if (type === "success") {
    toast.success(message);
  } else if (type === "info") {
    toast.info(message);
  } else if (type === "warning") {
    toast.warning(message);
  } else if (type === "error") {
    toast.error(message);
  } else {
    toast(message);
  }
}
