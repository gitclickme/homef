"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableItemManagement = exports.MTable = exports.Pagination = exports.TableShow = void 0;
class header {
    headerText = '';
    isSortable = false;
}
class TableShow {
    itemXPage;
    paginator;
    newItem;
    beginRow;
    endRow;
    constructor(endRow) {
        this.itemXPage = [10, 25, 50];
        this.paginator = true,
            this.newItem = false;
        this.beginRow = 1;
        this.endRow = endRow;
    }
}
exports.TableShow = TableShow;
class Pagination {
    _totalRow = 1;
    totalPages = 1;
    indexPage = 1;
    rowXPage = 25;
    currentPage = 0;
    pageButtonArray = [];
    showNextButton = false;
    showPreviousButton = false;
    show;
    constructor() {
        this.rowXPage = 10;
        this.indexPage = 1;
        this.pageButtonArray = new Array(this.totalPages);
        this.currentPage = 0;
        this.togglePreviousNextButton();
        this.show = new TableShow(this.rowXPage);
    }
    set totalRow(totalRow) {
        this._totalRow = totalRow;
        if (Math.floor(this._totalRow / this.rowXPage) < (this._totalRow / this.rowXPage))
            this.totalPages = Math.floor(this._totalRow / this.rowXPage) + 1;
        else
            this.totalPages = Math.floor(this._totalRow / this.rowXPage);
        this.pageButtonArray = new Array(this.totalPages);
        this.togglePreviousNextButton();
    }
    get totalRow() {
        return this._totalRow;
    }
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
        this.togglePreviousNextButton();
    }
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
        this.togglePreviousNextButton();
    }
    goPage(currentPage) {
        this.currentPage = currentPage;
        this.togglePreviousNextButton();
    }
    changeRowXPage() {
        if (Math.floor(this._totalRow / this.rowXPage) < (this._totalRow / this.rowXPage))
            this.totalPages = Math.floor(this._totalRow / this.rowXPage) + 1;
        else
            this.totalPages = Math.floor(this._totalRow / this.rowXPage);
        this.currentPage = 0;
        this.pageButtonArray = new Array(this.totalPages);
        this.togglePreviousNextButton();
    }
    togglePreviousNextButton() {
        if (this.totalPages > 1) {
            this.showNextButton = true;
            this.showPreviousButton = true;
            this.show.beginRow = (this.currentPage * this.rowXPage) + 1;
            this.show.endRow = this.show.beginRow + this.rowXPage - 1;
            if (this.currentPage == 0) {
                this.showPreviousButton = false;
            }
            if (this.currentPage + 1 == this.totalPages) {
                this.showNextButton = false;
                this.show.endRow = this.totalRow;
            }
            this.indexPage = Math.floor(this.currentPage / 10) + 1;
        }
        else {
            this.showPreviousButton = false;
            this.showNextButton = false;
        }
    }
}
exports.Pagination = Pagination;
class MTable {
    title;
    heading;
    show = { 'itemXPage': [10, 25, 50], 'pagination': true, 'newItem': false };
    dataSource;
    pagination;
    filter = '';
    constructor(title) {
        this.title = title ? title : 'Table title';
        this.heading = [];
        this.show = { 'itemXPage': [10, 25, 50], 'pagination': true, 'newItem': false };
        this.filter = '';
        this.dataSource = [];
        this.pagination = new Pagination();
    }
}
exports.MTable = MTable;
class tableItemManagement {
    searchText;
    isEditing = false;
    constructor(searchText) {
        this.searchText = searchText ? searchText.toLowerCase() : '';
        this.isEditing = false;
    }
}
exports.tableItemManagement = tableItemManagement;
