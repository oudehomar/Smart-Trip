import { Component, OnInit, SimpleChanges } from '@angular/core';
import { HotelService } from 'src/app/hotels/hotel/hotel.service';
import { Hotel } from 'src/app/hotels/hotel/model/hotel';
import { HotelComponent } from 'src/app/hotels/hotel/hotel.component';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Filter } from 'src/app/hotels/hotel/model/filter';




@Component({
  selector: 'app-searchbar-lp',
  templateUrl: './searchbar-lp.component.html',
  styleUrls: ['./searchbar-lp.component.css'],

})
export class SearchbarLpComponent implements OnInit {

  optionsHotel = ["Alle anzeigen", "Preis", "Sterne"];
  selectedOption: string = this.optionsHotel[0];
  filteredHotelList: Hotel[];
  filterObject: Filter = new Filter();
  sliderPrice: number;



  constructor(private hotelService: HotelService, private router: Router
    ) { }


  ngOnInit() {
  }



  changePrice(slideValue: number) {
    this.filterObject.maxPrice = slideValue;
  }

  changeStars(slideValueStars: number): void {
    this.filterObject.stars = slideValueStars;
  }


  public setBooleansOfFiterObject(filterObject: Filter) {
    this.filterObject.hasFreeBreakfast = filterObject.hasFreeBreakfast;
    this.filterObject.hasFreeParking = filterObject.hasFreeParking;
  }


  public getHotelListWithFilterObject(filterObject: Filter) {
    this.hotelService.getHotelsWithFilterObject(filterObject)
      .subscribe(fetchedHotels => this.filteredHotelList = fetchedHotels);
  }

}














