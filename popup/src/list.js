// retrieve the object in the local storage of the browser to show the lists of words and definitions
chrome.storage.local.get({ wordLists: {} }, (data) => {
const wordLists = data.wordLists;
const divListNames = document.getElementById('div-lists');

// if the objects is empty, say that there are no lists
if(Object.keys(wordLists).length === 0) {
    let pNoLists = document.createElement('p');
    pNoLists.textContent = "No lists";
    divListNames.appendChild(pNoLists);
}

// for each list, add a titel, a non-ordered list and a delete button
for (const list in wordLists) {
    ListName = document.createElement('h3');
    deleteListButton = document.createElement('button');
    modifyListButton = document.createElement('button');
    ulListName = document.createElement('ul');

    ListName.textContent = list;
    deleteListButton.textContent = "Delete list";
    modifyListButton.textContent = "Modify list";
    ulListName.id = "ul_" + list;

    // delete the list when button pressed
    deleteListButton.onclick = function () {
        chrome.storage.local.get({ wordLists: {} }, (data) => {
        const wordLists = data.wordLists;
        if(confirm("Are you sure you want to delete all stored words in this list: " + list +"?")) {
            // updates the local storage of the browser and reload the page
            delete wordLists[list];
            chrome.storage.local.set({ wordLists });
            alert(list + " deleted.")
            location.reload();
        }
        });
    }

    modifyListButton.onclick = function () {
        modifyUlList = document.getElementById("ul_" + list);
        allLis = Array.from(modifyUlList.getElementsByTagName('li'));

        if(modifyListButton.textContent == "Modify list") {
            // retrieve the non-ordered list that contains the items of the list

            // loop through all items of the list
            for (let x = 0; x < allLis.length; x++) {
                // get the content of the li, seperate the word and the definition
                text = allLis[x].textContent;
                textArray = text.split(":");
                
                word = textArray[0].trim();
                definition = textArray[1].trim();

                console.log(word);
                console.log(definition);

                // transform the items into inputs to change them
                let inputWord = document.createElement("input");
                let inputDefinition = document.createElement("input");

                inputWord.placeholder = word;
                inputDefinition.placeholder = definition;
                allLis[x].textContent = "";

                allLis[x].appendChild(inputWord);
                allLis[x].appendChild(inputDefinition);
            }

            modifyListButton.textContent = "Save list"
        } else {
            // retrieve the wordlists object
            chrome.storage.local.get({ wordLists: {} }, (data) => {
                wordLists = data.wordLists;
                //
            });
            // update the value of the key (list)
            for (let x = 0; x < allLis.length; x ++) {
                //
            }
            // update lists.html
        }
    }

    // add all elements in the div
    divListNames.appendChild(ListName);
    divListNames.appendChild(modifyListButton);
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

// delete all lists at once
document.getElementById('delete-all').onclick = function () {
    if (confirm('Are you sure you want to delete all stored words and lists?')) {
        // clear the local storage of the browser
        chrome.storage.local.clear(() => {
            alert('All data deleted.');
            location.reload();
        });
    }
};