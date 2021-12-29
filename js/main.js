const options = {};
const allowedUrl = 'https://www.interfood.hu/etlap-es-rendeles/';

chrome.storage.local.get('options', (data) => {
    Object.assign(options, data.options);
    optionsForm.vegetarianCheckbox.checked = Boolean(options.vegetarianFilter);
    optionsForm.mushroomCheckbox.checked = Boolean(options.mushroomFilter);
});

(async function init() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab.url !== allowedUrl) {
        optionsForm.style.opacity = '0.3';
        optionsForm.vegetarianCheckbox.disabled = true;
        optionsForm.mushroomCheckbox.disabled = true;
        optionsForm.clearButton.disabled = true;
    }
})();

function selectVegetarianOptions() {
    Array.from(document.querySelectorAll('[class^="middle-text food-etlap-szoveg"]'))
        .forEach(e => {
            if (e.children.length === 0) {
                e.parentNode.parentNode.parentNode.style.pointerEvents = 'none'
                e.parentNode.parentNode.parentNode.style.opacity = '0.3'
            }
        });
}

function selectMushroom() {
    Array.from(document.querySelectorAll('[class^="middle-text food-etlap-szoveg"]'))
        .forEach(e => {
            if (!e.parentNode.parentNode.children.item(1).innerHTML.includes('gomba')) {
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

optionsForm.vegetarianCheckbox.addEventListener("change", async function() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    options.vegetarianFilter = this.checked;
    chrome.storage.local.set({ options });

    if (this.checked) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: selectVegetarianOptions
        });
    } else {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: clear
        });
    }
});

optionsForm.mushroomCheckbox.addEventListener("change", async function() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    options.mushroomFilter = this.checked;
    chrome.storage.local.set({ options });

    if (this.checked) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: selectMushroom
        });
    } else {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: clear
        });
    }
});

optionsForm.clearButton.addEventListener("click", async function() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    optionsForm.vegetarianCheckbox.checked = false;
    optionsForm.mushroomCheckbox.checked = false;

    options.vegetarianFilter = false;
    options.mushroomFilter = false;
    chrome.storage.local.set({ options });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: clear
    });
});