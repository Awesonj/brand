// Function to search all pages of the website
function searchAllPages(query) {
    // Convert the query to lowercase for case-insensitive matching
    query = query.toLowerCase();

    // Get all containers
    var containers = document.querySelectorAll('.container');

    // Loop through each container
    containers.forEach(function(container) {
        // Check if the container has an image with alt attribute containing the query
        var image = container.querySelector('img');
        var altText = image.alt.toLowerCase();
        
        // Check if the query exists in the alt attribute of the image or in the span text content
        var span = container.querySelector('span');
        var spanText = span ? span.textContent.toLowerCase() : '';

        // Check if the query exists in either the alt attribute or the span text content
        if (altText.includes(query) || spanText.includes(query)) {
            // If the query is found, display the container
            container.style.display = 'block';
        } else {
            // If the query is not found, hide the container
            container.style.display = 'none';
        }
    });
}

// Event listener for the main search button
document.getElementById('searchButton').addEventListener('click', function() {
    var query = document.getElementById('staffIdInput').value;
    searchAllPages(query);
});

// Event listener for the sidebar search button
document.getElementById('searchButtonSidebar').addEventListener('click', function() {
    var query = document.getElementById('searchInput').value;
    searchAllPages(query);
});
