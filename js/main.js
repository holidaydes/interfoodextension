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

function filterCells(options) {
    Array.from(document.querySelectorAll('[id^="sorszuro_id-"] > div.scroll-cols > div.wrapper > div.inner > div.cell'))
    .forEach(
        cell => {
            if (
                (options.vegetarianFilter && cell.children.item(0).children.item(0).children.item(0).children.length === 0) || 
                (options.mushroomFilter && !cell.children.item(0).children.item(1).innerHTML.includes('gomba'))
            ) {
                cell.style.pointerEvents = 'none';
                cell.style.opacity = '0.3';
            } else {
                cell.style.pointerEvents = ''
                cell.style.opacity = ''
            }
        }
    );
}

function clear() {
    Array.from(document.querySelectorAll('[id^="sorszuro_id-"] > div.scroll-cols > div.wrapper > div.inner > div.cell'))
        .forEach(cell => {
            cell.style.pointerEvents = ''
            cell.style.opacity = ''
        });
}

optionsForm.vegetarianCheckbox.addEventListener("change", async function() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    options.vegetarianFilter = optionsForm.vegetarianCheckbox.checked;
    options.mushroomFilter = optionsForm.mushroomCheckbox.checked;

    chrome.storage.local.set({ options });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: filterCells,
        args: [options]
    });
});

optionsForm.mushroomCheckbox.addEventListener("change", async function() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    options.vegetarianFilter = optionsForm.vegetarianCheckbox.checked;
    options.mushroomFilter = optionsForm.mushroomCheckbox.checked;

    chrome.storage.local.set({ options });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: filterCells,
        args: [options]
    });
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