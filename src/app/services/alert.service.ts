import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  data: any;

  constructor() { }

  getData() {
    return this.data
  }

  setAlert(data: any) {
    this.data = data
  }

  dropAlert() {
    this.data == null
  }
}
