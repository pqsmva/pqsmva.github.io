import { showToast } from "../commons/toaster.js";
import { addToCart, findProductById } from "../firebase/firebase.js";

const user = JSON.parse(sessionStorage.getItem('user')) 
let prod = {}

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id') || ''

const productGallery = document.querySelector('.product-gallery')
const breadCrumbName = document.querySelector('.breadcrumb span')
const mainName = document.querySelector('h1')
const originalPrice = document.querySelector('.original-price')
const discountedPrice = document.querySelector('.discounted-price')
const stockCount = document.querySelector('.stock-count')
const categoryItem = document.querySelector('.category p')
const discountBadge = document.querySelector('.discount-badge')

let amounStock = 0

findProductById(productId).then(res => {
    const {images, name, price, discount, supply, category} = res
    amounStock = supply
    prod = res

    breadCrumbName.textContent = name
    mainName.textContent = name

    document.querySelector('title').textContent = `Jewel.az | ${name}`

    images.map(img => {
        const image = document.createElement('img')
        image.setAttribute('src', img)
        productGallery.append(image)
    })

    originalPrice.textContent = price.toFixed(2)

    if (discount == 0) {
        originalPrice.style.display = 'none'
        discountBadge.style.display = 'none'
    } 
    
    discountBadge.textContent = `${discount}%`


    discountedPrice.innerHTML = (price * (1 - discount/100)).toFixed(2)

    stockCount.textContent = supply

    categoryItem.textContent = `Kategoriya: ${category}`


    document.querySelector('.add-to-cart-btn').addEventListener('click', (e)=> {   
            if (user) {
                addToCart(user.userId, res, cartCountInput.value).then(r =>showToast('Məshul uğurla səbətə əlavə edildi'))
            } else {
                showToast('Məshulu səbətə əlavə etmək üçün giriş etməlisniz!', "warning")
            }   

        
    })
})

function share(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Bu saytı görməlisinizzz");
  
    let shareUrl;
  
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "pinterest":
        shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        break;
      default:
        alert("Platform not supported!");
        return;
    }
    window.open(shareUrl, "_blank");
}
  
document.querySelectorAll('.social-share a').forEach(link => {
    const name = link.firstChild
    const platform = name.getAttribute('class').split(' ')[1].split('-')[1]
    
    
    
    link.addEventListener('click', () => {
        share(platform)       
    })
});


const cartCountInput = document.querySelector('.cart-count')

document.querySelector('button.plus').addEventListener('click', e => {
    cartCountInput.value = (+cartCountInput.value) + 1

    if (amounStock == cartCountInput.value) {
        e.target.disabled = true
    } 
})

document.querySelector('button.minus').addEventListener('click', e => {
    if (cartCountInput.value > 1) {
        cartCountInput.value = (+cartCountInput.value) - 1
    }

    if (amounStock > cartCountInput.value && document.querySelector('button.plus').disabled) {
        document.querySelector('button.plus').disabled = false
    }
})



