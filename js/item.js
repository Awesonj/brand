
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

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get all elements with the class "quantity-controls"
    const quantityControls = document.querySelectorAll('.quantity-controls');

    // Add event listeners to all plus and minus icons
    quantityControls.forEach(control => {
        const plusIcon = control.querySelector('.fa-plus');
        const minusIcon = control.querySelector('.fa-minus');
        const quantityInput = control.querySelector('#quantity');

        // Increment quantity
        plusIcon.addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });

        // Decrement quantity, but not below 1
        minusIcon.addEventListener('click', () => {
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });

        // Lock the input text
        quantityInput.readOnly = true;
    });

    // Handle "Add to Cart" button clicks
    const addToCartButtons = document.querySelectorAll('#addToCart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Find the closest container for this button
            const container = event.target.closest('.container');

            // Extract product information
            const productName = container.querySelector('.item-info span').innerText;
            const productImage = container.querySelector('img').src;
            const productPrice = container.querySelector('.price').innerText;
            const productSize = container.querySelector('#size').value;
            const productQuantity = container.querySelector('#quantity').value;

            // Make sure a size is selected
            if (productSize === 'Size') {
                alert('Please select a size.');
                return;
            }

            // Add product to Firestore cart
            addProductToCart(productName, productImage, productPrice, productSize, productQuantity);

            // Show a confirmation message (optional)
            alert(`${productQuantity} ${productName} (Size: ${productSize}) added to cart.`);
        });
    });
});

