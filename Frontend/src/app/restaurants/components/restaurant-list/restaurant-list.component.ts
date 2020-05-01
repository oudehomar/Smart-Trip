import { Restaurant } from './../../model/restaurant';
import { RestaurantService } from './../../services/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

enum LOADINGYPES {
  ON,
  OFF
}
@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  title: 'Restaurants';

  city: string;
  rating: number;
  type: string;
  name: string;

  typeList: string[] = ['Arabisch', 'Indisch', 'Tuerkisch', 'DeutscheKueche'];
  ratingList: number[] = [1, 2, 3, 4, 5];
  cityList: string[] = ['Frankfurt', 'Mainz'];

  ok = false;
  isLoading = true;

  public restaurant$: any[] | any = [];

  constructor(private restaurantService: RestaurantService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.findAllRestaurants();
    const city = this.route.snapshot.paramMap.get('city');
    this.restaurantService.fetchByCity(city).subscribe(res => {
      this.toggleLoading(LOADINGYPES.OFF);
      this.restaurant$ = res;
    });
  }


  private toggleLoading(loadingType: LOADINGYPES) {
    if (loadingType === LOADINGYPES.ON) {
      this.isLoading = true;
    }
    if (loadingType === LOADINGYPES.OFF) {
      this.isLoading = false;
    }
  }

  public findAllRestaurants() {
    this.restaurantService.fetchAllRestaurants().subscribe((restFromBackend: Restaurant[]) => this.restaurant$ = restFromBackend);
  }

  changeOnRating(event: any) {
    this.rating = event;
  }


  public fetchPerName(name: string) {
    if (this.city != null || this.city !== undefined) {
      this.restaurantService.fetchPerNameAndCity(name, this.city).subscribe((rFBackend: Restaurant) => this.restaurant$ = rFBackend);
    } else {
      this.restaurantService.fetchPerName(name).subscribe((rFBackend: Restaurant) => this.restaurant$ = rFBackend);
    }
  }



  public fetchPerCityAndRating() {
    this.restaurantService.fetchByCityAndRating(this.city, this.rating).subscribe((rFBackend: Restaurant) => this.restaurant$ = rFBackend);
  }

  public fetchPerCityAndType() {
    this.restaurantService.fetchByCityAndType(this.city, this.type).subscribe((rFBackend: Restaurant) => this.restaurant$ = rFBackend);
  }

  public fetchByRatingAndType() {
    this.restaurantService.fetchByRatingAndType(this.rating, this.type).subscribe((rFBackend: Restaurant) => this.restaurant$ = rFBackend);
  }

  public fetchPerCityAndTypeAndRating() {
    this.restaurantService.fetchCityTypeRating(this.city, this.type, this.rating).subscribe((r: Restaurant) => this.restaurant$ = r);
  }

  public fetchPerCityFromService2() {
    this.restaurantService.fetchByCity(this.city).subscribe((restFromBackend: Restaurant) => this.restaurant$ = restFromBackend);
  }

  public fetchByType() {
    this.restaurantService.fetchByType(this.type).subscribe((r: Restaurant) => this.restaurant$ = r);
  }

  public fetchByRating() {
    this.restaurantService.fetchByRating(this.rating).subscribe((r: Restaurant) => this.restaurant$ = r);
  }

  public fetchAll() {
    this.restaurantService.fetchAllRestaurants().subscribe((r: Restaurant[]) => this.restaurant$ = r);
  }

  public controller() {
    if (this.fetchWithRatingUndTypeWithoutCity()) {
      this.city == undefined;
      this.fetchByRatingAndType();
    } else if (this.fetchWithCityRatingType()) {
      this.fetchPerCityAndTypeAndRating();
    } else if (this.fetchType()) {
      this.fetchByType();
    } else if (this.fetchRating()) {
      this.fetchByRating();
    } else if (this.fetchCityAndType()) {
      this.fetchPerCityAndType();
    } else if (this.fetchCityAndRating()) {
      this.fetchPerCityAndRating();
    } else if (this.city === undefined) {
      this.fetchAll();
    } else if (this.city !== null) {
      this.fetchPerCityFromService2();
    }
  }

  private fetchCityAndRating() {
    return this.city !== null && this.rating !== undefined;
  }

  private fetchCityAndType() {
    return this.city !== null && this.type !== undefined;
  }

  private fetchRating() {
    return this.city === undefined && this.rating !== undefined || null;
  }

  private fetchType() {
    return this.city === undefined && this.type !== undefined || null;
  }

  private fetchWithCityRatingType() {
    return this.city !== null && this.type !== undefined && this.rating !== undefined;
  }

  private fetchWithRatingUndTypeWithoutCity() {
    return this.city === undefined && this.rating !== undefined && this.type !== undefined;
  }

  sortByRatingAsc() {
    this.restaurant$ = this.restaurant$.sort(function (a, b) { return a.rating - b.rating; });
    console.log(this.restaurant$);
  }

  sortByRatingDesc() {
    this.restaurant$ = this.restaurant$.sort(function (a, b) { return b.rating - a.rating; })
    console.log(this.restaurant$);

  }
}
