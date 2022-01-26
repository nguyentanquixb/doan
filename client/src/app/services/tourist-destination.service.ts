import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const visitingPlace = 'http://localhost:8080/api/visitingPlace';
@Injectable({
  providedIn: 'root'
})
export class TouristDestinationService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(visitingPlace);
  }

  getId(id: number){
    return this.http.get(`${visitingPlace}/${id}`);
  }
}
