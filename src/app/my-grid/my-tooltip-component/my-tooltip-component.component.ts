import { Component } from '@angular/core';
import { ITooltipAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'my-tooltip-component',
  templateUrl: './my-tooltip-component.component.html',
  styleUrls: ['./my-tooltip-component.component.css']
})
export class MyTooltipComponentComponent implements ITooltipAngularComp {

  private params:any;
  private data:any;
  
  agInit(params){
    this.params = params;
    this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
    this.data.color = this.params.color || 'white';
  }

}
