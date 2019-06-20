/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_fileBrowser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/fileBrowser.js */ \"./components/fileBrowser.js\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  new _components_fileBrowser_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](document.getElementById('file-browser'));\n});\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./components/breadcrumb.js":
/*!**********************************!*\
  !*** ./components/breadcrumb.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return BreadcrumbComponent; });\n/* harmony import */ var _events_eventsTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../events/eventsTypes */ \"./events/eventsTypes.js\");\n\nclass BreadcrumbComponent {\n  set history(data) {\n    this.historyVal = data;\n    this.renderHistory();\n  }\n\n  get history() {\n    return this.historyVal;\n  }\n\n  init(container) {\n    this.container = container;\n    this.historyVal = [];\n    this.render();\n    this.renderHistory();\n    this.backButton = this.container.querySelector('.back');\n    this.addEventListeners();\n  }\n\n  render() {\n    this.container.innerHTML = BreadcrumbComponent.markup(this);\n  }\n\n  renderHistory() {\n    this.historyEl = this.container.querySelector('.history');\n    this.historyEl.innerHTML = BreadcrumbComponent.historyMarkup(this);\n  }\n\n  static markup(self) {\n    return `<div>\n                    <div class=\"history\"></div>\n                    <div><button class=\"back\">Back</button></div>\n                </div>`;\n  }\n\n  static historyMarkup(self) {\n    return `<p>/${self.history.join('/')}</p>`;\n  }\n\n  constructor({\n    container\n  }) {\n    // The constructor should only contain the boiler plate code for finding or creating the reference.\n    if (typeof container.dataset.ref === 'undefined') {\n      this.ref = Math.random();\n      BreadcrumbComponent.refs[this.ref] = this; // container.dataset.ref = this.ref;\n\n      this.init(container);\n    } else {\n      // If this element has already been instantiated, use the existing reference.\n      return BreadcrumbComponent.refs[container.dataset.ref];\n    }\n  }\n\n  addEventListeners() {\n    this.container.addEventListener(_events_eventsTypes__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_BREADCRUMB_CHANGED\"], event => {\n      this.history = event.detail;\n    });\n    this.backButton.addEventListener('click', event => {\n      if (this.history.length) {\n        this.container.dispatchEvent(new CustomEvent(_events_eventsTypes__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_BREADCRUMB_BACK\"]));\n      }\n    });\n  }\n\n}\nBreadcrumbComponent.refs = {};\n\n//# sourceURL=webpack:///./components/breadcrumb.js?");

/***/ }),

/***/ "./components/fileBrowser.js":
/*!***********************************!*\
  !*** ./components/fileBrowser.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FileBrowser; });\n/* harmony import */ var _events_eventsTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../events/eventsTypes */ \"./events/eventsTypes.js\");\n/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filter */ \"./components/filter.js\");\n/* harmony import */ var _filesExplorer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filesExplorer */ \"./components/filesExplorer.js\");\n/* harmony import */ var _breadcrumb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./breadcrumb */ \"./components/breadcrumb.js\");\n\n\n\n\nclass FileBrowser {\n  set history(data) {\n    this.historyVal = data;\n\n    if (this.breadcrumb) {\n      this.dispachBreadcrumbChangedEvent();\n    }\n  }\n\n  get history() {\n    return this.historyVal;\n  }\n\n  init(container) {\n    this.container = container;\n    this.filters = {};\n    this.historyVal = [];\n    this.baseFolder = {\n      data: []\n    };\n    this.data = this.baseFolder.data;\n    this.render();\n  }\n\n  render() {\n    this.container.innerHTML = FileBrowser.markup(this);\n    this.filter = this.container.querySelector('#filters');\n    this.filesExplorer = this.container.querySelector('#files-explorer');\n    this.breadcrumb = this.container.querySelector('#breadcrumb');\n    new _filter__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      container: this.filter\n    });\n    new _filesExplorer__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n      container: this.filesExplorer,\n      data: this.data\n    });\n    new _breadcrumb__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n      container: this.breadcrumb\n    });\n    this.dispachBreadcrumbChangedEvent();\n    this.addEventListeners();\n  }\n\n  static markup({}) {\n    return `\n        <div style=\"width: 500px\">\n            <h1>File Browser</h1>\n            <div id=\"filters\"></div>\n            <div id=\"breadcrumb\"></div>\n            <div id=\"files-explorer\"></div>\n        </div>\n    `;\n  }\n\n  constructor(container) {\n    // The constructor should only contain the boiler plate code for finding or creating the reference.\n    if (typeof container.dataset.ref === 'undefined') {\n      this.ref = Math.random();\n      FileBrowser.refs[this.ref] = this;\n      container.dataset.ref = this.ref;\n      this.init(container);\n    } else {\n      // If this element has already been instantiated, use the existing reference.\n      return FileBrowser.refs[container.dataset.ref];\n    }\n  }\n\n  addEventListeners() {\n    this.filesExplorer.addEventListener(_events_eventsTypes__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_CREATE_ITEM\"], event => {\n      let exists = this.data.some(item => {\n        if (item.name === event.detail.name && Boolean(item.folder) === Boolean(event.detail.folder)) {\n          alert('Already exists!!!');\n          return true;\n        }\n      });\n\n      if (!exists) {\n        this.data.push({\n          name: event.detail.name,\n          folder: event.detail.folder,\n          created_at: event.detail.created_at\n        });\n        this.dispatchDataChangedEvent();\n      }\n    });\n    this.filesExplorer.addEventListener(_events_eventsTypes__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_RENAME_ITEM\"], event => {\n      this.data.some(item => {\n        if (item.name === event.detail.oldName) {\n          return item.name = event.detail.newName;\n        }\n      });\n      this.dispatchDataChangedEvent();\n    });\n    this.filesExplorer.addEventListener(_events_eventsTypes__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_DELETE_ITEM\"], event => {\n      this.data.some((item, index) => {\n        if (item.name === event.detail.name) {\n          return this.data.splice(index, 1);\n        }\n      });\n      this.dispatchDataChangedEvent();\n    });\n    this.filesExplorer.addEventListener(_events_eventsTypes__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_OPEN_FOLDER\"], event => {\n      this.data.some(item => {\n        if (item.name === event.detail.name) {\n          this.history = this.history.concat([item.name]);\n          return this.data = item.folder;\n        }\n      });\n      this.dispatchDataChangedEvent();\n    });\n    this.filter.addEventListener(_events_eventsTypes__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_FILTERS_CHANGED\"], event => {\n      this.filters = event.detail;\n      this.dispatchDataChangedEvent();\n    });\n    this.breadcrumb.addEventListener(_events_eventsTypes__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_BREADCRUMB_BACK\"], () => {\n      this.history.pop();\n      this.history = this.history;\n      this.backInHistory();\n    });\n  }\n\n  dispatchDataChangedEvent() {\n    let data = this.data.filter(item => {\n      return (this.filters.onlyFolders ? Boolean(item.folder) === Boolean(this.filters.onlyFolders) : true) && (this.filters.date ? new Date(item.created_at).toDateString() === new Date(this.filters.date).toDateString() : true);\n    });\n    this.filesExplorer.dispatchEvent(new CustomEvent(_events_eventsTypes__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_DATA_CHANGED\"], {\n      detail: data\n    }));\n  }\n\n  dispachBreadcrumbChangedEvent() {\n    this.breadcrumb.dispatchEvent(new CustomEvent(_events_eventsTypes__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_BREADCRUMB_CHANGED\"], {\n      detail: this.history\n    }));\n  }\n\n  backInHistory() {\n    let data = this.baseFolder.data;\n\n    for (let i = 0; i < this.history.length; i++) {\n      data.some(item => {\n        if (item.name === this.history[i]) {\n          return data = item.folder;\n        }\n      });\n    }\n\n    this.data = data;\n    this.dispatchDataChangedEvent();\n  }\n\n}\nFileBrowser.refs = {};\n\n//# sourceURL=webpack:///./components/fileBrowser.js?");

/***/ }),

/***/ "./components/filesExplorer.js":
/*!*************************************!*\
  !*** ./components/filesExplorer.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FilesExplorer; });\n/* harmony import */ var _events_eventsTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../events/eventsTypes */ \"./events/eventsTypes.js\");\n\nclass FilesExplorer {\n  set data(data) {\n    this.dataVal = data;\n\n    if (this.list) {\n      this.renderList();\n    }\n  }\n\n  get data() {\n    return this.dataVal;\n  }\n\n  init(container, data) {\n    this.container = container;\n    this.data = data;\n    this.render();\n  }\n\n  render() {\n    this.container.innerHTML = FilesExplorer.markup(this);\n    this.addFolderButton = this.container.querySelector('.add-folder');\n    this.addFileButton = this.container.querySelector('.add-file');\n    this.list = this.container.querySelector('.list');\n    this.list.innerHTML = FilesExplorer.listMarkup(this);\n    this.addEventListeners();\n  }\n\n  renderList() {\n    this.list.innerHTML = FilesExplorer.listMarkup(this);\n  }\n\n  static markup(instance) {\n    return `\n        <div>\n            <div>\n                <hr>\n                <button class=\"add-file\">Add file</button>\n                <button class=\"add-folder\">Add folder</button>\n            </div>\n            <div class=\"list\">\n            </div>\n        </div> \n    `;\n  }\n\n  static listMarkup(instance) {\n    let list = '';\n\n    if (instance.data) {\n      instance.data.filter(el => el.folder).forEach(el => {\n        list += `<div style=\"display: flex; justify-content: space-between\">\n                                <div>\n                                    <b>[..]</b> \n                                    <span style=\"cursor: pointer\" data-goal='open' data-name=\"${el.name}\">${el.name}</span>\n                                    <span style=\"color: gray\"> ${el.created_at}</span>\n                                </div>\n                                <div>\n                                    <button data-goal='rename' data-name=\"${el.name}\">Rename</button>\n                                    <button data-goal='delete' data-name=\"${el.name}\">Delete</button>\n                                </div>\n                               \n                            </div>`;\n      });\n      instance.data.filter(el => !el.folder).forEach(el => {\n        list += `<div style=\"display: flex; justify-content: space-between\">\n                                <div>\n                                    <i>${el.name}</i>\n                                    <span style=\"color: gray\"> ${el.created_at}</span>\n                                </div>\n                               <div>\n                                    <button data-goal='rename' data-name=\"${el.name}\">Rename</button>\n                                    <button data-goal='delete' data-name=\"${el.name}\">Delete</button>\n                               </div>\n                            </div>`;\n      });\n    }\n\n    return list;\n  }\n\n  constructor({\n    container,\n    data\n  }) {\n    // The constructor should only contain the boiler plate code for finding or creating the reference.\n    if (typeof container.dataset.ref === 'undefined') {\n      this.ref = Math.random();\n      FilesExplorer.refs[this.ref] = this;\n      container.dataset.ref = this.ref;\n      this.init(container, data);\n    } else {\n      // If this element has already been instantiated, use the existing reference.\n      return FilesExplorer.refs[container.dataset.ref];\n    }\n  }\n\n  addEventListeners() {\n    this.addFolderButton.addEventListener('click', () => {\n      let folderName = prompt('Enter folder name', 'New folder');\n      this.addItem(folderName, true);\n    });\n    this.addFileButton.addEventListener('click', () => {\n      let fileName = prompt('Enter file name', 'new file.txt');\n      this.addItem(fileName, false);\n    });\n    this.container.querySelector('.list').addEventListener('click', event => {\n      if (event.target.dataset.goal === 'rename') {\n        this.renameItem(event.target.dataset.name);\n      } else if (event.target.dataset.goal === 'delete') {\n        this.deleteItem(event.target.dataset.name);\n      } else if (event.target.dataset.goal === 'open') {\n        this.openFolder(event.target.dataset.name);\n      }\n    });\n    this.container.addEventListener(_events_eventsTypes__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_DATA_CHANGED\"], event => {\n      this.data = event.detail;\n    });\n  }\n\n  addItem(name, folder) {\n    if (name) {\n      let date = new Date();\n      this.container.dispatchEvent(new CustomEvent(_events_eventsTypes__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_CREATE_ITEM\"], {\n        detail: {\n          folder: folder ? [] : null,\n          name: name,\n          created_at: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()\n        }\n      }));\n    }\n  }\n\n  renameItem(oldName) {\n    let newName = prompt('Enter folder name', oldName);\n\n    if (newName) {\n      this.container.dispatchEvent(new CustomEvent(_events_eventsTypes__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_RENAME_ITEM\"], {\n        detail: {\n          oldName,\n          newName\n        }\n      }));\n    }\n  }\n\n  deleteItem(name) {\n    this.container.dispatchEvent(new CustomEvent(_events_eventsTypes__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_DELETE_ITEM\"], {\n      detail: {\n        name\n      }\n    }));\n  }\n\n  openFolder(name) {\n    this.container.dispatchEvent(new CustomEvent(_events_eventsTypes__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_OPEN_FOLDER\"], {\n      detail: {\n        name\n      }\n    }));\n  }\n\n}\n;\nFilesExplorer.refs = {};\n\n//# sourceURL=webpack:///./components/filesExplorer.js?");

/***/ }),

/***/ "./components/filter.js":
/*!******************************!*\
  !*** ./components/filter.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FiltersComponent; });\n/* harmony import */ var _events_eventsTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../events/eventsTypes */ \"./events/eventsTypes.js\");\n\nclass FiltersComponent {\n  init(container) {\n    this.container = container;\n    this.filters = {\n      onlyFolders: false,\n      date: null\n    };\n    this.render();\n  }\n\n  render() {\n    this.container.innerHTML = FiltersComponent.markup(this);\n    this.checbox = this.container.querySelector('#showFoldersOnly');\n    this.date = this.container.querySelector('#date');\n    this.addEventListeners();\n  }\n\n  static markup({}) {\n    return `\n            <div>\n                <div>\n                    <label for=\"showFoldersOnly\">Show folders only</label>\n                    <input type=\"checkbox\" name=\"showFoldersOnly\" id=\"showFoldersOnly\">  \n                </div>\n\n                <div>\n                    <label for=\"date\">Select date</label>\n                    <input type=\"date\" name=\"date\" id=\"date\">\n                </div>\n            </div>\n    `;\n  }\n\n  constructor({\n    container\n  }) {\n    // The constructor should only contain the boiler plate code for finding or creating the reference.\n    if (typeof container.dataset.ref === 'undefined') {\n      this.ref = Math.random();\n      FiltersComponent.refs[this.ref] = this; // container.dataset.ref = this.ref;\n\n      this.init(container);\n    } else {\n      // If this element has already been instantiated, use the existing reference.\n      return FiltersComponent.refs[container.dataset.ref];\n    }\n  }\n\n  addEventListeners() {\n    this.checbox.addEventListener('change', e => {\n      this.filters.onlyFolders = e.target.checked;\n      this.applyFilters();\n    });\n    this.date.addEventListener('change', e => {\n      this.filters.date = e.target.value;\n      this.applyFilters();\n    });\n  }\n\n  applyFilters() {\n    this.container.dispatchEvent(new CustomEvent(_events_eventsTypes__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_FILTERS_CHANGED\"], {\n      detail: this.filters\n    }));\n  }\n\n}\nFiltersComponent.refs = {};\n\n//# sourceURL=webpack:///./components/filter.js?");

/***/ }),

/***/ "./events/eventsTypes.js":
/*!*******************************!*\
  !*** ./events/eventsTypes.js ***!
  \*******************************/
/*! exports provided: EVENT_DATA_CHANGED, EVENT_CREATE_ITEM, EVENT_RENAME_ITEM, EVENT_DELETE_ITEM, EVENT_OPEN_FOLDER, EVENT_FILTERS_CHANGED, EVENT_BREADCRUMB_CHANGED, EVENT_BREADCRUMB_BACK */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_DATA_CHANGED\", function() { return EVENT_DATA_CHANGED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_CREATE_ITEM\", function() { return EVENT_CREATE_ITEM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_RENAME_ITEM\", function() { return EVENT_RENAME_ITEM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_DELETE_ITEM\", function() { return EVENT_DELETE_ITEM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_OPEN_FOLDER\", function() { return EVENT_OPEN_FOLDER; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_FILTERS_CHANGED\", function() { return EVENT_FILTERS_CHANGED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_BREADCRUMB_CHANGED\", function() { return EVENT_BREADCRUMB_CHANGED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_BREADCRUMB_BACK\", function() { return EVENT_BREADCRUMB_BACK; });\nconst EVENT_DATA_CHANGED = 'EVENT_DATA_CHANGED';\nconst EVENT_CREATE_ITEM = 'EVENT_CREATE_ITEM';\nconst EVENT_RENAME_ITEM = 'EVENT_RENAME_ITEM';\nconst EVENT_DELETE_ITEM = 'EVENT_DELETE_ITEM';\nconst EVENT_OPEN_FOLDER = 'EVENT_OPEN_FOLDER';\nconst EVENT_FILTERS_CHANGED = 'EVENT_FILTERS_CHANGED';\nconst EVENT_BREADCRUMB_CHANGED = 'EVENT_BREADCRUMB_CHANGED';\nconst EVENT_BREADCRUMB_BACK = 'EVENT_BREADCRUMB_BACK';\n\n//# sourceURL=webpack:///./events/eventsTypes.js?");

/***/ })

/******/ });