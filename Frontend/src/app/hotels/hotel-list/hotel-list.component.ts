import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { Hotel } from '../hotel/model/hotel';
import { HotelService } from '../hotel/hotel.service';
import { Pipe, PipeTransform } from "@angular/core";
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AvgRating } from '../hotel/model/avgRating';


@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

sortOptions:string[]=["Sortieren nach...","Günstigste","Bestes Rating", "Freundlichkeit", 
"Sauberkeit","Ambiente", "Qualität Verpflegung", "Familienfreundlichkeit", "Gesamtbewertung" ]

selectedSortOption = this.sortOptions[0];

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {

    this.hotelService.getHotels()
      .subscribe(fetchedHotels => (this.filteredHotelList = fetchedHotels));

  }

  @Input()
  filteredHotelList: Hotel[];

  ngOnChanges(changes: SimpleChange) {
    console.log(this.filteredHotelList);

  }

  sortListFunction(){

    if (this.selectedSortOption === this.sortOptions[1]){
        this.sortByPriceDesc();

    } else if (this.selectedSortOption === this.sortOptions[2]){
      this.sortByRatingDesc();

    } else if (this.selectedSortOption === this.sortOptions[3]){
      this.sortByFriendlyDesc();

    } else if (this.selectedSortOption === this.sortOptions[4]){
      this.sortByCleanDesc();

    } else if (this.selectedSortOption === this.sortOptions[5]){
      this.sortByAmbienceDesc();

    } else if (this.selectedSortOption === this.sortOptions[6]) {
      this.sortByFoodDesc();

    }  else if (this.selectedSortOption === this.sortOptions[7]) {
      this.sortByFamilyDesc();
    
    } else if (this.selectedSortOption === this.sortOptions[8]) {
      this.sortByRatingDesc();

    }
  }



 

  sortByRatingDesc() {
    this.filteredHotelList = this.filteredHotelList.sort(function (a, b) { return b.avgRatingStats.avgTotalRating - a.avgRatingStats.avgTotalRating; })
    console.log(this.filteredHotelList)
   
  }

  sortByCleanDesc() {
    this.filteredHotelList = this.filteredHotelList.sort(function (a, b)
     { return b.avgRatingStats.avgClean - a.avgRatingStats.avgClean; })
  }

  sortByFriendlyDesc() {
    this.filteredHotelList = this.filteredHotelList.sort(function (a, b) { return b.avgRatingStats.avgFriendly - a.avgRatingStats.avgFriendly; })
  }

  sortByFoodDesc() {
    this.filteredHotelList = this.filteredHotelList.sort(function (a, b) { return b.avgRatingStats.avgFood - a.avgRatingStats.avgFood; })
  }

  sortByFamilyDesc() {
    this.filteredHotelList = this.filteredHotelList.sort(function (a, b) { return b.avgRatingStats.avgFamily - a.avgRatingStats.avgFamily; })
  }

  sortByAmbienceDesc() {
    this.filteredHotelList = this.filteredHotelList.sort(function (a, b) { return b.avgRatingStats.avgAmbience - a.avgRatingStats.avgAmbience; })
  }

  sortByPriceDesc() {
    this.filteredHotelList = this.filteredHotelList.sort(function (a, b) { return a.price - b.price ; })
  }


}
