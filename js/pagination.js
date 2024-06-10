// Number of items per page
const itemsPerPage = 24;

// Get all container elements
const containers = document.querySelectorAll('.container');

// Calculate total number of pages
const totalPages = Math.ceil(containers.length / itemsPerPage);

// Initialize current page
let currentPage = 1;

// Function to display items for the current page
function displayItems() {
    // Calculate start and end index for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;

    // Hide all containers
    containers.forEach(container => {
        container.style.display = 'none';
    });

    // Display containers for the current page
    for (let i = startIndex; i < endIndex && i < containers.length; i++) {
        containers[i].style.display = 'inline-block';
    }

    // Update pagination information
    document.getElementById('currentPage').innerText = currentPage;
    document.getElementById('totalPages').innerText = totalPages;
}

// Function to navigate to the previous page
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayItems();
    }
}

// Function to navigate to the next page
function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        displayItems();
    }
}

// Event listeners for pagination buttons
document.getElementById('prevButton').addEventListener('click', prevPage);
document.getElementById('nextButton').addEventListener('click', nextPage);

// Display items for the initial page
displayItems();
