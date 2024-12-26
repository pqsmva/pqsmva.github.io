import { showToast } from "../commons/toaster.js"
import { addToCart, getCart, removeFromCart } from "../firebase/firebase.js"

const activeUser = JSON.parse(sessionStorage.getItem('user'))

const updateCart = () => {
    if (activeUser) {
        getCart(activeUser.userId).then(res => {
            renderCart(res)
        })
    } 
}




function renderCart(cartArray) {
    const cartListDiv = document.querySelector('.cart-page-list');
    let totalPrice = 0
    cartListDiv.innerHTML = '';


    cartArray.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'cart-item';

        totalPrice += product.quantity * (product.price * (1 - product.discount / 100));

        const imageDiv = document.createElement('div');
        imageDiv.className = 'cart-item-image';

        const img = document.createElement('img');
        img.src = product.images[0];
        img.alt = product.name;
        imageDiv.appendChild(img);

        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'cart-item-details';

        const nameH3 = document.createElement('h3');
        nameH3.className = 'cart-item-name';
        nameH3.textContent = product.name;

        const categoryP = document.createElement('p');
        categoryP.className = 'cart-item-category';
        categoryP.textContent = product.category;

        const priceP = document.createElement('p');
        priceP.className = 'cart-item-price';
        priceP.innerHTML = `
            Qiymət: ${(product.price * (1 - product.discount / 100)).toFixed(2)} <span><span>
        `;

        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'controls';

        const incrementButton = document.createElement('button');
        incrementButton.className = 'increment';
        incrementButton.textContent = '+';

        incrementButton.addEventListener('click', ()=> {
            addToCart(activeUser.userId, product, 1).then(()=> updateCart())
        })

        const quantityP = document.createElement('p');
        quantityP.className = 'cart-item-quantity';
        quantityP.textContent = product.quantity;

        const decrementButton = document.createElement('button');
        decrementButton.className = 'decrement';
        decrementButton.textContent = '-';


        decrementButton.addEventListener('click', ()=> {
            removeFromCart(activeUser.userId, product.id, 1).then(()=> updateCart())
        })

        controlsDiv.appendChild(incrementButton);
        controlsDiv.appendChild(quantityP);
        controlsDiv.appendChild(decrementButton);

        detailsDiv.appendChild(nameH3);
        detailsDiv.appendChild(categoryP);
        detailsDiv.appendChild(priceP);
        detailsDiv.appendChild(controlsDiv);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'cart-item-actions';

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-btn';
        removeButton.setAttribute('data-id', product.id);

        const removeIcon = document.createElement('i');
        removeIcon.className = 'fa-solid fa-xmark';

        removeButton.addEventListener('click', ()=> {
            removeFromCart(activeUser.userId, product.id, product.quantity).then(()=> updateCart())
        })

        removeButton.appendChild(removeIcon);
        actionsDiv.appendChild(removeButton);


        productDiv.appendChild(imageDiv);
        productDiv.appendChild(detailsDiv);
        productDiv.appendChild(actionsDiv);

        document.querySelector('.info span').textContent = totalPrice.toFixed(2) + ' Azn';

        cartListDiv.appendChild(productDiv);
    });

}






updateCart()