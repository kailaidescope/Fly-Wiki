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
                chrome.runtime.sendMessage({ data: searchBar.value }, (response)=>{
                    console.log(response);
                });
                
                searchBar.value = "";
            }
        });
    }

    chrome.runtime.onMessage.addListener(async (message,sender,sendResponse)=>{
        console.log(message.data)
        
        UpdateArticles(message.title, message.description, message.link);
    });

    relatedArticlesBox = document.getElementById("related-articles-box");
    suggestedArticlesBox = document.getElementById("suggested-articles-box");

    relatedArticleTemplate = document.getElementById("related-article");
    relatedArticlesDivider = document.getElementById("horizontal-space");

    suggestedArticleTemplate = document.getElementById("suggested-article");
    suggestedArticlesDivider = document.getElementById("vertical-space");

    /* if(relatedArticlesBox)
    {
        relatedArticlesBox.removeChild(relatedArticleTemplate);
        relatedArticlesBox.removeChild(relatedArticlesDivider);

        AddRelatedArticle("Hello world", "hello world!", "", "https://trello.com/b/u4HYcIQh/flywikithesenutz");
        AddRelatedArticle("Le Petit Prince", "Adjust the targetURL variable to the URL you want to open in a new tab. Keep in mind that browser settings, extensions, or pop-up blockers may affect how new tabs are opened, and some users may have configured their browsers to open new tabs in the background.", "", "https://trello.com/b/u4HYcIQh/flywikithesenutz");

        console.log(relatedArticlesBox.children);
    }

    if(suggestedArticlesBox)
    {
        suggestedArticlesBox.removeChild(suggestedArticleTemplate);
        suggestedArticlesBox.removeChild(suggestedArticlesDivider);

        AddSuggestedArticle("EEYYA im on tv", "family guy the Godfather episode", "", "");
        AddSuggestedArticle("Hol up there", "damnnnn", "", "https://trello.com/b/u4HYcIQh/flywikithesenutz");

        console.log(suggestedArticlesBox.children);
    } */
});

function UpdateArticles(title, description, link)
{
    if(relatedArticlesBox)
    {
        for(i = 0; i < relatedArticlesBox.children.length; i++)
        {
            relatedArticlesBox.removeChild(relatedArticlesBox.children.item(i));
        }

        AddRelatedArticle(title, description, "", link);

        console.log(relatedArticlesBox.children);
    }

    if(suggestedArticlesBox)
    {
        for(i = 0; i < suggestedArticlesBox.children.length; i++)
        {
            suggestedArticlesBox.removeChild(suggestedArticlesBox.children.item(i));
        }

        //AddSuggestedArticle("EEYYA im on tv", "family guy the Godfather episode", "", "");

        console.log(suggestedArticlesBox.children);
    }
}

function CreateRelatedArticle(title, text, image, link)
{
    if(!relatedArticleTemplate)
    {
        throw new Error("No related article template initialized.");
    }

    const article = relatedArticleTemplate.cloneNode(true);

    article.addEventListener('click', () => {
        // Redirect to the URL
        window.open(link, '_blank');
    });

    article.children.item(0).children.item(0).textContent = title;
    article.children.item(0).children.item(1).textContent = text;

    return article;
}

function AddRelatedArticle(title, text, image, link)
{
    if(!relatedArticlesBox || !relatedArticlesDivider)
    {
        throw new Error("No related article container or divider initialized.");
    }

    let rel = CreateRelatedArticle(title, text, image, link);

    if(relatedArticlesBox.children.length > 0)
    {
        relatedArticlesBox.appendChild(relatedArticlesDivider.cloneNode(true));
    }
    relatedArticlesBox.appendChild(rel);
}

function CreateSuggestedArticle(title, text, image, link)
{
    if(!suggestedArticleTemplate)
    {
        throw new Error("No suggested article template initialized.");
    }

    const article = suggestedArticleTemplate.cloneNode(true);

    article.addEventListener('click', () => {
        // Redirect to the URL
        window.open(link, '_blank');
    });

    article.children.item(0).children.item(0).textContent = title;
    article.children.item(0).children.item(1).textContent = text;

    return article;
}

function AddSuggestedArticle(title, text, image, link)
{
    if(!suggestedArticlesBox || !suggestedArticlesDivider)
    {
        throw new Error("No suggested article container or divider initialized.");
    }

    let sug = CreateSuggestedArticle(title, text, image, link);

    if(suggestedArticlesBox.children.length > 0)
    {
        suggestedArticlesBox.appendChild(suggestedArticlesDivider.cloneNode(true));
    }
    suggestedArticlesBox.appendChild(sug);
}