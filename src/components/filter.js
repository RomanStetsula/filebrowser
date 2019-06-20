import {
    EVENT_FILTERS_CHANGED
} from "../events/eventsTypes";

export default class FiltersComponent {
    init(container) {
        this.container = container;
        this.filters = {
            onlyFolders: false,
            date: null,
        };
        this.render();
    }

    render() {
        this.container.innerHTML = FiltersComponent.markup(this);
        this.checbox = this.container.querySelector('#showFoldersOnly');
        this.date = this.container.querySelector('#date');
        this.addEventListeners();
    }

    static markup({}) {
        return `
            <div>
                <div>
                    <label for="showFoldersOnly">Show folders only</label>
                    <input type="checkbox" name="showFoldersOnly" id="showFoldersOnly">  
                </div>

                <div>
                    <label for="date">Select date</label>
                    <input type="date" name="date" id="date">
                </div>
            </div>
    `;
    }

    constructor({container}) {
        // The constructor should only contain the boiler plate code for finding or creating the reference.
        if (typeof container.dataset.ref === 'undefined') {
            this.ref = Math.random();
            FiltersComponent.refs[this.ref] = this;
            // container.dataset.ref = this.ref;
            this.init(container);
        } else {
            // If this element has already been instantiated, use the existing reference.
            return FiltersComponent.refs[container.dataset.ref];
        }
    }

    addEventListeners() {
        this.checbox.addEventListener('change', e => {
            this.filters.onlyFolders = e.target.checked;
            this.applyFilters();

        });
        this.date.addEventListener('change', e => {
            this.filters.date = e.target.value;
            this.applyFilters();
        });
    }

    applyFilters(){
        this.container.dispatchEvent(new CustomEvent(EVENT_FILTERS_CHANGED, {
            detail: this.filters
        }));
    }
}

FiltersComponent.refs = {};