const options = {};

chrome.storage.local.get('options', (data) => {
    Object.assign(options, data.options);
    optionsForm.vegetarian.checked = Boolean(options.vegetarian);
    optionsForm.mushroom.checked = Boolean(options.mushroom);
  });

function selectVegetarianOptions() {
    Array.from(document.querySelectorAll('[class^="middle-text food-etlap-szoveg"]'))
    .forEach(e => {
        if(e.children.length === 0) {
            e.parentNode.parentNode.parentNode.style.pointerEvents = 'none'
            e.parentNode.parentNode.parentNode.style.opacity = '0.3'
        }
    });
}

function selectMushroom() {
    Array.from(document.querySelectorAll('[class^="middle-text food-etlap-szoveg"]'))
    .forEach(e => {
        if(!e.parentNode.parentNode.children.item(1).innerHTML.includes('gomba')) {
            e.parentNode.parentNode.parentNode.style.pointerEvents = 'none'
            e.parentNode.parentNode.parentNode.style.opacity = '0.3'
        }
    });
}

function clear() {
    Array.from(document.querySelectorAll('[class^="middle-text food-etlap-szoveg"]'))
    .forEach(e => {
        e.parentNode.parentNode.parentNode.style.pointerEvents = ''
        e.parentNode.parentNode.parentNode.style.opacity = ''
    });
}

optionsForm.vegetarian.addEventListener("change", async function() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    options.vegetarian = this.checked;
    chrome.storage.local.set({options});

    console.log('vegetarian option is checked')
    if (this.checked) {
        console.log('vegetarian option is checked')
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: selectVegetarianOptions
        });
    } else {
        console.log('vegetarian option is not checked')
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: clear
        });
    }
});

optionsForm.mushroom.addEventListener("change", async function() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    options.mushroom = this.checked;
    chrome.storage.local.set({options});

    console.log('mushroom option is checked')
    if (this.checked) {
        console.log('mushroom option is checked')
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: selectMushroom
        });
    } else {
        console.log('mushroom option is not checked')
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: clear
        });
    }
});
