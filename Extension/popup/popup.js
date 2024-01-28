document.addEventListener("DOMContentLoaded", function() {
    
    const searchBar = document.getElementById("search-bar");
    
    if (searchBar) {
        searchBar.addEventListener("keypress",async function(event) {
            if (event.key === "Enter") {
                console.log("Input: ",searchBar.value);
                chrome.runtime.onMessage.addListener(async (message,sender,sendResponse)=>{
                    console.log(message.data)
                });
                chrome.runtime.sendMessage({ data: searchBar.value });
                
                searchBar.value = "";
            }
        });
    }
});

