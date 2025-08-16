// when we highlight a word
document.addEventListener('mouseup', function (e) {
    // Prevent popup if clicking inside the popup itself
    const oldPopup = document.getElementById('my-selection-popup');
    if (oldPopup && oldPopup.contains(e.target)) return;

    // retrieve the selected text
    const selection = window.getSelection();
    const text = selection.toString().trim();
    if (oldPopup) oldPopup.remove();

    if (text.length > 0) {
        // Create a popup with an input field and a button to store the word
        const popup = document.createElement('div');
        popup.id = 'my-selection-popup';
        popup.style.position = 'absolute';
        popup.style.left = `${e.pageX + 10}px`;
        popup.style.top = `${e.pageY + 10}px`;
        popup.style.background = '#222';
        popup.style.color = '#fff';
        popup.style.padding = '8px 12px';
        popup.style.borderRadius = '6px';
        popup.style.zIndex = 9999;
        popup.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        popup.textContent = `Word: ${text}`;

        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.id = 'definition-input';
        const labelInputField = document.createElement('label');
        labelInputField.textContent = 'Definition:';
        labelInputField.for = 'definition-input';

        const inputListName = document.createElement('input');
        inputListName.type = 'text';
        inputListName.id = 'list-name-input';
        const labelListName = document.createElement('label');
        labelListName.textContent = 'List Name:';
        labelListName.for = 'list-name-input';

        const buttonAddWord = document.createElement('button');
        buttonAddWord.textContent = 'Add Word';
        buttonAddWord.style.marginLeft = '10px';
        buttonAddWord.onclick = function () {
            // Send message to background script to add the word with its definition
            console.log('Adding word:', text, 'Definition:', inputField.value, 'List Name:', inputListName.value);
            if (inputField.value.trim() === '') {
                alert('Please enter a definition for the word.');
                return;
            }
            if(inputListName.value.trim() === '') {
                alert('Please enter a list name.');
                return;
            }
            // Send the word and definition to the background script
            chrome.runtime.sendMessage({ action: 'addFullWord', word: text, definition: inputField.value, listName: inputListName.value });
            popup.remove(); // Remove popup after adding word
        }
        popup.appendChild(document.createElement('br'));
        popup.appendChild(labelInputField);
        popup.appendChild(inputField);
        popup.appendChild(document.createElement('br'));
        popup.appendChild(labelListName);
        popup.appendChild(inputListName);
        popup.appendChild(document.createElement('br'));
        popup.appendChild(buttonAddWord);

        document.body.appendChild(popup);
    }
});