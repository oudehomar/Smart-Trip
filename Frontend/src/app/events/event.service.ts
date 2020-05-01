import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { SocialEvent } from './model/event';

const eventRoot = 'http://localhost:8080/smart-trip/events/';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  fetchAllEvents(): Observable<SocialEvent[]> {
    return this.http.get<SocialEvent[]>(eventRoot);
  }

  fetchById(id: number): Observable<SocialEvent> {
    return this.http.get<SocialEvent>(eventRoot + id);
  }

  showAllEventsWithIncreasingPrice(): Observable<SocialEvent[]> {
    return this.http.get<SocialEvent[]>(eventRoot + '/increasingprice');
  }

  showAllEventsWithDecreasingPrice(): Observable<SocialEvent[]> {
    return this.http.get<SocialEvent[]>(eventRoot + '/decreasingprice');
  }

  showAllEventsWithIncreasingCapacity(): Observable<SocialEvent[]> {
    return this.http.get<SocialEvent[]>(eventRoot + '/increasingcapacity');
  }
  showAllEventsWithDecreasingCapacity(): Observable<SocialEvent[]> {
    return this.http.get<SocialEvent[]>(eventRoot + '/decreasingcapacity');
  }

  findTypesOfEventsWithinPriceRange(typeOfEvent: string, minPrice: number, maxPrice: number): Observable<SocialEvent[]> {
    return this.http.get<SocialEvent[]>(eventRoot + '&typeOfEvent=' + typeOfEvent +
                                         '&minPrice=' + minPrice + '&maxPrice=' + maxPrice);
  }

  findAllTypesOfEventsWithinPriceRangeInCity(city: string, minPrice: number, maxPrice: number): Observable<SocialEvent[]> {
    return this.http.get<SocialEvent[]>(eventRoot + '?city=' + city + '&minPrice=' + minPrice + '&maxPrice=' + maxPrice);

  }
  findEventsByTypeAndPriceInCity(city: string, typeOfEvent: string, minPrice: number, maxPrice: number): Observable<SocialEvent[]> {
    return this.http.get<SocialEvent[]>(eventRoot + '?city=' + city + '&typeOfEvent=' + typeOfEvent +
                                         '&minPrice=' + minPrice + '&maxPrice=' + maxPrice);
  }

}
