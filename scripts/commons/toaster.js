export function showToast(message, type = 'success') {

    const toastContainer = document.getElementById('toast-container');
    

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    

    toastContainer.appendChild(toast);
    

    setTimeout(() => {
      toast.remove();
    }, 5000);
}