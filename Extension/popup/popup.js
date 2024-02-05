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
        
        UpdateArticles(message);
    });

    relatedArticlesBox = document.getElementById("related-articles-box");
    suggestedArticlesBox = document.getElementById("suggested-articles-box");

    relatedArticleTemplate = document.getElementById("related-article");
    relatedArticlesDivider = document.getElementById("horizontal-space");

    suggestedArticleTemplate = document.getElementById("suggested-article");
    suggestedArticlesDivider = document.getElementById("vertical-space");

    ClearArticles();

    //ExampleArticles();

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

function ClearArticles()
{
    while (relatedArticlesBox.children.length > 0)
    {
        relatedArticlesBox.removeChild(relatedArticlesBox.children.item(0));
    }

    while (suggestedArticlesBox.children.length > 0)
    {
        suggestedArticlesBox.removeChild(suggestedArticlesBox.children.item(0));
    }
}

function UpdateArticles(articleJSON)
{
    ClearArticles();

    if(relatedArticlesBox)
    {
        AddRelatedArticle(articleJSON.ans.title, articleJSON.ans.description, "", articleJSON.ans.link);
        AddRelatedArticle(articleJSON.L1.title, articleJSON.L1.description , "", articleJSON.L1.link);
        AddRelatedArticle(articleJSON.L2.title, articleJSON.L2.description , "", articleJSON.L2.link);

        //AddRelatedArticle("Water Bottle", "A water bottle is a container that is used to hold liquids, mainly water." , "", "https://en.wikipedia.org/wiki/Water_bottle");
        //AddRelatedArticle("Panopticon", "The panopticon is a design of institutional building with an inbuilt system of control, originated by the English philosopher and social theorist Jeremy Bentham." , "", "https://en.wikipedia.org/wiki/Panopticon");

        console.log(relatedArticlesBox.children);
    }

    if(suggestedArticlesBox)
    {
        //AddSuggestedArticle("Greece", "Greece,[a] officially the Hellenic Republic,[b] is a country in Southeast Europe, located on the southern tip of the Balkan peninsula." , "", "https://en.wikipedia.org/wiki/Greece");
        //AddSuggestedArticle("Rock music", "Rock is a broad genre of popular music that originated as "rock and roll" in the United States in the late 1940s and early 1950s." , "", "https://en.wikipedia.org/wiki/Rock_music");

        console.log(suggestedArticlesBox.children);
    }
}

function ExampleArticles()
{
    ClearArticles();

    if(relatedArticlesBox)
    {
        AddRelatedArticle("Water Bottle", "A water bottle is a container that is used to hold liquids, mainly water." , "", "https://en.wikipedia.org/wiki/Water_bottle");
        AddRelatedArticle("Panopticon", "The panopticon is a design of institutional building with an inbuilt system of control, originated by the English philosopher and social theorist Jeremy Bentham." , "", "https://en.wikipedia.org/wiki/Panopticon");

        console.log(relatedArticlesBox.children);
    }

    if(suggestedArticlesBox)
    {
        AddSuggestedArticle("Greece", "Greece,[a] officially the Hellenic Republic,[b] is a country in Southeast Europe, located on the southern tip of the Balkan peninsula." , "", "https://en.wikipedia.org/wiki/Greece");
        AddSuggestedArticle("Rock music", "Rock is a broad genre of popular music that originated as \"rock and roll\" in the United States in the late 1940s and early 1950s." , "", "https://en.wikipedia.org/wiki/Rock_music");

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