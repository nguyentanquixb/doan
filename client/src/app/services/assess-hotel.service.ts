import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const API = 'http://localhost:8080/api/hotelAssessment/';
const APIIMG = 'http://localhost:8080/api/imageAssess/';

@Injectable({
  providedIn: 'root'
})
export class AssessHotelService {

  constructor(private http : HttpClient) { }

  create(data: any) {
    return this.http.post(API, data);
  }
  createimg(data: any) {
    return this.http.post(APIIMG, data);
  }
  getAll() {
    return this.http.get(APIIMG);
  }
  getAllHotelAssess(hotelId:number) {
    return this.http.get(`${API}?hotelId=${hotelId}`);
  }
}
