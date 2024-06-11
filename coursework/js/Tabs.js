export class Tabs {
    #nav
    #navLinks;
    #tabs;
    #activeTabIndex;
    #tabsQty;

    constructor(nav, tabsList, activeTab = 1) {
        this.#nav = nav;
        this.#navLinks = this.#nav.children;
        this.#tabs = tabsList.children;
        this.#activeTabIndex = activeTab - 1;
        this.#tabsQty = this.#navLinks.length;
    }

    initTabs = () => {
        this.#toggleTab();

        this.#nav.addEventListener('click', (event) => {
            const navLink = event.target.closest('li');

            if (navLink !== null) {
                for (let i = 0; i < this.#tabsQty; i++) {
                    if (navLink === this.#navLinks[i]) {
                        this.#activeTabIndex = i;
                    }
                }

                this.#toggleTab();
            }
        })
    }

    #toggleTab = () => {
        for (let i = 0; i < this.#tabsQty; i++) {
            if (this.#activeTabIndex === i) {
                this.#navLinks[i].classList.add('active');
                this.#tabs[i].classList.add('active');
            } else {
                this.#navLinks[i].classList.remove('active');
                this.#tabs[i].classList.remove('active');
            }
        }
    }
}