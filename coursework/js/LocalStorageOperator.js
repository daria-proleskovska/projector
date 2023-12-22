export class LocalStorageOperator {
    #keyName;
    #entriesQty;

    constructor(keyName, entriesQty = false) {
        this.#keyName = keyName;
        this.#entriesQty = entriesQty;
    }

    getParsedData = () => {
        return localStorage.getItem(this.#keyName) !== null
            ? JSON.parse(localStorage.getItem(this.#keyName))
            : [];
    }

    storeData = (entry) => {
        const data = this.getParsedData();
        if (this.#entriesQty && this.#entriesQty < (data.length + 1)) {
            data.pop();
        }
        data.unshift(entry);
        localStorage.setItem(this.#keyName, JSON.stringify(data));
    }
}