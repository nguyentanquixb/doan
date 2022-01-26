import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  
  hotels: any;
  constructor(
    private hotelService: HotelService,
    private primengConfig: PrimeNGConfig

  ) { }

  ngOnInit(): void {
    this.retrieveHotel();
  }

  retrieveHotel() {
    this.hotelService.getAll()
      .subscribe(
        data => {
          this.hotels = data;
          console.log(this.hotels);
        },
        error => {
          console.log(error);
        });
  }
  status(status: any,id:number){
    const data = {
      published: status
    };

    this.hotelService.update({ id: id, data })
      .subscribe(
        response => {
          this.hotels.published = status;
          this.reloadPage();
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
  reloadPage(): void {
    window.location.reload();
  }

}
