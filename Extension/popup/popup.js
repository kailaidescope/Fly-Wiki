const searchBar = document.getElementById("search-bar");

searchBar.addEventListener("keypress", (event) => {
    if (event.key == "Enter")
    {
        console.log("Key pressed");
    }
});

