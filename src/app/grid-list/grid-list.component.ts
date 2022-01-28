import { Component, Input, OnInit, Type } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss']
})
export class GridListComponent implements OnInit {
  @Input() dataArray: any[] = [];
  @Input() fieldNames: string[] = [];
  @Input() totalColumns: number = null as any;
  @Input() headers: string[] = [];
  @Input() headersColSpan: number[] = [];
  @Input() headersRowSpan: number[] = [];
  @Input() textAlign: string = "'left' | 'center'";
  @Input() headerFontWeight: string = "500";
  @Input() headerFontSize: string = "16px";
  @Input() cellFontSize: string = "15px";
  @Input() rowHeight: string = "55px";

  gridList: GridListModel[] = [];
  gridListData: GridListDataModel[] = [];

  constructor() {
  }

  ngOnInit(): void {

    setTimeout(() => {
      if (!this.dataArray.length) return console.error("Please enter 'dataArray' value!");
      if (!this.fieldNames.length) return console.error("Please enter 'fieldNames' value!");
      if (!this.headers.length) return console.error("Please enter 'headers' value!");
      if (!this.totalColumns) return console.error("Please enter 'totalColumns' value!");
      console.warn("If there are shifts in the grid, make sure that the sum of the colspans is equal to the total columns.")

      for (let i = 0; i < this.headers.length; i++) {
        if (this.headersColSpan.length < this.headers.length) this.headersColSpan.push(this.totalColumns / this.headers.length);
        if (this.headersRowSpan.length < this.headers.length) this.headersRowSpan.push(this.totalColumns / this.headers.length);
        this.gridList.push({ header: this.headers[i], colSpan: this.headersColSpan[i], rowSpan: this.headersRowSpan[i] })
        this.gridListData.push({ colSpan: this.headersColSpan[i], rowSpan: this.headersRowSpan[i], data: {} })
      }

      for (let i = 0; i < this.dataArray.length; i++) {
        if (this.gridListData[i] === undefined) this.gridListData.push({ colSpan: this.headersColSpan[i], rowSpan: this.headersRowSpan[i], data: this.dataArray[i] })
        this.gridListData[i].data = this.dataArray[i];
      }
    }, 200);
  }
}


export interface GridListModel {
  header: string;
  colSpan: number
  rowSpan: number;
}

export interface GridListDataModel {
  colSpan: number;
  rowSpan: number;
  data: any;
}


