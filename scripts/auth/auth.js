import { authChanged, register, signIn } from "../firebase/firebase.js";

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginToggle = document.getElementById('loginToggle');
    const registerToggle = document.getElementById('registerToggle');

    loginToggle.addEventListener('click', () => {
        loginForm.style.display = 'flex';
        registerForm.style.display = 'none';
        loginToggle.classList.add('active');
        registerToggle.classList.remove('active');
    });

    registerToggle.addEventListener('click', () => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'flex';
        registerToggle.classList.add('active');
        loginToggle.classList.remove('active');
    });
});



document.querySelector(`#registerForm`).addEventListener('submit', e => {
    e.preventDefault()
    register()
})
document.querySelector(`#loginForm`).addEventListener('submit', e => {
    e.preventDefault()
    signIn(loginForm.querySelector('#login-email').value, loginForm.querySelector('#login-password').value )
})




