const activeUser = JSON.parse(sessionStorage.getItem('user'))

import { addToCart } from "../firebase/firebase.js";
import { showToast } from "./toaster.js";


export const createProduct = (product) => {
    const productContainer = document.createElement('li');
    productContainer.classList.add('product');

    const productInner = document.createElement('div');
    productInner.classList.add('product-inner');

    const productThumbnail = document.createElement('div');
    productThumbnail.classList.add('product-thumbnail');

    const hoverLink = document.createElement('a');
    hoverLink.href = '#';

    const picture1 = document.createElement('picture');
    const source1 = document.createElement('source');
    source1.setAttribute('srcset', product.images[0]);
    source1.setAttribute('type', 'image/webp');
    const img1 = document.createElement('img');
    img1.setAttribute('width', '370');
    img1.setAttribute('height', '444');
    img1.classList.add('attachment-woocommerce_thumbnail');
    img1.setAttribute('alt', product.name);
    picture1.appendChild(source1);
    picture1.appendChild(img1);

    const picture2 = document.createElement('picture');
    const source2 = document.createElement('source');
    source2.setAttribute('srcset', product.images[1]);
    source2.setAttribute('type', 'image/webp');
    const img2 = document.createElement('img');
    img2.setAttribute('loading', 'lazy');
    img2.setAttribute('width', '370');
    img2.setAttribute('height', '444');
    img2.classList.add('attachment-woocommerce_thumbnail', 'hover-image');
    picture2.appendChild(source2);
    picture2.appendChild(img2);

    hoverLink.appendChild(picture1);
    hoverLink.appendChild(picture2);

    productThumbnail.appendChild(hoverLink);

    if (product.discount > 0) {
        const saleBadge = document.createElement('span');
        saleBadge.classList.add('sale-badge');
        const onsale = document.createElement('span');
        onsale.classList.add('onsale');
        onsale.innerHTML = `<span> - ${product.discount}%</span>`;
        saleBadge.appendChild(onsale);
        productInner.appendChild(saleBadge);
    }

    const productButtons = document.createElement('div');
    productButtons.classList.add('product-buttons');


    const quickViewButton = document.createElement('a');
    quickViewButton.href = '#';
    quickViewButton.classList.add('quick-view-button');
    quickViewButton.setAttribute('data-id', product.id);
    quickViewButton.innerHTML = '<i class="fa-regular fa-eye"></i>';
    quickViewButton.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation()
        document.querySelector('.quick-view').classList.remove('hidden')
        document.querySelector('.heading button').addEventListener('click', () => {
            document.querySelector('.quick-view').classList.add('hidden')
        })
        document.querySelector('.quick-view-info .name').textContent = product.name
        document.querySelector('.quick-view-thumbnail img').setAttribute('src', product.images[0])
        document.querySelector('.price span').textContent = product.price
        document.querySelector('.category span').textContent = product.category

        document.querySelector('.plus').addEventListener('click', ()=> {
            document.querySelector('.quick-view input').value = Number(document.querySelector('.quick-view input').value) + 1
        })
        document.querySelector('.minus').addEventListener('click', ()=> {
            if (document.querySelector('.quick-view input').value > 1) {
                document.querySelector('.quick-view input').value = Number(document.querySelector('.quick-view input').value) - 1
            }
        })

        document.querySelector('.quick-view .cart-btn').addEventListener('click', ()=> {
            try {
                if (activeUser)  {
                    handleAddToCart(product, document.querySelector('.quick-view input').value)
                } else {
                    showToast('Məhsulu səbətə əlavə etmək üçün giriş edin!', "warning")
                }
            } catch (error) {
                
                
            }
        })
    });

    const addToCartButton = document.createElement('a');
    addToCartButton.href = '#';
    addToCartButton.classList.add('add-to-cart-button');
    addToCartButton.setAttribute('data-product_id', product.id);
    addToCartButton.setAttribute('data-price', product.price);
    addToCartButton.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>';
    addToCartButton.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation()
        handleAddToCart(product, 1)
    });

    

    const productName = document.createElement('span')
    productName.textContent = product.name
    productName.classList.add('product-name')

    const price = document.createElement('span')
    price.innerHTML = (product.discount > 0  ? ` <div class='prices with-discount' >
                                                <span class="old-price" >${product.price}</span>  
                                                <span> <span class="new-price" >${product.price * (1-product.discount/100)}</span> <span class="currency" >Azn</span></span>
                                                
                                                </div>` : `<div class="prices"><span>${product.price}</span><span class="currency" >Azn</span></div> `) + ''
    price.classList.add('product-name')

    // productButtons.appendChild(wishlistButton);
    productButtons.appendChild(quickViewButton);
    productButtons.appendChild(addToCartButton);
    productInner.appendChild(productThumbnail);
    productInner.appendChild(productButtons);
    productInner.appendChild(productName)
    productInner.appendChild(price)

    productInner.addEventListener('click', ()=> {
        window.location.href = `product.html?id=${product.id}`
    })


    return productInner
}







function showQuickView(productId) {

}

// Function to handle adding product to the cart
export function handleAddToCart(product, quantity) {
    if (activeUser) {
        addToCart(activeUser.userId, product, quantity)
    } else {
        showToast('Məshulu səbətə əlavə etmək üçün giriş etməlisniz!', "warning")
    }

}
