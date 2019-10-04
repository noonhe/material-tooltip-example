import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { locale } from '../ag-grid-locale';
import 'ag-grid-enterprise';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {MyTooltipComponentComponent} from './my-tooltip-component/my-tooltip-component.component'
import { ICellRendererParams } from 'ag-grid-community';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'my-grid',
  templateUrl: './my-grid.component.html',
  styleUrls: ['./my-grid.component.css']
})
export class MyGridComponent implements OnInit {

  gridApi;
  gridColApi;
  frameworkComponents:any;
  columnDefs = [
    {width:60 ,headerName: '', field: '' , cellRenderer:'actionCellRenderer', resizable: false},
    {width:60 ,headerName: 'ترتیب', field: 'order' , editable:false},
    {width:150 ,headerName: 'عنوان', field: 'name', editable:false },
    {width:200 ,headerName: 'تیم ساخت', field:'team.name', editable:false }
  ];

  rowData:any;
  localeText:any;
  editType="fullRow";
  

defaultColDef={
  filter:true,
  sortable:true,
  resizable:true,
  tooltipComponent:"customTooltip"
}
  constructor(private http: HttpClient) { 
    this.localeText = locale;
    this.frameworkComponents = {
      customTooltip : MyTooltipComponentComponent,
      actionCellRenderer: MyCellRenedererComponent
    }
  }

  ngOnInit() {
    this.http.get('https://api.myjson.com/bins/u5kd5').subscribe(res=>{
      this.rowData = res;
    })
  }

  onGridReady(params){
    this.gridApi = params.api;
    this.gridColApi = params.columnApi;
    // this.autoSizeAll()
  }

  // autoSizeAll() {
  //   var allColumnIds = [];
  //   this.gridColApi.getAllColumns().forEach(function(column) {
  //     allColumnIds.push(column.colId);
  //   });
  //   this.gridColApi.autoSizeColumns(allColumnIds);
  // }

}


@Component({
  selector:'my-cell-renderer',
  template:`
  <div><button mat-icon-button matTooltip="ویرایش" (click)="onEditClicked($event)" ><mat-icon>edit</mat-icon></button></div>
  `,
  styleUrls:['my-cell-renderer.component.css']
})

export class MyCellRenedererComponent implements ICellRendererAngularComp{

  public params: ICellRendererParams;
  private rowData;
  private rowIndex;

  constructor(private editDialog: MatDialog){

  }

  agInit(params: ICellRendererParams){
    this.params = params;
    this.rowData = params.data;
    this.rowIndex = params.rowIndex;
  }

  onEditClicked(e){
    this.openDialog()
  }

  openDialog(){
    const dialogRef = this.editDialog.open(EditDialogComponent,{
      width:'400px',
      data:{
        rowData: this.rowData,
        rowIndex: this.rowIndex,
        params: this.params
      }
    });

    dialogRef.afterClosed().subscribe(
      res=>{
        console.log(res);
        this.params.node.setDataValue('name',res.rowData.name)
      }
    )
  }

  refresh(params : ICellRendererParams){
    return false;
  }

}

@Component({
  selector:'edit-dialog',
  templateUrl:'edit-dialog.component.html',
  styleUrls:['edit-dialog.component.css']
})

export class EditDialogComponent{

  title:string;
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      console.log(data)
      
    }

    onCancelEdit($event){
      this.dialogRef.close()
    }
}