

class header {
  headerText:string = '';
  isSortable?:boolean = false;
}

export class TableShow{
  itemXPage: number[] ;
  paginator:boolean;
  newItem:boolean;
  beginRow:number;
  endRow:number;


  constructor(endRow:number){
      this.itemXPage = [10,25,50];
      this.paginator = true,
      this.newItem = false;
      this.beginRow = 1;
      this.endRow= endRow;
  }
}

export class Pagination{
  private  _totalRow: number = 1;
  totalPages: number = 1;
  indexPage:number = 1;
  rowXPage:number = 25;
  currentPage: number = 0;
  pageButtonArray:Array<number> = [];
  showNextButton: boolean = false;
  showPreviousButton:boolean = false;
  show : TableShow ;

   constructor(){
      this.rowXPage = 10;
      this.indexPage = 1;
      this.pageButtonArray = new Array(this.totalPages);
      this.currentPage = 0;
      this.togglePreviousNextButton();
      this.show = new TableShow(this.rowXPage);
  }

  set totalRow(totalRow:number){
      this._totalRow = totalRow;

      if(Math.floor(this._totalRow/this.rowXPage) < (this._totalRow/this.rowXPage))
           this.totalPages = Math.floor(this._totalRow/this.rowXPage)+1;
      else
          this.totalPages = Math.floor(this._totalRow/this.rowXPage);

      this.pageButtonArray = new Array(this.totalPages);
      this.togglePreviousNextButton();
  }

  get totalRow(){
      return this._totalRow;
  }

  nextPage() {
      if (this.currentPage < this.totalPages) {
          this.currentPage++;
         }
         this.togglePreviousNextButton()
      }

  previousPage(){
      if(this.currentPage > 1){
          this.currentPage --;
      }
      this.togglePreviousNextButton();
  }

  goPage(currentPage:number){
      this.currentPage = currentPage;
      this.togglePreviousNextButton();
  }

  changeRowXPage(){
      if(Math.floor(this._totalRow/this.rowXPage) < (this._totalRow/this.rowXPage))
          this.totalPages = Math.floor(this._totalRow/this.rowXPage)+1;
      else
          this.totalPages = Math.floor(this._totalRow/this.rowXPage);
      this.currentPage = 0;
      this.pageButtonArray = new Array(this.totalPages);
      this.togglePreviousNextButton();
  }

  togglePreviousNextButton() {
      if (this.totalPages > 1) {
          this.showNextButton = true;
          this.showPreviousButton = true;
          this.show.beginRow = (this.currentPage * this.rowXPage)  +  1;
          this.show.endRow = this.show.beginRow + this.rowXPage - 1;

          if (this.currentPage == 0) {
              this.showPreviousButton = false;
          }
          if (this.currentPage + 1 == this.totalPages) {
              this.showNextButton = false;
              this.show.endRow = this.totalRow;
          }
          this.indexPage = Math.floor(this.currentPage/10)+1;
        }
        else{
          this.showPreviousButton = false;
          this.showNextButton = false;
        }
  }

}

export class MTable {
  title:string;
  heading?: Array<header>;
  show = {'itemXPage':[10,25,50], 'pagination':true,  'newItem':false};
  dataSource: any[];
  pagination! : Pagination;
  filter : string= '';


  constructor(title?:string){
     this.title = title?title:'Table title';
      this.heading =  [];
      this.show = {'itemXPage':[10,25,50], 'pagination':true,  'newItem':false};
      this.filter = '';
      this.dataSource = [];
      this.pagination = new Pagination();
  }

}

export class tableItemManagement{
  searchText:string;
  isEditing:boolean = false;

  constructor(searchText?:string){
      this.searchText = searchText ? searchText.toLowerCase():'';
      this.isEditing = false;
  }
}

