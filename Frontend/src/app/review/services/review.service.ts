import { Review } from './../model/review';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  public getReviews(id: number): Observable<Review[]> {
    return this.http.get<Review[]>('http://localhost:8080/smart-trip/reviews/' + id);
  }

  public addReview(id: number, review: Review): Observable<Review> {
    return this.http.post<Review>('http://localhost:8080/smart-trip/reviews/' + id + '/add', review);
  }

  public deleteReview(id: number): Observable<Review> {
    return this.http.delete<Review>('http://localhost:8080/smart-trip/reviews/delete/' + id);
  }

  public updateReview(restaurantID: number, reviewId: number, review: Review): Observable<Review> {
    return this.http.put<Review>('http://localhost:8080/smart-trip/reviews/update/' + restaurantID + '/' + reviewId, review);
  }

  public getReviewPerId(id: number): Observable<Review> {
    return this.http.get<Review>('http://localhost:8080/smart-trip/reviews/find/' + id);
  }
}
