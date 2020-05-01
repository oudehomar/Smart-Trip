import { Component, OnInit, Input, ResolvedReflectiveFactory } from '@angular/core';
import { Hotel } from '../hotel/model/hotel';
import { Review } from '../hotel/model/review';
import { HotelService } from '../hotel/hotel.service';

@Component({
  selector: 'app-manage-reviews',
  templateUrl: './manage-reviews.component.html',
  styleUrls: ['./manage-reviews.component.css']
})
export class ManageReviewsComponent implements OnInit {

@Input()
hotel:Hotel;

@Input()
reviews:Review[];

// review:Review;
idReview:number;
idHotel:number;

  constructor(private hotelService:HotelService) { }

  ngOnInit(): void {
  }



  deleteReview(id:number):void {
  this.idReview = id;
  this.idHotel = this.hotel.id;

this.hotelService.deleteReview(this.idReview)
.subscribe(_ => {this.reviews = this.reviews.filter(review => review.id !== id)});

  }




}
