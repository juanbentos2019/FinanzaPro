document.addEventListener('DOMContentLoaded', function() {
    const link = document.getElementById('link');
    
    // Set the desired URL here
    const targetUrl = "index.html"; // Replace with your actual URL
    
    link.addEventListener('click', function(e) {
        e.preventDefault();
        window.open(targetUrl, '_blank');
    });
});