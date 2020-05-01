import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Filter } from 'src/app/hotels/hotel/model/filter';


@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.css']
})
export class CheckboxesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  @Input()
  filterObject: Filter;

  @Output()
  filterObjectTRansporter: EventEmitter<Filter> = new EventEmitter<Filter>();

  sendFreeBreakfast(): void {
    this.filterObject.hasFreeBreakfast = !this.filterObject.hasFreeBreakfast;
    this.filterObjectTRansporter.emit(this.filterObject);

  }

  sendFreeParking(): void {
    this.filterObject.hasFreeParking = !this.filterObject.hasFreeParking;
    this.filterObjectTRansporter.emit(this.filterObject);

  }

  sendFreeWifi() {
    this.filterObject.hasFreeWifi = !this.filterObject.hasFreeWifi;
    this.filterObjectTRansporter.emit(this.filterObject);

  }

  sendRestaurant() {
    this.filterObject.hasRestaurant = !this.filterObject.hasRestaurant;
    this.filterObjectTRansporter.emit(this.filterObject);

  }

  sendSwimmingPool() {
    this.filterObject.hasSwimmingPool = !this.filterObject.hasSwimmingPool;
    this.filterObjectTRansporter.emit(this.filterObject);

  }

}

