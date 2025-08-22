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
                // Generate CSV
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