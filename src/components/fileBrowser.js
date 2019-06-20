import {
    EVENT_DATA_CHANGED,
    EVENT_CREATE_ITEM,
    EVENT_RENAME_ITEM,
    EVENT_DELETE_ITEM,
    EVENT_OPEN_FOLDER,
    EVENT_FILTERS_CHANGED,
    EVENT_BREADCRUMB_CHANGED,
    EVENT_BREADCRUMB_BACK

} from '../events/eventsTypes'
import Filter from './filter'
import FilesExplorer from './filesExplorer'
import Breadcrumb from  './breadcrumb'

export default class FileBrowser {
    set history(data) {
        this.historyVal = data;
        if(this.breadcrumb){
            this.dispachBreadcrumbChangedEvent();
        }
    }

    get history() {
        return this.historyVal;
    }

    init(container) {
        this.container = container;
        this.filters = {};
        this.historyVal = [];
        this.baseFolder = {data: []};
        this.data = this.baseFolder.data;
        this.render();

    }

    render() {
        this.container.innerHTML = FileBrowser.markup(this);

        this.filter = this.container.querySelector('#filters');
        this.filesExplorer = this.container.querySelector('#files-explorer');
        this.breadcrumb = this.container.querySelector('#breadcrumb');
        new Filter({ container: this.filter });
        new FilesExplorer({ container: this.filesExplorer, data: this.data });
        new Breadcrumb({ container:  this.breadcrumb });
        this.dispachBreadcrumbChangedEvent();
        this.addEventListeners();
    }

    static markup({}) {
        return `
        <div style="width: 500px">
            <h1>File Browser</h1>
            <div id="filters"></div>
            <div id="breadcrumb"></div>
            <div id="files-explorer"></div>
        </div>
    `;
    }

    constructor(container) {
        // The constructor should only contain the boiler plate code for finding or creating the reference.
        if (typeof container.dataset.ref === 'undefined') {
            this.ref = Math.random();
            FileBrowser.refs[this.ref] = this;
            container.dataset.ref = this.ref;
            this.init(container);
        } else {
            // If this element has already been instantiated, use the existing reference.
            return FileBrowser.refs[container.dataset.ref];
        }
    }

    addEventListeners() {
        this.filesExplorer.addEventListener(EVENT_CREATE_ITEM, event => {
            let exists = this.data.some(item => {
                if(item.name === event.detail.name && Boolean(item.folder) === Boolean(event.detail.folder)){
                    alert('Already exists!!!');
                    return true;
                }
            });
            if(!exists){
                this.data.push({
                    name: event.detail.name,
                    folder: event.detail.folder,
                    created_at: event.detail.created_at
                });

                this.dispatchDataChangedEvent();
            }
        });

        this.filesExplorer.addEventListener(EVENT_RENAME_ITEM, event => {
            this.data.some(item => {
                if(item.name === event.detail.oldName){
                    return item.name = event.detail.newName;
                }
            });
            this.dispatchDataChangedEvent();
        });

        this.filesExplorer.addEventListener(EVENT_DELETE_ITEM, event => {
            this.data.some((item, index) => {
                if(item.name === event.detail.name){
                    return this.data.splice(index, 1);
                }
            });
            this.dispatchDataChangedEvent();
        });

        this.filesExplorer.addEventListener(EVENT_OPEN_FOLDER, event => {
            this.data.some(item => {
                if(item.name === event.detail.name){
                    this.history = this.history.concat([item.name]);
                    return this.data = item.folder
                }
            });
            this.dispatchDataChangedEvent();
        });

        this.filter.addEventListener(EVENT_FILTERS_CHANGED, event => {
            this.filters = event.detail;

            this.dispatchDataChangedEvent();
        });

        this.breadcrumb.addEventListener(EVENT_BREADCRUMB_BACK, () => {
            this.history.pop();
            this.history = this.history;
            this.backInHistory();
        })
    }

    dispatchDataChangedEvent(){
        let data = this.data.filter(item => {
            return (this.filters.onlyFolders ? Boolean(item.folder) === Boolean(this.filters.onlyFolders) : true)
            && (this.filters.date ? new Date(item.created_at).toDateString() === new Date(this.filters.date).toDateString() : true)
        });

        this.filesExplorer.dispatchEvent(new CustomEvent(EVENT_DATA_CHANGED, {
            detail: data
        }));
    }

    dispachBreadcrumbChangedEvent(){
        this.breadcrumb.dispatchEvent(new CustomEvent(EVENT_BREADCRUMB_CHANGED, {
            detail: this.history
        }));
    }

    backInHistory(){
        let data = this.baseFolder.data;
        for(let i = 0; i < this.history.length; i++ ){
            data.some(item => {
                if(item.name === this.history[i]){
                    return data = item.folder;
                }
            });
        }
        this.data = data;
        this.dispatchDataChangedEvent();
    }
}

FileBrowser.refs = {};