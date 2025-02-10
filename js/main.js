const options = {};
const allowedUrl = 'https://www.interfood.hu/etlap-es-rendeles/';

chrome.storage.local.get('options', (data) => {
    Object.assign(options, data.options);
    optionsForm.vegetarianCheckbox.checked = Boolean(options.vegetarianFilter);
    optionsForm.mushroomCheckbox.checked = Boolean(options.mushroomFilter);
    optionsForm.paleoCheckbox.checked = Boolean(options.paleoFilter);
    optionsForm.newMealCheckbox.checked = Boolean(options.newMealFilter);
    optionsForm.timeLimitedOrderCheckbox.checked = Boolean(options.timeLimitedOrderFilter);
});

(async function init() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab.url.includes(allowedUrl)) {
        optionsForm.style.opacity = '0.3';
        optionsForm.vegetarianCheckbox.disabled = true;
        optionsForm.mushroomCheckbox.disabled = true;
        optionsForm.paleoCheckbox.disabled = true;
        optionsForm.newMealCheckbox.disabled = true;
        optionsForm.clearButton.disabled = true;
        optionsForm.timeLimitedOrderCheckbox.disabled = true;
    }
})();

function filterCells(options) {
    Array.from(document.querySelectorAll('[id^="sorszuro_id-"] > div.scroll-cols > div.wrapper > div.inner > div.cell'))
        .forEach(
            cell => {
                if (
                    //vegetarian filter
                    (
                        options.vegetarianFilter &&
                        Array.from(cell.children.item(0).children.item(0).children.item(0).childNodes).filter(node => node.nodeName === 'SPAN' && node.innerHTML === '<b>V</b>').length === 0
                    ) ||
                    //mushroom filter
                    (
                        options.mushroomFilter &&
                        !cell.children.item(0).children.item(0).innerHTML.includes('gomba')
                    ) ||
                    //paleo filter
                    (
                        options.paleoFilter &&
                        Array.from(cell.children.item(0).children.item(0).children.item(0).childNodes).filter(node => node.nodeName === 'IMG' && node.title === 'Paleo').length === 0
                    ) ||
                    //new meal filter
                    (
                        options.newMealFilter &&
                        Array.from(cell.children.item(0).children.item(0).children.item(0).childNodes).filter(node => node.nodeName === 'IMG' && node.title.includes('J!')).length === 0
                    ) ||
                    //time limited order filter
                    (
                        options.timeLimitedOrderFilter &&
                        Array.from(cell.children.item(0).children.item(0).children.item(0).childNodes).filter(node => node.nodeName === 'IMG' && node.title.includes('rendel')).length === 0
                    )
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
    options.paleoFilter = optionsForm.paleoCheckbox.checked;
    options.newMealFilter = optionsForm.newMealCheckbox.checked;
    options.timeLimitedOrderFilter = optionsForm.timeLimitedOrderCheckbox.checked;

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
    options.paleoFilter = optionsForm.paleoCheckbox.checked;
    options.newMealFilter = optionsForm.newMealCheckbox.checked;
    options.timeLimitedOrderFilter = optionsForm.timeLimitedOrderCheckbox.checked;

    chrome.storage.local.set({ options });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: filterCells,
        args: [options]
    });
});

optionsForm.paleoCheckbox.addEventListener("change", async function() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    options.vegetarianFilter = optionsForm.vegetarianCheckbox.checked;
    options.mushroomFilter = optionsForm.mushroomCheckbox.checked;
    options.paleoFilter = optionsForm.paleoCheckbox.checked;
    options.newMealFilter = optionsForm.newMealCheckbox.checked;
    options.timeLimitedOrderFilter = optionsForm.timeLimitedOrderCheckbox.checked;

    chrome.storage.local.set({ options });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: filterCells,
        args: [options]
    });
});

optionsForm.newMealCheckbox.addEventListener("change", async function() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    options.vegetarianFilter = optionsForm.vegetarianCheckbox.checked;
    options.mushroomFilter = optionsForm.mushroomCheckbox.checked;
    options.paleoFilter = optionsForm.paleoCheckbox.checked;
    options.newMealFilter = optionsForm.newMealCheckbox.checked;
    options.timeLimitedOrderFilter = optionsForm.timeLimitedOrderCheckbox.checked;

    chrome.storage.local.set({ options });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: filterCells,
        args: [options]
    });
});

optionsForm.timeLimitedOrderCheckbox.addEventListener("change", async function() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    options.vegetarianFilter = optionsForm.vegetarianCheckbox.checked;
    options.mushroomFilter = optionsForm.mushroomCheckbox.checked;
    options.paleoFilter = optionsForm.paleoCheckbox.checked;
    options.newMealFilter = optionsForm.newMealCheckbox.checked;
    options.timeLimitedOrderFilter = optionsForm.timeLimitedOrderCheckbox.checked;

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
    optionsForm.paleoCheckbox.checked = false;
    optionsForm.newMealCheckbox.checked = false;
    optionsForm.timeLimitedOrderCheckbox.checked = false;

    options.vegetarianFilter = false;
    options.mushroomFilter = false;
    options.paleoFilter = false;
    options.newMealFilter = false;
    options.timeLimitedOrderFilter = false;

    chrome.storage.local.set({ options });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: clear
    });
});