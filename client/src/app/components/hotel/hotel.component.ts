import { Component, OnInit } from '@angular/core';
import { Event } from '@angular/router';

import { HotelService } from 'src/app/services/hotel.service';




@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'],

})


export class HotelComponent implements OnInit {

  hotels: any;
  currentHotel = null;
  currentIndex = -1;
  name = '';
  title = '';

  constructor(
    private hotelService: HotelService,

  ) { }

  ngOnInit() {
    this.retrieveHotel();
  }

  retrieveHotel() {
    this.hotelService.getAll()
      .subscribe(
        data => {
          this.hotels = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  refreshList() {
    this.retrieveHotel();
    this.currentHotel = null;
    this.currentIndex = -1;
  }

  setActiveHotel(hotel: any, index: any) {
    this.currentHotel = hotel;
    this.currentIndex = index;
  }
  searchTitle() {
    this.hotelService.findByTitle(this.name)
      .subscribe(
        data => {
          this.hotels = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  checkboxstar: any[] = [
    { name: "1 sao", value: "1" },
    { name: "2 sao", value: "2" },
    { name: "3 sao", value: "3" },
    { name: "4 sao", value: "4" },
    { name: "5 sao", value: "5" }
  ]
  checkboxDistrict: any[] = [
    { name: "Bình định", value: "1" },
    { name: "Gần Chùa Long khách", value: "2" },
    { name: "Gần Danh thắng Hầm Hô", value: "3" },
  ]

  TypeofAccommodation: any[] = [
    { name: "Khu nghỉ dưỡng (Resort)", value: "Resort" },
    { name: "Biệt thự (Villa)", value: "Villa" },
    { name: "Khách sạn (Hotel)", value: "Hotel" },
    { name: " Căn hộ (Apartment)", value: "Apartment" },
  ]
  Utilities: any[] = [
    { name: "Phòng gia đình", value: "Phòng gia đình" },
    { name: "Bãi biển riêng", value: "Bãi biển riêng" },
    { name: "Bãi đậu xe ô tô tại khách sạn", value: "Bãi đậu xe ô tô tại khách sạn" },
    { name: " Hồ bơi", value: "Hồ bơi" },
  ]

  checkstar: any[] = [];

  GetStar(event: any) {
    console.log(event)
    if (event.target.checked == true) {
      this.checkstar = [event.target.defaultValue]
      console.log(this.checkstar)
      this.hotelService.findByCheck(event.target.defaultValue)
        .subscribe(
          data => {
            this.hotels = data;
            console.log(data);
            console.log(event.target.defaultValue);
          },
          error => {
            console.log(error);
          });

    }
    else {
      this.retrieveHotel();
    }
  }

}
