const titles = ['one', 'two', 'three', 'four', 'five'];
const descriptions = ["NARRATOR Black screen with text; The sound of buzzing bees can be heard) According to all known laws of aviation,", "there is no way a bee should be able to fly.", "The bee, of course, flies anyway"];

let relatedArticlesBox;
let relatedArticleTemplate;
let relatedArticlesDivider;

let suggestedArticlesBox;
let suggestedArticleTemplate;
let suggestedArticlesDivider;

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

    relatedArticlesBox = document.getElementById("related-articles-box");
    suggestedArticlesBox = document.getElementById("suggested-articles-box");

    relatedArticleTemplate = document.getElementById("related-article");
    relatedArticlesDivider = document.getElementById("horizontal-space");

    suggestedArticleTemplate = document.getElementById("suggested-article");
    suggestedArticlesDivider = document.getElementById("vertical-space");

    if(relatedArticlesBox)
    {
        relatedArticlesBox.removeChild(relatedArticleTemplate);
        relatedArticlesBox.removeChild(relatedArticlesDivider);

        AddRelatedArticle("Hello world", "hello world!", "");
        AddRelatedArticle("Renée Rap", "Woa, a baddie", "");

        console.log(relatedArticlesBox.children);
    }

    if(suggestedArticlesBox)
    {
        suggestedArticlesBox.removeChild(suggestedArticleTemplate);
        suggestedArticlesBox.removeChild(suggestedArticlesDivider);

        AddSuggestedArticle("EEYYA im on tv", "family guy the Godfather episode", "");
        AddSuggestedArticle("Hol up there", "damnnnn", "");

        console.log(suggestedArticlesBox.children);
    }
});

function CreateRelatedArticle(title, text, image)
{
    if(!relatedArticleTemplate)
    {
        throw new Error("No related article template initialized.");
    }

    const article = relatedArticleTemplate.cloneNode(true);

    article.children.item(0).children.item(0).textContent = title;
    article.children.item(0).children.item(1).textContent = text;

    return article;
}

function AddRelatedArticle(title, text, image)
{
    if(!relatedArticlesBox || !relatedArticlesDivider)
    {
        throw new Error("No related article container or divider initialized.");
    }

    let rel = CreateRelatedArticle(title, text, image);

    if(relatedArticlesBox.children.length > 0)
    {
        relatedArticlesBox.appendChild(relatedArticlesDivider.cloneNode(true));
    }
    relatedArticlesBox.appendChild(rel);
}

function CreateSuggestedArticle(title, text, image)
{
    if(!suggestedArticleTemplate)
    {
        throw new Error("No suggested article template initialized.");
    }

    const article = suggestedArticleTemplate.cloneNode(true);

    article.children.item(0).children.item(0).textContent = title;
    article.children.item(0).children.item(1).textContent = text;

    return article;
}

function AddSuggestedArticle(title, text, image)
{
    if(!suggestedArticlesBox || !suggestedArticlesDivider)
    {
        throw new Error("No suggested article container or divider initialized.");
    }

    let sug = CreateSuggestedArticle(title, text, image);

    if(suggestedArticlesBox.children.length > 0)
    {
        suggestedArticlesBox.appendChild(suggestedArticlesDivider.cloneNode(true));
    }
    suggestedArticlesBox.appendChild(sug);
}