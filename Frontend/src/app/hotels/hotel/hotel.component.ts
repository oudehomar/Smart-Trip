import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from './model/hotel';
import { HotelService } from './hotel.service';



@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {


  listOfHotels: Hotel[];
  listOfFilteredHotels: Hotel[];

  hotel: Hotel;
  testzahl: number = 4;
  testURL = "./assets/img/hotel.png";


  constructor(private hotelService: HotelService) { }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  public setStars(hotel: Hotel): void {
    if (hotel.stars === "Dreistern") {
      this.testURL = "./assets/img/palm.png";
    } else {
      this.testURL = "./assets/img/hotel.png";
    }
  }
}









