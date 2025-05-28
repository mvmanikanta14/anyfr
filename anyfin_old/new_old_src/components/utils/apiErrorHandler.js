import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const handleApiError = (error, customMessage = "Something went wrong!") => {
    console.error("API Error:", error);

    let errorMessage = customMessage; // Default message

    if (error.response) {
        // Server responded with an error (like 400, 404, 500)
        errorMessage = error.response.data.error || "Server error!";
    } else if (error.request) {
        // Request made but no response received
        errorMessage = "No response from server! Please check your connection.";
    } else {
        // Other unknown errors (like network issues)
        errorMessage = error.message;
    }

    // Show toast notification
    toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000, // Closes after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
};

export default handleApiError;
