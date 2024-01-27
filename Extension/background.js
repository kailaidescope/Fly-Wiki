const serverAdd = 'http://localhost:3000/'

// chrome.storage.local.set({ key: value }).then(() => {
//     console.log("Value is set");
// });

// chrome.storage.local.get(["key"]).then((result) => {
//     console.log("Value is " + result.key);
// });

// chrome.runtime.sendMessage({ data: "Hello from popup.js to background.js!" }, function(response) {
//     console.log("Response received in popup.js:", response);
//     // Do something with the received response
//     document.getElementById('popup-content').textContent = response.data;
//   });

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    console.log("Message received in background.js:", message.data);
    let data = await queryWord(message.data)
    sendResponse(data)
  });

async function queryWord(word){
    const token  = await auth();
        fetch(serverAdd.concat(`wordQ?token=${token}&word=${word}`))
            .then(response => {
                if (!response.ok) {
                        throw new Error('HTTP request failed with status:', response.status);
                    }
                    return response.json();
                })
            .then(data => {
                    const value = data; 
                    resolve(data);
                })
            .catch(error => {
                    console.error('Error:', error.message);
                    reject(error);
                });
}

function queryArticle(){
    
}


function auth() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(["wikiAuthKey"], (result) => {
            if (result.wikiAuthKey !== undefined) {
                resolve(result.wikiAuthKey);
            } else {
                fetch(serverAdd.concat('auth/tokenReq'))
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('HTTP request failed with status:', response.status);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        const value = data; 
                        chrome.storage.local.set({ wikiAuthKey: value }, () => {
                            console.log("Value is set");
                            resolve(value);
                        });
                    })
                    .catch(error => {
                        console.error('Error:', error.message);
                        reject(error);
                    });
            }
        });
    });
}