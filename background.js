// make the background script listen for messages to add a word with its definition
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'addFullWord') {
        // add the word and definition to the local storage of the browser
        const { word, definition } = message;
        chrome.storage.local.get({ words: [] }, (data) => {
            const words = data.words;
            words.push({ word, definition });
            chrome.storage.local.set({ words });
        });
    }
});
