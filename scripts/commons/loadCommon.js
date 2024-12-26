import { logoutUser } from "../firebase/firebase.js"


localStorage.setItem('default-currency', 'AZN')
localStorage.setItem('old-cur', 'AZN')
localStorage.setItem('currency', 'AZN')    



fetch('../reusable/header.html').then(res => res.text()).then(res => {
    document.querySelector('header').innerHTML = res

    const search = document.querySelector('header input')

    document.querySelector('.search-btn').addEventListener('click', () => {
        window.location.href = 'store.html?s=' + search.value
    })

    document.querySelector('header select').value = localStorage.getItem('currency')

console.log();



    if (localStorage.getItem('currency')) {
        document.querySelector('header select').value = localStorage.getItem('currency')
    }



    
    document.querySelector('header select').addEventListener('change', e => {
        localStorage.setItem('old-cur', localStorage.getItem('currency'))
        const newCur = e.target.value
        localStorage.setItem('currency', newCur)

        handleCurrency()

    })


    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');

    navbarToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        navbarToggle.classList.toggle('active');
    });



    document.querySelector('button.logout')?.addEventListener('click', ()=> {
        logoutUser()
    })


})
fetch('../reusable/footer.html').then(res => res.text()).then(res => {
    document.querySelector('footer').innerHTML = res
})



const handleCurrency = () => {
    document.querySelectorAll('.old-price').forEach(price => {
        if (price.textContent) {
            convertCurrency(price.textContent, localStorage.getItem('old-cur'), localStorage.getItem('currency')).then(r => {
                const currency = localStorage.getItem('currency')
                price.textContent = r

            })
        }
    })
    document.querySelectorAll('.new-price').forEach(price => {
        if (price.textContent) {
            convertCurrency(price.textContent, localStorage.getItem('old-cur'), localStorage.getItem('currency')).then(r => {
                const currency = localStorage.getItem('currency')
                price.innerHTML = r

                price.nextElementSibling.textContent = localStorage.getItem('currency')

            })
        }
    })


    document.querySelectorAll('.cart-item-price').forEach(item => {
        const price = Number(item.textContent.split(':')[1])

        if (price) {
            convertCurrency(price, localStorage.getItem('old-cur'), localStorage.getItem('currency')).then(r => {
                const currency = localStorage.getItem('currency')
                item.textContent = `Qiymət: ${r}`
            })
        }
        
    })



}




async function convertCurrency(amount, fromCurrency, toCurrency) {
    const apiKey = "0aecef60ce-19eff752d6-sp2l9u";
    const baseUrl = "https://api.fastforex.io";

    try {

        const url = `${baseUrl}/convert?from=${fromCurrency}&to=${toCurrency}&amount=${Number(amount)}&api_key=${apiKey}`;


        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(`API Error: ${data.error}`);
        }

        return data.result[toCurrency];
    } catch (error) {
        console.error("Currency conversion failed:", error.message);
        return null;
    }
}









  