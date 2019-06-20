import {
    EVENT_BREADCRUMB_CHANGED,
    EVENT_BREADCRUMB_BACK
} from "../events/eventsTypes";

export default class BreadcrumbComponent {
    set history(data) {
        this.historyVal = data;
        this.renderHistory();
    }

    get history() {
        return this.historyVal;
    }

    init(container) {
        this.container = container;
        this.historyVal = [];
        this.render();
        this.renderHistory();
        this.backButton = this.container.querySelector('.back');
        this.addEventListeners();
    }

    render() {
        this.container.innerHTML = BreadcrumbComponent.markup(this);
    }

    renderHistory(){
        this.historyEl = this.container.querySelector('.history');
        this.historyEl.innerHTML = BreadcrumbComponent.historyMarkup(this);
    }

    static markup(self) {
        return `<div>
                    <div class="history"></div>
                    <div><button class="back">Back</button></div>
                </div>`;
    }

    static historyMarkup(self){
        return `<p>/${self.history.join('/')}</p>`
    }

    constructor({container}) {
        // The constructor should only contain the boiler plate code for finding or creating the reference.
        if (typeof container.dataset.ref === 'undefined') {
            this.ref = Math.random();
            BreadcrumbComponent.refs[this.ref] = this;
            // container.dataset.ref = this.ref;
            this.init(container);
        } else {
            // If this element has already been instantiated, use the existing reference.
            return BreadcrumbComponent.refs[container.dataset.ref];
        }
    }

    addEventListeners() {
        this.container.addEventListener(EVENT_BREADCRUMB_CHANGED, event => {
            this.history = event.detail;
        });

        this.backButton.addEventListener('click', event => {
            if(this.history.length){
                this.container.dispatchEvent(new CustomEvent(EVENT_BREADCRUMB_BACK));
            }
        })
    }
}

BreadcrumbComponent.refs = {};