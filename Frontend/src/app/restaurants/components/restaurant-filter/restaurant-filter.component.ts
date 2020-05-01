import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../model/restaurant';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-restaurant-filter',
  templateUrl: './restaurant-filter.component.html',
  styleUrls: ['./restaurant-filter.component.css']
})
export class RestaurantFilterComponent implements OnInit {
  city: string;
  rating: number;
  type: string;

  typeList: string[] = ['arabisch', 'indisch', 'turkisch', 'deutscheKueche'];
  ratingList: number[] = [1, 2, 3, 4, 5];
  cityList: string[] = ['Frankfurt', 'Mainz'];

  ok = false;

  public restaurantsList$: Restaurant[] | Observable<Restaurant[]>;
  public restaurant$: Restaurant | Observable<Restaurant> | Restaurant[];

  constructor(private restaurantService: RestaurantService, private router: Router) { }

  ngOnInit(): void { }

  changeOnRating(event: any) {
    this.rating = event;
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

  public fetchPerCityFromService() {
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
    if (this.city === undefined && this.rating !== undefined && this.type !== undefined) {
      this.fetchByRatingAndType();
    } else if (this.city !== null && this.type !== undefined && this.rating !== undefined) {
      this.fetchPerCityAndTypeAndRating();
    } else if (this.city === undefined && this.type !== undefined || null) {
      this.fetchByType();
    } else if (this.city === undefined && this.rating !== undefined || null) {
      this.fetchByRating();
    } else if (this.city !== null && this.type !== undefined) {
      this.fetchPerCityAndType();
    } else if (this.city !== null && this.rating !== undefined) {
      this.fetchPerCityAndRating();
    } else if (this.city === undefined) {
      this.fetchAll();
    } else if (this.city !== null) {
      this.fetchPerCityFromService();
    }
  }




}
