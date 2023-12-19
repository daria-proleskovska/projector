export class TableSort {
    #tableHead;
    #tableBody;
    #tableRows;
    #tableRowsArray;
    #tableHeaders;

    constructor(tableSelector) {
        this.#tableHead = document.querySelector(`${tableSelector} thead`);
        this.#tableBody = document.querySelector(`${tableSelector} tbody`);
        this.#tableRows = this.#tableBody.children;
        this.#tableRowsArray = [];
        this.#tableHeaders = this.#tableHead.getElementsByTagName('th');
        this.tableRowsSortedByDateArray = null;
        this.contentIsLoaded = true;
    }

    init = () => {
        this.#tableHead.addEventListener('click', event => {
            if (this.contentIsLoaded) {
                this.#tableRowsArray = Array.from(this.#tableRows);
                const targetedTableHeader = event.target.closest('th');
                const sortingCriteria = targetedTableHeader.dataset.sortingCriteria;
                const initialDirection = targetedTableHeader.dataset.direction;
                let direction = initialDirection === 'ascending' ? 'descending' : 'ascending';
                
                if (this.tableRowsSortedByDateArray !== null) {
                    if (sortingCriteria === 'date') {
                        direction = !initialDirection ? 'descending' : direction;
                        this.#sortDates();
                    } else {
                        this.#sortStrings(sortingCriteria, direction);
                    }
                } else {
                    this.#sortStrings(sortingCriteria, direction);
                }

                targetedTableHeader.dataset.direction = direction;
            }
        });
    }

    #sortDates = () => {
        this.tableRowsSortedByDateArray.reverse().forEach(tr => {
            this.#tableBody.appendChild(tr);
        });
    }

    #sortStrings = (sortingCriteria, direction) => {
        let index;
        for (let i = 0; i < this.#tableHeaders.length; i++) {
            if (sortingCriteria === this.#tableHeaders[i].dataset.sortingCriteria) {
                index = i;
            }
        }
        
        this.#tableRowsArray.sort((a, b) => {
            if (direction === 'ascending') {
                return a.children[index].textContent > b.children[index].textContent ? 1 : -1;
            } else {
                return a.children[index].textContent < b.children[index].textContent ? 1 : -1;
            }
        }).forEach(tr => {
            this.#tableBody.appendChild(tr);
        });
    }
}