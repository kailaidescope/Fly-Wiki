const serverAdd = 'http://localhost:3000/';


chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    sendResponse('Query Received');
    let response = await queryWord(message.data);
    let data = await response.json();
    //console.log(data.data);
    chrome.runtime.sendMessage(data.data);
  });

async function queryWord(word){
    const token = auth();
    console.log(token)
    return fetch(serverAdd.concat(`wordQ?token=${token}&word=${word}`));
}

function queryArticle(){
    
}


function auth() {
    return new Promise( (resolve, reject) => {
        chrome.storage.local.get(["wikiAuthKey"], async (result) => {
            if (result.wikiAuthKey !== undefined) {
                resolve(result.wikiAuthKey);
            } else {
                let response = await fetch(serverAdd.concat('auth/tokenReq'))
                let data = await response.json();
                resolve(data.token)
                chrome.storage.local.set({ wikiAuthKey: data.token }, () => {
                        console.log("Value is set");
                    });
            }
        });
    });
}