import { toast } from "react-hot-toast";

export const toastService = {
  success: (message) => {
    toast.success(message, {
      duration: 3000,
      position: "top-right",
      style: {
        background: "#10B981",
        color: "#fff",
      },
    });
  },

  error: (message) => {
    toast.error(message, {
      duration: 4000,
      position: "top-right",
      style: {
        background: "#EF4444",
        color: "#fff",
      },
    });
  },

  loading: (message) => {
    return toast.loading(message, {
      position: "top-right",
    });
  },

  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },
};
