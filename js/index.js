import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsdX33vIpoDL-ZLtoKqKZRdvkdozA8RLI",
    authDomain: "breakpoint-96512.firebaseapp.com",
    projectId: "breakpoint-96512",
    storageBucket: "breakpoint-96512.appspot.com",
    messagingSenderId: "809311142963",
    appId: "1:809311142963:web:c9dd5cb3550b4eb7310f46"
};

// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to add product to Firestore cart collection
async function addProductToCart(productName, productImage, productPrice, productSize, productQuantity) {
    try {
        const docRef = await addDoc(collection(db, 'cart'), {
            name: productName,
            image: productImage,
            price: productPrice,
            size: productSize,
            quantity: productQuantity
        });
        console.log('Document written with ID: ', docRef.id);
    } catch (error) {
        console.error('Error adding product to cart:', error);
    }
}

// Event listener for "Add to Cart" buttons
document.querySelectorAll('#addToCart').forEach(button => {
    button.addEventListener('click', function () {
        // Get the container of the product
        const container = button.closest('.container');
        // Get product details
        const productName = container.querySelector('.item-info > span:first-child').textContent;
        const productImage = container.querySelector('img').src;
        const productPrice = container.querySelector('.item-info > .price').textContent;
        const productSize = container.querySelector('#size').value;
        const productQuantity = container.querySelector('#quantity').value;

        // Add product to Firestore cart
        addProductToCart(productName, productImage, productPrice, productSize, productQuantity);
    });
});

// Plus icon event listener
document.querySelector('.fa-plus').addEventListener('click', function() {
    const input = document.getElementById('quantity');
    input.value = parseInt(input.value) + 1;
});

// Minus icon event listener
document.querySelector('.fa-minus').addEventListener('click', function() {
    const input = document.getElementById('quantity');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
});

// Lock the input text
document.getElementById('quantity').readOnly = true;
