import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = 'http://localhost:8080/api/hotel';
@Injectable({
  providedIn: 'root'
})

export class HotelService {

  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(baseUrl);
  }

  findByTitle(name:any) {
    return this.http.get(`${baseUrl}?name=${name}`);
  }
  // get(id) {
  //   return this.http.get(`${baseUrl}/${id}`);
  // }
  get(id: number){
    return this.http.get(`${baseUrl}/${id}`);
  }
  findByCheck(name: any) {
    return this.http.get(`${baseUrl}?name=${name}`);
  }
  update({ id, data }: { id: any; data: any; }) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
}
