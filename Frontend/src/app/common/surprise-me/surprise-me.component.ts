import { EventService } from './../../events/event.service';
import { HotelService } from 'src/app/hotels/hotel/hotel.service';
import { RestaurantService } from './../../restaurants/services/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';

@Component({
  selector: 'app-surprise-me',
  templateUrl: './surprise-me.component.html',
  styleUrls: ['./surprise-me.component.css']
})

export class SurpriseMeComponent implements OnInit {

  listOfHotels: any[] | any;
  listOfRestaurant: any[] | any;
  listOfEvents: any[] | any;


  listOfAllNew: any[] | any = [];
  randomEntry: any[] | any = [];

  constructor(private restaurantServic: RestaurantService, private hotelService: HotelService, private eventService: EventService) { }



  ngOnInit(): void {

    this.restaurantServic.fetchAllRestaurants().subscribe(item => this.listOfRestaurant = item);
    this.hotelService.fetchAllHotelsWithoutCity().subscribe(item => this.listOfHotels = item);
    this.eventService.fetchAllEvents().subscribe(item => this.listOfEvents = item);

    this.giveMeArandom();

  }

  public giveMeArandom() {
    this.listOfAllNew = this.listOfAllNew.concat(this.listOfHotels);
    this.listOfAllNew = this.listOfAllNew.concat(this.listOfRestaurant);
    this.listOfAllNew = this.listOfAllNew.concat(this.listOfEvents);
    this.randomEntry = this.listOfAllNew[Math.floor(Math.random() * this.listOfAllNew.length)];


  }

}
