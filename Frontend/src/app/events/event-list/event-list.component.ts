
import { EventService } from './../event.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialEvent } from '../model/event';
import { Options, LabelType } from 'ng5-slider';
import { filter, groupBy, map, first, subscribeOn } from 'rxjs/operators';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {


  allEvents$: Observable<SocialEvent[]>;
  listOfEvents$: Observable<SocialEvent[]>;
  eventsInCity$: Observable<SocialEvent[]>;
  eventsInCityWithinPriceRange$: Observable<SocialEvent[]>;
  listOfEvents = [];

  typeOfEvent: string;
  sortAllEventsBy: string;
  sortEventsInCityBy: string;

  minValue = 0;
  maxValue = 200;
  options: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min Preis:</b> €' + value;
        case LabelType.High:
          return '<b>Max Preis:</b> €' + value;
        default:
        return '€' + value;
      }
    }
  };


  constructor(private service: EventService, private route: ActivatedRoute, private router: Router) {
    this.allEvents$ = this.service.fetchAllEvents();
    this.listOfEvents$ = this.allEvents$;
    this.listOfEvents$.subscribe(events => this.listOfEvents = events);
   }

  ngOnInit(): void {
  }



  /**------------------------------sort all events --------------------- */
  sortingAllEvents(sortAllEventsBy: string) {

    this.minValue = 0;
    this.maxValue = 200;

    this.sortAllEventsBy = sortAllEventsBy;

    switch (sortAllEventsBy) {
      case 'All Events':
        this.listOfEvents$ = this.service.fetchAllEvents();
        break;
      case 'Price: Low to High':
        this.listOfEvents$ = this.service.showAllEventsWithIncreasingPrice();
        break;
      case 'Price: High to Low':
        this.listOfEvents$ = this.service.showAllEventsWithDecreasingPrice();
        break;
      case 'Capacity: Low to High':
        this.listOfEvents$ = this.service.showAllEventsWithIncreasingCapacity();
        break;
      case 'Capacity: High to Low':
        this.listOfEvents$ =  this.service.showAllEventsWithDecreasingCapacity();
        break;
    }

    this.listOfEvents$.subscribe(events => this.listOfEvents = events);

  }



   /**------------------------------find all events in city--------------------- */
  searchByCity(city: string) {

      this.minValue = 0;
      this.maxValue = 200;

      this.eventsInCity$ = this.service.findAllTypesOfEventsWithinPriceRangeInCity(city, this.minValue, this.maxValue);

      this.listOfEvents$ = this.eventsInCity$;

      this.listOfEvents$.subscribe(events => this.listOfEvents = events);

  }
/**------------------------------sort events in city--------------------- */


  sortingEventsInCity(sortEventsInCityBy: string) {

    this.minValue = 0;
    this.maxValue = 200;

    this.sortEventsInCityBy = sortEventsInCityBy;

    switch (sortEventsInCityBy) {
      case 'Price: Low to High':
        this.listOfEvents$ = this.eventsInCity$.pipe(map(eventList => eventList.sort(this.sortByIncreasingPrice)));
        break;
      case 'Price: High to Low':
        this.listOfEvents$ = this.eventsInCity$.pipe(map(eventList => eventList.sort(this.sortByDecreasingPrice)));
        break;
      case 'Capacity: Low to High':
        this.listOfEvents$ = this.eventsInCity$.pipe(map(eventList => eventList.sort(this.sortByIncreasingCapacity)));
        break;
      case 'Capacity: High to Low':
        this.listOfEvents$ = this.eventsInCity$.pipe(map(eventList => eventList.sort(this.sortByDecreasingCapacity)));
        break;
    }

    this.listOfEvents$.subscribe(events => this.listOfEvents = events);

  }

  sortByIncreasingPrice(event1: SocialEvent, event2: SocialEvent) {
    return event1.price - event2.price;
  }

  sortByDecreasingPrice(event1: SocialEvent, event2: SocialEvent) {
    return event2.price - event1.price;
  }

  sortByIncreasingCapacity(event1: SocialEvent, event2: SocialEvent) {
    return event1.capacity - event2.capacity;
  }

  sortByDecreasingCapacity(event1: SocialEvent, event2: SocialEvent) {
    return event2.capacity - event1.capacity;
  }

  /**------------------------------sort events in city with different types and within price range--------------------- */
  updatePrice() {

    this.eventsInCityWithinPriceRange$ = this.listOfEvents$.pipe(map(eventListe => eventListe.filter(event => event.price <= this.maxValue && event.price >= this.minValue)));

    this.eventsInCityWithinPriceRange$.pipe(first()).subscribe(events => this.listOfEvents = events);

  }

/**------------------------------show different types of events  --------------------- */
  showAllTypes(city: string) {

    this.typeOfEvent = "All Types";

    if (city.length < 1) {
      this.listOfEvents$ = this.allEvents$.pipe(map(eventListe => eventListe.filter(event => event.price <= this.maxValue && event.price >= this.minValue)));
      this.listOfEvents$.subscribe(events => this.listOfEvents = events);
    } else {
      this.listOfEvents$ = this.service.findAllTypesOfEventsWithinPriceRangeInCity(city, this.minValue, this.maxValue);
      this.listOfEvents$.subscribe(events => this.listOfEvents = events);
    }
}



  showTypes(city: string, typeOfEvent: string) {

    this.typeOfEvent = typeOfEvent;

    if ( city.length < 1 ) {
      // tslint:disable-next-line: max-line-length
      this.listOfEvents$ = this.allEvents$.pipe(map(eventListe => eventListe.filter(event => event.price <= this.maxValue && event.price >= this.minValue && event.typeOfEvent === typeOfEvent)));
      this.listOfEvents$.pipe(first()).subscribe(events => this.listOfEvents = events);
    } else {
      this.listOfEvents$ = this.service.findEventsByTypeAndPriceInCity(city, typeOfEvent, this.minValue, this.maxValue);
      this.listOfEvents$.pipe(first()).subscribe(events => this.listOfEvents = events);
    }
  }
}
