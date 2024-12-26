import { authChanged } from "../firebase/firebase.js"





authChanged().then(res => {

    const activeUser = JSON.parse(sessionStorage.getItem('user'))

    if (activeUser) {
        const [first, last] = activeUser.fullName.split(' ')
        const profileIcon = `${first.charAt(0)}${last.charAt(0)}`
        const loginBtn = document.querySelector('#login-btn')
        const profileBtn = document.querySelector('#profile-btn a')
        const profileItem = document.querySelector('#profile-btn')
        profileItem?.classList.remove('hidden')
        loginBtn?.classList.add('hidden')
        profileBtn?.append(profileIcon)
    }
})