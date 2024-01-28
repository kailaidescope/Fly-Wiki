const titles = ['one', 'two', 'three', 'four', 'five'];
const descriptions = ["NARRATOR Black screen with text; The sound of buzzing bees can be heard) According to all known laws of aviation,", "there is no way a bee should be able to fly.", "The bee, of course, flies anyway"];

document.addEventListener("DOMContentLoaded", function() {
    
    const searchBar = document.getElementById("search-bar");
    
    if (searchBar) 
    {
        searchBar.addEventListener("keypress",async function(event) 
        {
            if (event.key === "Enter") 
            {
                console.log("Input: ",searchBar.value);
                chrome.runtime.sendMessage({ data: searchBar.value }, function(response) 
                    {
                        console.log("Response received in popup.js: ", response);
                            
                        // Do something with the received response
        
                        //document.getElementById('popup-content').textContent = response.data;
                    });
                searchBar.value = "";
            }
        });
    }

    const relatedArticlesBox = document.getElementById("related-articles-box");
    const suggestedArticlesBox = document.getElementById("suggested-articles-box");

    const relatedArticleTemplate = document.getElementById("related-article");
    const relatedArticlesDivider = document.getElementById("horizontal-space");

    const suggestedArticleTemplate = document.getElementById("suggested-article");
    const suggestedArticlesDivider = document.getElementById("vertical-space");

    if(relatedArticlesBox)
    {
        ///console.log(Array.from(relatedArticlesBox));
        console.log(relatedArticleTemplate);

        const rel1 = relatedArticleTemplate.cloneNode(true);
        const hsp1 = relatedArticlesDivider.cloneNode(true);

        relatedArticlesBox.appendChild(rel1);
        relatedArticlesBox.appendChild(hsp1);

       
    }

    if(suggestedArticlesBox)
    {
        console.log(suggestedArticlesBox.children);
    }
});

