// retrieve the object in the local storage of the browser to show the lists of words and definitions
chrome.storage.local.get({ wordLists: {} }, (data) => {
const wordLists = data.wordLists;
const divListNames = document.getElementById('div-lists');

if(Object.keys(wordLists).length === 0) {
    let pNoLists = document.createElement('p');
    pNoLists.textContent = "No lists";
    divListNames.appendChild(pNoLists);
}

// for each list, add a titel, a non-ordered list and a delete button
for (const list in wordLists) {
    ListName = document.createElement('h3');
    deleteListButton = document.createElement('button');
    ulListName = document.createElement('ul');

    ListName.textContent = list;
    deleteListButton.textContent = "Delete list";

    // delete the list when we pressed on the button
    deleteListButton.onclick = function () {
        chrome.storage.local.get({ wordLists: {} }, (data) => {
        const wordLists = data.wordLists;
        if(confirm("Are you sure you want to delete all stored words in this list: " + list +"?")) {
            delete wordLists[list];
            chrome.storage.local.set({ wordLists });
            alert(list + " deleted.")
            location.reload();
        }
        });
    }

    divListNames.appendChild(ListName);
    divListNames.appendChild(deleteListButton);
    divListNames.appendChild(ulListName);


    // add the words and definitions to to non-ordered list
    for(item in wordLists[list]) {
        liListItem = document.createElement('li');
        liListItem.textContent = `${wordLists[list][item].word}: ${wordLists[list][item].definition}`;
        ulListName.appendChild(liListItem);
    }
}
});

// clear all lists at once
document.getElementById('delete-all').onclick = function () {
    if (confirm('Are you sure you want to delete all stored words and lists?')) {
        chrome.storage.local.clear(() => {
            alert('All data deleted.');
            location.reload();
        });
    }
};

// when button is clicked, it downloads the words and definitions as a single CSV file
document.getElementById('export-csv').onclick = function () {
    const inputListName = document.getElementById('input-list-name');
    if(inputListName !== null) {
        // Retrieve the word lists from local storage
        chrome.storage.local.get({ wordLists: {} }, (data) => {
            const listName = inputListName.value;
            const list = data.wordLists[listName] || [];
            if(list.length === 0) {
                alert(`No words found in the list "${listName}".`);
            } else {
                // Generate CSV: word,definition (no quotes)
                const csv = list.map(w => `${w.word || ''},${w.definition || ''}`).join('\n');
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${listName}.csv`;
                a.click();
                URL.revokeObjectURL(url);
            }
        });
    }
};