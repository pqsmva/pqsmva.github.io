import { getUserDocument } from "../firebase/firebase.js";

const user = JSON.parse(sessionStorage.getItem('user'))
const userInfo = JSON.parse(sessionStorage.getItem('info-user'))[0]


getUserDocument(user.userId).then(r => {

    const {fullName, cart, orders} = r
    const email = userInfo.uid
    let tm = ''

    fullName.split(' ').map(x => tm+=x.charAt(0))

    document.querySelector('.user-profile').innerHTML = tm
    document.querySelector('.user-name .name').innerHTML = fullName
    document.querySelector('.user-email .email').innerHTML = email
    document.querySelector('.cart-items .cart-count').innerHTML = cart.length
    document.querySelector('.orders .order-count').innerHTML = orders.length


    cart.map(item => {
        document.querySelector('.history .cart').innerHTML += `<div>
        <p> ${item.name} x${item.quantity} - </p> <span>${(item.quantity * item.price).toFixed(2)} Azn</span>
        </div>`
    })


    
})




console.log(userInfo);




// document.addEventListener('DOMContentLoaded', function() {
//     const card = document.querySelector('.card');
//     const form = document.getElementById('creditCardForm');
//     const inputs = {
//         number: document.getElementById('number'),
//         name: document.getElementById('holder'),
//         expiry: document.getElementById('expiry'),
//         cvv: document.getElementById('cvv')
//     };

//     inputs.number.addEventListener('input', function(e) {
//         let value = e.target.value.replace(/\s/g, '');
//         value = value.replace(/\D/g, '');
//         value = value.replace(/(\d{4})/g, '$1 ').trim();
//         e.target.value = value;
//         document.getElementById('cardNumber').textContent = value || '•••• •••• •••• ••••';
//     });


//     inputs.name?.addEventListener('input', function(e) {
//         const value = e.target.value.toUpperCase();
//         document.getElementById('cardHolder').textContent = value || 'CARD HOLDER';
//     });


//     inputs.expiry.addEventListener('input', function(e) {
//         let value = e.target.value.replace(/\D/g, '');
//         if (value.length >= 2) {
//             value = value.slice(0,2) + '/' + value.slice(2);
//         }
//         e.target.value = value;
//         document.getElementById('cardExpiry').textContent = value || 'MM/YY';
//     });


//     inputs.cvv.addEventListener('focus', function() {
//         card.classList.add('flip');
//     });

//     inputs.cvv.addEventListener('blur', function() {
//         card.classList.remove('flip');
//     });

//     inputs.cvv.addEventListener('input', function(e) {
//         const value = e.target.value.replace(/\D/g, '');
//         e.target.value = value;
//         document.getElementById('cardCvv').textContent = value || '•••';
//     });


//     form.addEventListener('submit', function(e) {
//         e.preventDefault();
//         let isValid = true;

//         if (inputs.number.value.replace(/\s/g, '').length !== 16) {
//             document.getElementById('numberError').style.display = 'block';
//             isValid = false;
//         } else {
//             document.getElementById('numberError').style.display = 'none';
//         }

//         if (inputs.name.value.trim() === '') {
//             document.getElementById('nameError').style.display = 'block';
//             isValid = false;
//         } else {
//             document.getElementById('nameError').style.display = 'none';
//         }

//         if (!/^\d{2}\/\d{2}$/.test(inputs.expiry.value)) {
//             document.getElementById('expiryError').style.display = 'block';
//             isValid = false;
//         } else {
//             document.getElementById('expiryError').style.display = 'none';
//         }

//         if (inputs.cvv.value.length !== 3) {
//             document.getElementById('cvvError').style.display = 'block';
//             isValid = false;
//         } else {
//             document.getElementById('cvvError').style.display = 'none';
//         }

//         if (isValid) {

//             alert('Card added successfully!');
//             form.reset();
    
//             document.getElementById('cardNumber').textContent = '•••• •••• •••• ••••';
//             document.getElementById('cardHolder').textContent = 'CARD HOLDER';
//             document.getElementById('cardExpiry').textContent = 'MM/YY';
//             document.getElementById('cardCvv').textContent = '•••';
//         }
//     });
// });


// `<div class="cards">
// <div class="card-container">
//     <div class="card">
//         <div class="front">
//             <div class="card-logo">💳</div>
//             <div class="card-number" id="cardNumber">•••• •••• •••• ••••</div>
//             <div class="card-holder" id="cardHolder">CARD HOLDER</div>
//             <div class="card-expiry" id="cardExpiry">MM/YY</div>
//         </div>
//         <div class="back">
//             <div class="card-strip"></div>
//             <div class="card-cvv" id="cardCvv">•••</div>
//         </div>
//     </div>
// </div>

// <form class="form" id="creditCardForm">
//     <div class="form-group">
//         <label for="number">Card Number</label>
//         <input type="text" id="number" maxlength="19" placeholder="1234 5678 9012 3456">
//         <div class="error" id="numberError">Please enter a valid card number</div>
//     </div>

//     <div class="form-group">
//         <label for="name">Card Holder Name</label>
//         <input type="text" id="hoder" placeholder="John Doe">
//         <div class="error" id="nameError">Please enter the cardholder name</div>
//     </div>

//     <div class="expiry-cvv">
//         <div class="form-group">
//             <label for="expiry">Expiry Date</label>
//             <input type="text" id="expiry" maxlength="5" placeholder="MM/YY">
//             <div class="error" id="expiryError">Please enter a valid expiry date</div>
//         </div>

//         <div class="form-group">
//             <label for="cvv">CVV</label>
//             <input type="text" id="cvv" maxlength="3" placeholder="123">
//             <div class="error" id="cvvError">Please enter a valid CVV</div>
//         </div>
//     </div>

//     <button type="submit">Add Card</button>
// </form>
// </div>`