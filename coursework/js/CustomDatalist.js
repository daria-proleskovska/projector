export class CustomDatalist {
    #input;
    #dataMap;
    #datasetName;
    #listContainer;
    #list;
    #listItems;
    #listItemsLength;
    #noResultsItem;
    #inputValue;
    #successEvent;
    #failureEvent;

    constructor(input, dataMap, datasetName) {
        this.#input = input;
        this.#dataMap = dataMap;
        this.#datasetName = datasetName;
        this.#listContainer = null;
        this.#list = null;
        this.#listItems = null;
        this.#listItemsLength = 0;
        this.#noResultsItem = null;
        this.#inputValue = '';
        this.validDatasetValue = null;
        this.#successEvent = new Event('validValue');
        this.#failureEvent = new Event('invalidValue');
    }

    init = () => {
        this.#listContainer = document.createElement('div');
        this.#listContainer.classList.add('datalist');
        this.#input.before(this.#listContainer);
        this.#list = document.createElement('ul');
        this.#listContainer.appendChild(this.#list);
        this.#list.innerHTML = '<li class="no-results">No results</li>';
        this.#dataMap.forEach((datasetValue, textContent) => {
            this.#list.innerHTML += `<li data-${this.#datasetName}="${datasetValue}">${textContent}</li>`
        });
        this.#listItems = this.#list.children;
        this.#listItemsLength = this.#listItems.length;
        this.#noResultsItem = this.#listItems.item(0);

        this.#input.addEventListener('focus', this.#showContainer);

        document.addEventListener('click', event => {
            const target = event.target;
            if (target !== this.#input && target.closest('.datalist') === null) {
                this.#hideContainer();
            }
        });        

        this.#input.addEventListener('keyup', event => {
            this.validDatasetValue = null;
            this.#inputValue = event.target.value.trim();            
            this.showAllItems();
            this.#showContainer();

            if (this.#inputValue !== '') {
                let hiddenItemsCounter = 0;

                for (let i = 1; i < this.#listItemsLength; i++) { // i = 1 because first item is 'no-results'
                    const item = this.#listItems[i];
                    const itemTextUp = item.textContent.toUpperCase();
                    const inputValueUp = this.#inputValue.toUpperCase();
                    
                    if (itemTextUp.startsWith(inputValueUp)) {
                        item.classList.remove('hide');
                        if (itemTextUp === inputValueUp) {
                            this.#input.value = this.#inputValue; // remove whitespaces
                            this.#success(item);
                        }
                    } else {
                        item.classList.add('hide');
                        hiddenItemsCounter++;
                    }                    
                }
                
                if (this.#listItemsLength - 1 === hiddenItemsCounter) { // - 1 because first item is 'no-results'
                    this.#noResultsItem.style.display = 'block';
                } else {
                    this.#noResultsItem.style.display = 'none';
                }

                if (this.validDatasetValue === null) {
                    this.#input.dispatchEvent(this.#failureEvent);
                }
            } else {
                this.#input.value = this.#inputValue; // remove whitespaces
                this.#noResultsItem.style.display = 'none';
            }
        })

        this.#list.addEventListener('click', event => {
            const item = event.target;
            if (!item.matches('li.no-result')) {
                this.#input.value = item.textContent;
                this.#hideAllItems(item);
                this.#success(item);
            }
        })
    }

    #showContainer = () => {
        this.#listContainer.classList.add('show');
    }

    #hideContainer = () => {
        this.#listContainer.classList.remove('show');
    }

    showAllItems = () => {
        for (let i = 1; i < this.#listItemsLength; i++) {
            const item = this.#listItems[i];
            item.classList.remove('hide');
        }
    }

    #hideAllItems = (exception = null) => {
        for (let i = 1; i < this.#listItemsLength; i++) {
            const item = this.#listItems[i];
            if (exception === item) {
                continue;
            }
            item.classList.add('hide');
        }
    }

    #success = item => {
        this.validDatasetValue = item.dataset[this.#datasetName];
        this.#hideContainer();
        this.#input.dispatchEvent(this.#successEvent);
    }
}