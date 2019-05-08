import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { makeBindingParser } from '@angular/compiler';

interface IModel {
  id: number;
  year: string;
  make: string;
  model: string;
  hasDetails: number;
}

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  year = 0;
  years: number[] = [];
  make = 'all';
  makes: string[] = [];
  models: IModel[] = [];
  offset = 0;

  constructor(private http: HttpClient) {
    this.getYears();
    this.getMakes();
  }

  ngOnInit() {
  }

  async getYears() {
    this.years = await this.http.get<number[]>('https://vehicle-data.azurewebsites.net/api/years').toPromise();
  }

  async getMakes() {
    this.makes = await this.http.get<string[]>('https://vehicle-data.azurewebsites.net/api/makes').toPromise();
  }

  async getData() {
    if (this.year === 0 && this.make === 'all') {
      this.models = await this.http.get<IModel[]>('https://vehicle-data.azurewebsites.net/api/models').toPromise();
    } else if (this.year !== 0 && this.make === 'all') {
      this.models = await this.http.get<IModel[]>(`https://vehicle-data.azurewebsites.net/api/models?year=${this.year}&offset=${this.offset}`).toPromise();
    } else if (this.year === 0 && this.make !== 'all') {
      this.models = await this.http.get<IModel[]>(`https://vehicle-data.azurewebsites.net/api/models?make=${this.make}&offset=${this.offset}`).toPromise();
    } else if (this.year !== 0 && this.make !== 'all') {
      this.models = await this.http.get<IModel[]>(`https://vehicle-data.azurewebsites.net/api/models?make=${this.make}&year=${this.year}&offset=${this.offset}`).toPromise();
    }
  }
}
