import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Hotel } from './model/hotel';
import { Filter } from './model/filter';
import { Review } from './model/review';
import { AvgRating } from './model/avgRating';


const apiHotelRoot = "http://localhost:8080/smart-trip/hotels/";


@Injectable({
  providedIn: 'root'
})
export class HotelService {

  filteredHotelList: Hotel[] = [];

  constructor(private http: HttpClient) { }

  public fetchAllHotelsWithoutCity(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(apiHotelRoot);
  }

  public getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(apiHotelRoot);

  }

  public updateHotel(hotel: Hotel, id: number): Observable<Hotel> {
    return this.http.put<Hotel>(apiHotelRoot + id, {});
  }

  public deleteReview(id: number): Observable<Review> {
    return this.http.delete<Review>("http://localhost:8080/smart-trip/reviews/deletehotrev/" + id);
  }

  public saveReviewAndPush(review: Review, id: number): Observable<Review> {
    return this.http.post<Review>("http://localhost:8080/smart-trip/reviews/hotel/save/" + id, review);
  }

  public fetchById(id: number | string): Observable<Hotel> {
    return this.http.get<Hotel>(apiHotelRoot + "findbyid/" + id);
  }

  public findReviewList(id: number | string): Observable<Review[]> {
    return this.http.get<Review[]>(apiHotelRoot + "reviews/" + id);
  }

  public getAvgRatingStats(id: number | string): Observable<AvgRating> {
    return this.http.get<AvgRating>(apiHotelRoot + "avgrevstats/" + id);
  }

  public getHotelsWithFilterObject(filter: Filter): Observable<Hotel[]> {
    console.log(filter);
    return this.http.post<Hotel[]>(apiHotelRoot + "findbyfilter", filter);
  }

}
