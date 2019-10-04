import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {} from '@angular/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AgGridModule} from 'ag-grid-angular';
import { MyGridComponent, MyCellRenedererComponent, EditDialogComponent } from './my-grid/my-grid.component';
import { HttpClientModule } from '@angular/common/http';
import 'ag-grid-enterprise';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MyTooltipComponentComponent } from './my-grid/my-tooltip-component/my-tooltip-component.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BidiModule } from '@angular/cdk/bidi';

@NgModule({
  declarations: [
    AppComponent,
    MyGridComponent,
    MyTooltipComponentComponent,
    MyCellRenedererComponent,
    EditDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    BidiModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    MatExpansionModule,
    MatTooltipModule,
    AgGridModule.withComponents([MyTooltipComponentComponent,MyCellRenedererComponent]),
    HttpClientModule
  ],
  entryComponents:[
    EditDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
