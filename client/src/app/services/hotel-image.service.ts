import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = 'http://localhost:8080/api/hotelImage';
@Injectable({
  providedIn: 'root'
})

export class HotelImageService {

  constructor( private http: HttpClient) { }
  getImages(id: number) {
    return this.http.get(`${baseUrl}?hotelId=${id}`);
  }
  getAll() {
    return this.http.get(baseUrl);
  }
}
