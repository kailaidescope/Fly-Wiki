const relatedArticlesBox_template = `
<div class="related" id="related-box>
    <h1>Related Articles</h1>
    <div class="related-articles" id="related-articles-box">
    </div>
</div>
`;

const relatedArticleTemplate_template = `
<div class="rec-article" id="related-article">
    <div class="hbox-item">
        <h2>Article Title</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <div class="hbox-item-img">
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png" alt="Wikipedia logo" width="50" height="50">
    </div>
</div>
`;

const relatedArticleDivider_template = `
<div class="hspace" id="horizontal-space"></div>
`;

let relatedArticlesBox = document.createElement("div");
let relatedArticleTemplate;
let relatedArticleDivider;

let overlay = null;

function UpdateArticles(title, description, link)
{

}

// Content script (content.js) to create the overlay
function createOverlay(text, top, left) {
    // Create an overlay element

    if(overlay != null){
        document.body.removeChild(overlay);
    }

    overlay = document.createElement("div");
    overlay.id = "webPageOverlay";
    overlay.textContent = text;
    
    // Apply styles to the overlay
    overlay.style.position = "absolute";
    overlay.style.top = Math.floor(top).toString()+"px";
    overlay.style.left = Math.floor(left).toString()+"px";
    overlay.style.zIndex = "1000";
    overlay.background = "#B895E5";

    // Append the overlay to the body
    document.body.appendChild(overlay);
}

function removeOverlay(){
    if(overlay != null)
    {
        document.body.removeChild(overlay);
        overlay = null;
    }
}

document.addEventListener('mouseup', function () {
    console.log("mouse up");
    const selection = window.getSelection();
    const highlightedText = selection.toString().trim();

    if (highlightedText !== '' && selection.rangeCount > 0) {
        //chrome.runtime.sendMessage({ action: 'highlightDetected', highlightedText: highlightedText });

        console.log(highlightedText);

        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        // Log the position information
        /* console.log("Top: " + rect.top);
        console.log("Left: " + rect.left);
        console.log("Bottom: " + rect.bottom);
        console.log("Right: " + rect.right);
        console.log("Width: " + rect.width);
        console.log("Height: " + rect.height); */

        chrome.runtime.sendMessage({ data: highlightedText }, (response)=>{
            console.log(response);
        });

        createOverlay(highlightedText, rect.top+rect.height, rect.left);
    } else {
        removeOverlay();
    }
});

chrome.runtime.onMessage.addListener(async (message,sender,sendResponse)=>{
    console.log(message.data)

    if(overlay != null)
    {
        overlay.textContent = message.ans.title + "\n" + message.ans.description;
    }
});

// Create the overlay when the content script is injected
//createOverlay();

