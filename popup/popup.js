// when button is clicked, it download the words and definitions as CSV files

// could downloads the words and definitions as one CSV file
document.getElementById('export-csv').onclick = function () {
    // retrieve the words from local storage of the browser
    chrome.storage.local.get({ words: [] }, (data) => {
        // generate the CSV of words
        const wordsCsv = data.words.map(w => (w.word || '')).join('\n');
        const wordsBlob = new Blob([wordsCsv], { type: 'text/csv' });
        const wordsUrl = URL.createObjectURL(wordsBlob);
        const aWords = document.createElement('a');
        aWords.href = wordsUrl;
        aWords.download = 'words.csv';
        aWords.click();
        URL.revokeObjectURL(wordsUrl);

        // generate the CSV of definitions
        const defsCsv = data.words.map(w => (w.definition || '')).join('\n');
        const defsBlob = new Blob([defsCsv], { type: 'text/csv' });
        const defsUrl = URL.createObjectURL(defsBlob);
        const aDefs = document.createElement('a');
        aDefs.href = defsUrl;
        aDefs.download = 'def.csv';
        aDefs.click();
        URL.revokeObjectURL(defsUrl);
    });
};