import { authChanged, fetchCategories, fetchProducts } from "../firebase/firebase.js";
import { initSwiperBanner } from "../commons/swiper.js";
import { createProduct } from "../commons/product.js";

fetchProducts().then(res => {
    res.filter(item => item.discount > 0).slice(0, 10).map(item => {
        document.querySelector('.product-list').append(createProduct(item))
    })
})


fetchCategories().then(r => console.log(r))

initSwiperBanner()



