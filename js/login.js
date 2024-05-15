import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import { getFirestore, collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';

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

// Event listener for login form submission
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('username').value; // Assuming 'username' input holds the email
  const password = document.getElementById('password').value;

  try {
    // Query Firestore to find a matching user
    const usersRef = collection(db, 'Authentication');
    const q = query(usersRef, where('email', '==', email), where('password', '==', password));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // User not found or invalid credentials
      throw new Error('Invalid email or password');
    } else {
      // Authentication successful, redirect to dashboard
      window.location.href = 'index.html';
    }
  } catch (error) {
    console.error('Login Error:', error.message);
    alert('Invalid email or password. Please try again.');
  }
});

// Toggle Password Visibility
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye-slash'); // Toggle eye-slash icon
});
