import { Restaurant } from './../model/restaurant';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  public fetchAllRestaurants(): Observable<any[]> {
    return this.http.get<Restaurant[]>(' http://localhost:8080/smart-trip/restaurants/');
  }

  public fetchByCity(city: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(' http://localhost:8080/smart-trip/restaurants/?city=' + city);
  }

  public fetchById(id: number) {
    return this.http.get<Restaurant>('http://localhost:8080/smart-trip/restaurants/findbyid/' + id);
  }

  public fetchByType(type: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(' http://localhost:8080/smart-trip/restaurants/?type=' + type);
  }

  public fetchByRating(rating: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(' http://localhost:8080/smart-trip/restaurants/?rating=' + rating);
  }

  public fetchByCityAndRating(city: string, rating: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(' http://localhost:8080/smart-trip/restaurants/?city=' + city + '&rating=' + rating);
  }

  public fetchByCityAndType(city: string, type: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(' http://localhost:8080/smart-trip/restaurants/?city=' + city + '&type=' + type);
  }

  public fetchCityTypeRating(city: string, type: string, rating: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(' http://localhost:8080/smart-trip/restaurants/?city=' + city + '&type=' + type + '&rating=' + rating);
  }

  public fetchByRatingAndType(rating: number, type: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(' http://localhost:8080/smart-trip/restaurants/?rating=' + rating + '&type=' + type);
  }

  public fetchPerName(name: string) {
    return this.http.get<Restaurant>(' http://localhost:8080/smart-trip/restaurants/?name=' + name);
  }

  public fetchPerNameAndCity(name: string, city: string) {
    return this.http.get<Restaurant>(' http://localhost:8080/smart-trip/restaurants/?name=' + name + '&city=' + city);
  }

  public fetchRestaurantPerId(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(' http://localhost:8080/smart-trip/restaurants/findbyid/' + id);
  }
}
