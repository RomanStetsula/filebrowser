import {
    EVENT_DATA_CHANGED,
    EVENT_CREATE_ITEM,
    EVENT_RENAME_ITEM,
    EVENT_DELETE_ITEM,
    EVENT_OPEN_FOLDER

} from '../events/eventsTypes'

export default class FilesExplorer {
    set data(data) {
        this.dataVal = data;
        if(this.list){
            this.renderList();
        }
    }

    get data() {
        return this.dataVal;
    }

    init(container, data) {
        this.container = container;
        this.data = data;
        this.render();
    }

    render() {
        this.container.innerHTML = FilesExplorer.markup(this);
        this.addFolderButton = this.container.querySelector('.add-folder');
        this.addFileButton = this.container.querySelector('.add-file');
        this.list = this.container.querySelector('.list');
        this.list.innerHTML =  FilesExplorer.listMarkup(this);
        this.addEventListeners();
    }

    renderList() {
        this.list.innerHTML =  FilesExplorer.listMarkup(this);
    }

    static markup(instance) {
        return `
        <div>
            <div>
                <hr>
                <button class="add-file">Add file</button>
                <button class="add-folder">Add folder</button>
            </div>
            <div class="list">
            </div>
        </div> 
    `;
    }

    static listMarkup(instance){
        let list = '';
        if(instance.data){
            instance.data.filter(el => el.folder)
                .forEach(el => {
                    list += `<div style="display: flex; justify-content: space-between">
                                <div>
                                    <b>[..]</b> 
                                    <span style="cursor: pointer" data-goal='open' data-name="${el.name}">${el.name}</span>
                                    <span style="color: gray"> ${el.created_at}</span>
                                </div>
                                <div>
                                    <button data-goal='rename' data-name="${el.name}">Rename</button>
                                    <button data-goal='delete' data-name="${el.name}">Delete</button>
                                </div>
                               
                            </div>`
                });
            instance.data.filter(el => !el.folder)
                .forEach(el => {
                    list += `<div style="display: flex; justify-content: space-between">
                                <div>
                                    <i>${el.name}</i>
                                    <span style="color: gray"> ${el.created_at}</span>
                                </div>
                               <div>
                                    <button data-goal='rename' data-name="${el.name}">Rename</button>
                                    <button data-goal='delete' data-name="${el.name}">Delete</button>
                               </div>
                            </div>`
                })
        }
        return list;
    }

    constructor({container, data}) {
        // The constructor should only contain the boiler plate code for finding or creating the reference.
        if (typeof container.dataset.ref === 'undefined') {
            this.ref = Math.random();
            FilesExplorer.refs[this.ref] = this;
            container.dataset.ref = this.ref;
            this.init(container, data);
        } else {
            // If this element has already been instantiated, use the existing reference.
            return FilesExplorer.refs[container.dataset.ref];
        }
    }

    addEventListeners() {
        this.addFolderButton.addEventListener('click', () => {
            let folderName = prompt('Enter folder name', 'New folder');
            this.addItem(folderName, true);
        });
        this.addFileButton.addEventListener('click', () => {
            let fileName = prompt('Enter file name', 'new file.txt');
            this.addItem(fileName, false);
        });

        this.container.querySelector('.list').addEventListener('click', event => {
            if(event.target.dataset.goal === 'rename'){
                this.renameItem(event.target.dataset.name)
            } else if(event.target.dataset.goal === 'delete') {
                this.deleteItem(event.target.dataset.name)
            } else if(event.target.dataset.goal === 'open'){
                this.openFolder(event.target.dataset.name)
            }
        });

        this.container.addEventListener(EVENT_DATA_CHANGED, event => {
            this.data = event.detail
        });
    }

    addItem(name, folder){
        if(name){
            let date = new Date();
            this.container.dispatchEvent(new CustomEvent(EVENT_CREATE_ITEM, {
                detail: {
                    folder: folder ? [] : null,
                    name: name,
                    created_at:  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
                }
            }));
        }
    }

    renameItem(oldName) {
        let newName = prompt('Enter folder name', oldName);
        if(newName){
            this.container.dispatchEvent(new CustomEvent(EVENT_RENAME_ITEM, {
                detail: {
                    oldName,
                    newName,
                }
            }));
        }
    }

    deleteItem(name){
        this.container.dispatchEvent(new CustomEvent(EVENT_DELETE_ITEM, {
            detail: {
                name
            }
        }));
    }

    openFolder(name){
        this.container.dispatchEvent(new CustomEvent(EVENT_OPEN_FOLDER, {
            detail: {
                name
            }
        }));
    }
};

FilesExplorer.refs = {};