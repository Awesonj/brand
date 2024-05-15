import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyCsdX33vIpoDL-ZLtoKqKZRdvkdozA8RLI",
    authDomain: "breakpoint-96512.firebaseapp.com",
    projectId: "breakpoint-96512",
    storageBucket: "breakpoint-96512.appspot.com",
    messagingSenderId: "809311142963",
    appId: "1:809311142963:web:c9dd5cb3550b4eb7310f46"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const registrationForm = document.getElementById('registrationForm');

registrationForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value; // Changed from repeatPassword

  // Validate password match
  if (password !== confirmPassword) { // Changed from repeatPassword
    alert('Passwords do not match');
    return;
  }

  try {
    // Save authentication details to Firebase Firestore collection 'Authentication'
    const docRef = await addDoc(collection(db, 'Authentication'), {
      firstName,
      lastName,
      email,
      phoneNumber,
      username,
      password,
    });

    console.log('Document written with ID: ', docRef.id);
    alert('Registration successful!'); // Display success message

    // Redirect to login page
    window.location.href = 'login.html';
  } catch (error) {
    console.error('Error adding document: ', error);
    alert('Registration failed. Please try again.');
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

// Confirm Password Input // Changed from Repeat Password
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');

toggleConfirmPassword.addEventListener('click', () => {
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
    toggleConfirmPassword.classList.toggle('fa-eye-slash'); // Toggle eye-slash icon
});

// Next Button Event Listener
document.getElementById("nextStep1").addEventListener("click", function() {
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";
});
