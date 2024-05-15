import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';

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

// Function to fetch cart items from Firestore and populate the HTML table
async function fetchCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    let totalItems = 0;
    let totalSubtotal = 0;
    let index = 0; // Initialize index for SN

    try {
        const querySnapshot = await getDocs(collection(db, 'cart'));
        querySnapshot.forEach(doc => {
            const data = doc.data();
            console.log('Data:', data); // Log data being pulled
            const productName = data.name;
            const productImage = data.image;
            const productPrice = parseFloat(data.price);
            const productSize = data.size;
            const productQuantity = parseInt(data.quantity);
            const subtotal = productPrice * productQuantity;

            // Create HTML elements to display cart item
            const itemRow = document.createElement('tr');
            const snCell = document.createElement('td');
            snCell.textContent = ++index; // Increment index for SN
            const imageCell = document.createElement('td');
            const imageElement = document.createElement('img');
            imageElement.src = productImage;
            imageCell.appendChild(imageElement);
            const nameCell = document.createElement('td');
            nameCell.textContent = productName;
            const priceCell = document.createElement('td');
            priceCell.textContent = productPrice;
            const sizeCell = document.createElement('td');
            sizeCell.textContent = productSize;
            const quantityCell = document.createElement('td');
            quantityCell.textContent = productQuantity;
            const subtotalCell = document.createElement('td');
            subtotalCell.textContent = subtotal.toFixed(2);
            totalItems++;
            totalSubtotal += subtotal;

            itemRow.appendChild(snCell);
            itemRow.appendChild(imageCell);
            itemRow.appendChild(nameCell);
            itemRow.appendChild(priceCell);
            itemRow.appendChild(sizeCell);
            itemRow.appendChild(quantityCell);
            itemRow.appendChild(subtotalCell);

            cartItemsContainer.appendChild(itemRow);
        });

        // Update total number of items
        document.getElementById('totalItems').textContent = totalItems;

        // Update total subtotal
        document.getElementById('totalSubtotal').textContent = totalSubtotal.toFixed(2);
    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
}
console.log(fetchCartItems)

// Call the function to fetch cart items when the page loads
window.addEventListener('load', fetchCartItems);

