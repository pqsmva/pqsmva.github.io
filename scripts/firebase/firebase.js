import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove, setDoc, collection, getDocs, getDoc, query, where, orderBy, limit, startAfter } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { showToast } from "../commons/toaster.js";

const firebaseConfig = {
    apiKey: "AIzaSyDub0bIgPPWQg9oB-pNPgpa83W_m95rT74",
    authDomain: "e-commerce-de270.firebaseapp.com",
    projectId: "e-commerce-de270",
    storageBucket: "e-commerce-de270.firebasestorage.app",
    messagingSenderId: "203130400447",
    appId: "1:203130400447:web:db97181e95e60e1d70200a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function getUserDocRef() {
    const user = auth.currentUser;
    if (!user) {
        alert("Please sign in first!");
        throw new Error("User not signed in");
    }
    return doc(db, "users", user.uid);
}

export async function fetchProducts() {
    try {
        const productsCol = collection(db, "products");
        const snapshot = await getDocs(productsCol);
        const productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return productList

    } catch (error) {
        console.error("Error fetching products:", error);
    }
}
export async function fetchCategories() {
    try {
        const productsCol = collection(db, "categories");
        const snapshot = await getDocs(productsCol);
        const productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return productList

    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

export async function register() {
    const fullName = `${document.getElementById("first-name").value} ${document.getElementById("last-name").value}`
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phoneNumber = document.getElementById("phone-number").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            fullName: fullName,
            likedProducts: [],
            cart: [],
            orders: [],
            cards: [],
            billingAddress: [],
            phoneNumber: phoneNumber,
        });

       
        alert('Qeydiyyatdan uğurla keçdiniz, ana səhifəyə yönləndirilirsiniz!')
        setTimeout(() => {
            window.location.href = 'homepage.html'
        }, 1000)
    } catch (error) {
        console.error("Error during registration:", error.message);
        alert(error.message);
    }
}

export async function authChanged() {

    return await onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log("User is signed in:", user);
            const userId = user.uid;

            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);



            try {
                const userDocRef = doc(db, "users", userId);
                const userDoc = await getDoc(userDocRef);




                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    sessionStorage.setItem('user', JSON.stringify({ ...userData, userId: userId }))
                    let activeUser = { ...userData, userId: userId }
                    const [first, last] = activeUser.fullName.split(' ')
                    const profileIcon = `${first.charAt(0)}${last.charAt(0)}`
                    const loginBtn = document.querySelector('#login-btn')
                    const profileBtn = document.querySelector('#profile-btn a')
                    const profileItem = document.querySelector('#profile-btn')
                    profileItem?.classList.remove('hidden')
                    loginBtn?.classList.add('hidden')
                    document.querySelector('header .logout').classList.remove('hidden')
                    profileBtn?.append(profileIcon)

                    return userData


                } else {
                    console.log("No user document found.");
                }
            } catch (error) {
     
                sessionStorage.removeItem('user')
                document.querySelector('header button').classList.add('hidden')
            }
        } else {
            console.log("No user is signed in.");
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    authChanged()
})


export const getCategories = async () => {
  try {
    const db = getFirestore();
    const categoriesCollection = collection(db, 'categories');
    const querySnapshot = await getDocs(categoriesCollection);
    const categories = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return categories;
  } catch (error) {
    console.error('Error getting categories:', error);
    return []; // Return an empty array on error
  }
};


export async function addToCart(userId, product, quantityToAdd) {
    try {
        const currentCart = await getCart(userId);
        const productIndex = currentCart.findIndex(item => item.name === product.name);

        console.log(currentCart, productIndex);
        

        if (productIndex !== -1) {
            currentCart[productIndex].quantity = (+currentCart[productIndex].quantity) + (+quantityToAdd);
        } else {
            product.quantity = quantityToAdd;
            currentCart.push(product);
        }

        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, {
            cart: currentCart
        });

        if (!window.location.href.includes('product')) {
            showToast('Məhsul səbətə əlavə edildi')
        }
    } catch (error) {
        console.error("Error adding item to cart:", error);
    }
}

export async function getCart(userId) {
    try {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            console.error("User document not found.");
            alert("User not found.");
            return [];
        }

        const cart = userDoc.data().cart || [];
        console.log(cart);
        
        return cart;
    } catch (error) {
        return [];
    }
}

export async function removeFromCart(userId, productId, quantityToRemove) {
    try {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        const currentCart = await getCart(userId);

        if (!userDoc.exists()) {
            console.error("User document not found.");
            alert("User not found.");
            return;
        }

        let cart = userDoc.data().cart || [];
        const productIndex = cart.findIndex(item => item.id === productId);

        if (productIndex === -1) {
            console.warn(`Product with ID ${productId} not found in the cart.`);
            alert("Product not found in the cart.");
            return;
        }

        const product = cart[productIndex];

        if (product.quantity > quantityToRemove) {
            product.quantity -= quantityToRemove;
        } else {
            cart.splice(productIndex, 1);
        }

        await updateDoc(userDocRef, { cart });

        console.log(`Removed ${quantityToRemove} of product ${productId} from the cart.`);
    } catch (error) {
        console.error("Error while removing product from the cart:", error.message);
        alert("An error occurred while removing the product from the cart.");
    }
}

export async function signIn(email, password) {
;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in successfully:", userCredential.user);
        showToast('Giriş edildi, ana səhifəyə yönləndirilirsiniz!')
        setTimeout(()=> {
            window.location.href = '/'
        }, 1000)
    } catch (error) {
        alert('Email adresi və ya şifrə yanlışdır.')
    }
}

export async function findProductById(productId) {
    try {
        const productRef = doc(db, "products", productId); 
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {
            const productData = productSnapshot.data();
            console.log("Product found:", productData);
            return productData;
        } else {
            console.log("No product found with the given ID.");
            return null;
        }
    } catch (error) {
        console.error("Error retrieving product:", error);
        throw error; 
    }
}



export function logoutUser() {
    auth.signOut()
      .then(() => {
        document.querySelector('header button').classList.remove('hidden')
        showToast('Hesabdan çıxış edildi')
        window.location.href = "homepage.html";
      })
      .catch((error) => {
        console.error("Logout failed:", error.message);
        alert("Failed to logout: " + error.message);
      });
  }


