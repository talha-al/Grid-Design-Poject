import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  selectedValue: number = null as any;
  model: HeaderModel[] = [];
  cars = {} as HeaderModel;
  softwareLanguages = {} as HeaderModel
  computers = {} as HeaderModel
  phones = {} as HeaderModel
  numbers = {} as HeaderModel

  dataModel: DataModel[] = [
    { id: 0, txt: "Test1", desc: "desc1", price: "$500" },
    { id: 1, txt: "Test2", desc: "desc2", price: "$780" },
    { id: 2, txt: "Test3", desc: "desc3", price: "$220" },
    { id: 3, txt: "Test4", desc: "desc4", price: "$10" },
    { id: 4, txt: "Test5", desc: "desc5", price: "$857" },
    { id: 5, txt: "Test6", desc: "desc6", price: "$527" },
  ]

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getSelectedValue(value: number) {
    this.selectedValue = value;
  }

  getData() {
    this.http.get<HeaderModel[]>("./assets/model.json").subscribe(data => {
      localStorage.setItem("model", JSON.stringify(data));
      console.log(data);
      this.model = data;
      this.cars = this.model[0];
      this.softwareLanguages = this.model[1];
      this.computers = this.model[2];
      this.phones = this.model[3];
      this.numbers = this.model[4];
    })
  }

}

export interface DataModel {
  id: number;
  txt: string;
  desc: string;
  price: string
}

export interface SelectedDataModel {
  id: number;
  name: string;
}
export interface HeaderModel {
  id: number;
  header: string;
  data: SelectedDataModel[];
}
export interface JsonModel {
  cars: HeaderModel;
  softwareLanguages: HeaderModel;
}

