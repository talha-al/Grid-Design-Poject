import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { HeaderModel } from '../home-page/home-page.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() itemArray = { data: [], id: null as any, header: "" } as HeaderModel;
  @Input() id: number = null as any;
  @Output() selectedValue = new EventEmitter<number>();
  model: HeaderModel[] = []

  constructor() {
    this.model = this.getModel();
    console.log(this.model);
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (this.itemArray.data.length && this.id !== null) {
        console.error("Hem array hem id parametresi gönderildi. Listeleme array'e göre yapılmıştır!")
      }

      if (!this.itemArray.data.length) {
        if (this.id < this.model.length) this.itemArray = this.model[this.id];
        else console.error("Gönderilen Id Değeri Geçersiz!")
      }
    }, 0);
  }

  change(event: MatSelectChange) {
    this.selectedValue.emit(event.value);
  }

  getModel(): HeaderModel[] {
    return JSON.parse(localStorage.getItem('model') || '{}');
  }

}
