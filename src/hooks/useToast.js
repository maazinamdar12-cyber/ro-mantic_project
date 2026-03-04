import toast from "react-hot-toast";

export function useToast() {

  const success = (message) => {
    toast.success(message, {
      duration: 3000,
    });
  };

  const error = (message) => {
    toast.error(message, {
      duration: 4000,
    });
  };

  const loading = (message) => {
    return toast.loading(message);
  };

  const dismiss = (id) => {
    toast.dismiss(id);
  };

  return {
    success,
    error,
    loading,
    dismiss,
  };
}