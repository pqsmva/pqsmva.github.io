const profilePage = {
    'account': `<div class="account-info">
            <form>
                <div class="form-group">
                    <label for="name" class="required">Ad</label>
                    <input type="text" id="name" required>
                </div>

                <div class="form-group">
                    <label for="surname" class="required">Soyad</label>
                    <input type="text" id="surname" required>
                </div>

                <div class="form-group">
                    <label for="email" class="required">E-posta adresi</label>
                    <input type="email" id="email" value="huseynelig@gmail.com" required>
                </div>

                <h2>Parola değiştirme</h2>

                <div class="form-group">
                    <label for="current-password">Mevcut parola (değişmeden bırakmak için boş bırakın)</label>
                    <div class="password-field">
                        <input type="password" id="current-password">
                        <span class="password-toggle">👁️</span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="new-password">Yeni parola (değişmeden bırakmak için boş bırakın)</label>
                    <div class="password-field">
                        <input type="password" id="new-password">
                        <span class="password-toggle">👁️</span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="confirm-password">Yeni parolayı onayla</label>
                    <div class="password-field">
                        <input type="password" id="confirm-password">
                        <span class="password-toggle">👁️</span>
                    </div>
                </div>

                <button type="submit">Değişiklikleri kaydet</button>
            </form>
        </div>`,
    'cards': `        <div class="cards">
            <div class="card-container">
                <div class="card">
                    <div class="front">
                        <div class="card-logo">💳</div>
                        <div class="card-number" id="cardNumber">•••• •••• •••• ••••</div>
                        <div class="card-holder" id="cardHolder">CARD HOLDER</div>
                        <div class="card-expiry" id="cardExpiry">MM/YY</div>
                    </div>
                    <div class="back">
                        <div class="card-strip"></div>
                        <div class="card-cvv" id="cardCvv">•••</div>
                    </div>
                </div>
            </div>
    
            <form class="form" id="creditCardForm">
                <div class="form-group">
                    <label for="number">Card Number</label>
                    <input type="text" id="number" maxlength="19" placeholder="1234 5678 9012 3456">
                    <div class="error" id="numberError">Please enter a valid card number</div>
                </div>
    
                <div class="form-group">
                    <label for="name">Card Holder Name</label>
                    <input type="text" id="hoder" placeholder="John Doe">
                    <div class="error" id="nameError">Please enter the cardholder name</div>
                </div>
    
                <div class="expiry-cvv">
                    <div class="form-group">
                        <label for="expiry">Expiry Date</label>
                        <input type="text" id="expiry" maxlength="5" placeholder="MM/YY">
                        <div class="error" id="expiryError">Please enter a valid expiry date</div>
                    </div>
    
                    <div class="form-group">
                        <label for="cvv">CVV</label>
                        <input type="text" id="cvv" maxlength="3" placeholder="123">
                        <div class="error" id="cvvError">Please enter a valid CVV</div>
                    </div>
                </div>
    
                <button type="submit">Add Card</button>
            </form>
        </div>`,
    'adress':  `<div class="container">
        <h1>Add Shipping Address</h1>
        <form id="shipping-address-form" action="#" method="POST">
            <div>
                <label for="full-name">Full Name</label>
                <input type="text" id="full-name" name="full-name" required>
            </div>
            <div>
                <label for="address-line1">Address Line 1</label>
                <input type="text" id="address-line1" name="address-line1" required>
            </div>
            <div>
                <label for="address-line2">Address Line 2 (Optional)</label>
                <input type="text" id="address-line2" name="address-line2">
            </div>
            <div class="form-row">
                <div>
                    <label for="city">City</label>
                    <input type="text" id="city" name="city" required>
                </div>
                <div>
                    <label for="state">State/Province</label>
                    <input type="text" id="state" name="state" required>
                </div>
            </div>
            <div class="form-row">
                <div>
                    <label for="postal-code">Postal Code</label>
                    <input type="text" id="postal-code" name="postal-code" required>
                </div>
                <div>
                    <label for="country">Country</label>
                    <select id="country" name="country" required>
                        <option value="">Select a country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <!-- Add more countries as needed -->
                    </select>
                </div>
            </div>
            <div>
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" required>
            </div>
            <button type="submit">Add Address</button>
        </form>
    </div>`
}


document.querySelectorAll('.tabs button').forEach(tab => {
    tab.addEventListener('click', ()=> {
        document.querySelector('.profile-container').innerHTML = profilePage[tab.getAttribute('tab-name')]
    })
} )





document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.card');
    const form = document.getElementById('creditCardForm');
    const inputs = {
        number: document.getElementById('number'),
        name: document.getElementById('holder'),
        expiry: document.getElementById('expiry'),
        cvv: document.getElementById('cvv')
    };

    // Format card number with spaces
    inputs.number.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = value;
        document.getElementById('cardNumber').textContent = value || '•••• •••• •••• ••••';
    });

    // Format name
    inputs.name?.addEventListener('input', function(e) {
        const value = e.target.value.toUpperCase();
        document.getElementById('cardHolder').textContent = value || 'CARD HOLDER';
    });

    // Format expiry date
    inputs.expiry.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0,2) + '/' + value.slice(2);
        }
        e.target.value = value;
        document.getElementById('cardExpiry').textContent = value || 'MM/YY';
    });

    // Handle CVV
    inputs.cvv.addEventListener('focus', function() {
        card.classList.add('flip');
    });

    inputs.cvv.addEventListener('blur', function() {
        card.classList.remove('flip');
    });

    inputs.cvv.addEventListener('input', function(e) {
        const value = e.target.value.replace(/\D/g, '');
        e.target.value = value;
        document.getElementById('cardCvv').textContent = value || '•••';
    });

    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Card number validation (simple check for 16 digits)
        if (inputs.number.value.replace(/\s/g, '').length !== 16) {
            document.getElementById('numberError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('numberError').style.display = 'none';
        }

        // Name validation
        if (inputs.name.value.trim() === '') {
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('nameError').style.display = 'none';
        }

        // Expiry validation (simple format check)
        if (!/^\d{2}\/\d{2}$/.test(inputs.expiry.value)) {
            document.getElementById('expiryError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('expiryError').style.display = 'none';
        }

        // CVV validation
        if (inputs.cvv.value.length !== 3) {
            document.getElementById('cvvError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('cvvError').style.display = 'none';
        }

        if (isValid) {
            // Here you would typically send the form data to your server
            alert('Card added successfully!');
            form.reset();
            // Reset card display
            document.getElementById('cardNumber').textContent = '•••• •••• •••• ••••';
            document.getElementById('cardHolder').textContent = 'CARD HOLDER';
            document.getElementById('cardExpiry').textContent = 'MM/YY';
            document.getElementById('cardCvv').textContent = '•••';
        }
    });
});