import { authChanged, fetchCategories, fetchProducts } from "../firebase/firebase.js";
import { initSwiperBanner } from "../commons/swiper.js";
import { createProduct } from "../commons/product.js";

fetchProducts().then(res => {
    res.filter(item => item.discount > 0).slice(0, 10).map(item => {
        document.querySelector('#wrapper .product-list').append(createProduct(item))
    })
})
fetchProducts().then(res => {
    res.filter(item => item.discount > 0).slice(0, 10).map(item => {
        document.querySelector('#wrapper2 .product-list').append(createProduct(item))
    })
})



fetchCategories().then(r => {
    r.map(i => {
        document.querySelector('.cat-list').innerHTML += `<a href="store.html?s=${i.name}" >${i.name}</a>`
    })
})


initSwiperBanner()



