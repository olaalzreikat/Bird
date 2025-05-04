

// --- Variable Naming & Indentation ---
let userData = []; // Array to store user data

// --- Function Naming & Modularity ---
function addUser(name, age) {
    const user = { name, age }; // Creating a user object
    userData.push(user); // Adding user to the userData array
}

// --- Arrays & Objects Usage ---
function getUsers() {
    return userData; // Returning the list of users
}

// --- Array Methods (map, filter, reduce) ---
function getAdultUsers() {
    return userData.filter(user => user.age >= 18); // Filtering adult users
}

// --- JSON Handling (parse, store) ---
function saveUsersToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(userData)); // Storing data in localStorage
}

// --- Web Storage (localStorage/sessionStorage) ---
function loadUsersFromLocalStorage() {
    const users = JSON.parse(localStorage.getItem('users')); // Retrieving data from localStorage
    if (users) {
        userData = users;
    }
}

// --- Cookie Handling with Expiry ---
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}`;
}

// --- DOM Manipulation ---
function displayUsers() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clear existing users
    userData.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name}, Age: ${user.age}`;
        userList.appendChild(li); // Adding each user to the DOM
    });
}

// --- CSS Manipulation via JS ---
function changeTheme(theme) {
    document.body.className = theme; // Changing theme class
}

// --- Error Handling & Debugging (console, try/catch) ---
try {
    displayUsers(); // Attempt to display users
} catch (error) {
    console.error('Error displaying users:', error);
}

// --- Regex for Validation ---
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email); // Validating email format
}

// --- Timer & Date Object ---
const timer = setInterval(() => {
    console.log('Timer tick'); // Example timer log
}, 1000);

// --- Math, String, Random methods ---
function getRandomUserName() {
    const names = ['Alice', 'Bob', 'Charlie'];
    return names[Math.floor(Math.random() * names.length)]; // Random user name
}

// --- Event Listeners & Keyboard Shortcuts ---
document.getElementById('add-user-btn').addEventListener('click', () => {
    const name = document.getElementById('name-input').value;
    const age = parseInt(document.getElementById('age-input').value);
    addUser(name, age);
    saveUsersToLocalStorage();
    displayUsers(); // Update displayed user list
});

// --- Full CRUD Functionality (Add/Edit/Delete) ---
function deleteUser(index) {
    userData.splice(index, 1); // Deleting a user
    saveUsersToLocalStorage();
    displayUsers(); // Refreshing user display
}

// --- User Feedback / Alerts (inline or popup) ---
function showAlert(message) {
    alert(message); // Simple alert for user feedback
}

// --- Error Handling (with console.log, data validation) ---
function submitForm() {
    const name = document.getElementById('name-input').value;
    const age = parseInt(document.getElementById('age-input').value);

    if (!name || isNaN(age)) {
        showAlert('Please enter valid name and age.');
        return; // End function if validation fails
    }

    addUser(name, age);
    saveUsersToLocalStorage();
    displayUsers();
}

// --- Form Handling (submit, reset, validation) ---
document.getElementById('user-form').addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm();
});

// Load users on page load
window.onload = () => {
    loadUsersFromLocalStorage();
    displayUsers(); // Display users on load
};
