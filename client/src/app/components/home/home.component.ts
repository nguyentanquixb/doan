import { Component, OnInit } from '@angular/core';
import { TouristDestinationService } from 'src/app/services/tourist-destination.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  touristDestination:any
  constructor( private touristDestinationService : TouristDestinationService) { }

  ngOnInit(): void {
    this.retrieveTouristDestination();
  }
  retrieveTouristDestination() {
    this.touristDestinationService.getAll()
      .subscribe(
        data => {
          this.touristDestination = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
