chrome.storage.local.get({ wordLists: {} }, (data) => {
const wordLists = data.wordLists;
const divListNames = document.getElementById('div-lists');

for (const list in wordLists) {
    ListName = document.createElement('h3');
    ulListName = document.createElement('ul');
    ListName.textContent = list;
    divListNames.appendChild(ListName);
    divListNames.appendChild(ulListName);

    for(item in wordLists[list]) {
        liListItem = document.createElement('li');
        liListItem.textContent = `${wordLists[list][item].word}: ${wordLists[list][item].definition}`;
        ulListName.appendChild(liListItem);
    }
}
});

document.getElementById('delete-all').onclick = function () {
    if (confirm('Are you sure you want to delete all stored words and lists?')) {
        chrome.storage.local.clear(() => {
            alert('All data deleted.');
            // Optionally, refresh the popup UI here
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
            // Choose the list to export (replace 'YourListName' with the desired list name, or prompt the user)
            const listName = inputListName.value; // <-- Change this or prompt the user for the list name
            const list = data.wordLists[listName] || [];
            if(list.length === 0) {
                alert(`No words found in the list "${listName}".`);
            } else {
                // Generate CSV: "word,definition"
                const csv = list.map(w => `"${(w.word || '').replace(/"/g, '""')}","${(w.definition || '').replace(/"/g, '""')}"`).join('\n');
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