document.addEventListener("DOMContentLoaded", function() {
    
    const searchBar = document.getElementById("search-bar");
    
    if (searchBar) {
        searchBar.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                console.log("Input: ",searchBar.value);
                chrome.runtime.sendMessage({ data: searchBar.value }, function(response) {
                    console.log("Response received in popup.js: ", response.data);
                        
                    // Do something with the received response
    
                    //document.getElementById('popup-content').textContent = response.data;
                });
                searchBar.value = "";
            }
        });
    }
});

