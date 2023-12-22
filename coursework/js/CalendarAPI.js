export class CalendarAPI {
    #API_BASE_URL;
    #API_ENDPOINT;
    #API_KEY;
    #API_ENDPOINT_PARAMETERS;
    #errorContainer;
    #loader;
    #abortController;

    constructor(API_ENDPOINT, API_KEY, API_ENDPOINT_PARAMETERS, errorContainer, loader) {
        this.#API_BASE_URL = 'https://calendarific.com/api/v2';
        this.#API_ENDPOINT = API_ENDPOINT;
        this.#API_KEY = API_KEY;
        this.#API_ENDPOINT_PARAMETERS = API_ENDPOINT_PARAMETERS;
        this.#errorContainer = errorContainer;
        this.#loader = loader;
        this.#abortController = null;
    }

    getData = async () => {
        this.#loader.classList.remove('hidden');

        if (this.#abortController) {
            try {
                console.log(this.#abortController);
                this.#abortController.abort();
            } catch (error) {
                throw new Error(error);
            }
        }

        const abortController = new AbortController();
        const signal = abortController.signal;
        this.#abortController = abortController;

        try {
            this.#errorContainer.innerHTML = '';
            const response = await fetch(`${this.#API_BASE_URL}${this.#API_ENDPOINT}?api_key=${this.#API_KEY}${this.#API_ENDPOINT_PARAMETERS}`, {signal});
            if (!response.ok) {
                throw new Error('request error');
            }
            let data = await response.json();
            data = data.response;
            if (data.length === 0) {
                throw new Error('no such data');
            }
            return data;
        } catch (error) {
            this.#errorContainer.innerHTML = `<p class="msg error">${error}</p>`;
            throw new Error(error);
        } finally {
            this.#loader.classList.add('hidden');
        }
    };
}
