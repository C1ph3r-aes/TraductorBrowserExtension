// make the background script listen for messages to add a word with its definition
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'addFullWord') {
        const { word, definition, listName } = message;
        if(word.trim() === '' || definition.trim() === '' || listName.trim() === '') {
            console.error('Word, definition, and list name must not be empty.');
        } else {
            chrome.storage.local.get({ wordLists: {} }, (data) => {
            const wordLists = data.wordLists;
            if (!wordLists[listName]) wordLists[listName] = [];
            wordLists[listName].push({ word, definition });
            chrome.storage.local.set({ wordLists });
            });
        }
    }
});
