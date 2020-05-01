import { Component, OnInit, Input } from '@angular/core';
import { Review } from '../hotel/model/review';
import { NgForm } from '@angular/forms';
import { Hotel } from '../hotel/model/hotel';
import { HotelService } from '../hotel/hotel.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {


  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {

  }

  @Input()
  hotel: Hotel;


  newReview: Review = {
    "id": null,
    "author": "",
    "cleanness": 0.0,
    "friendliness": 0.0,
    "foodQuality": 0.0,
    "ambience": 0.0,
    "familyFriendly": 0.0,
    "comment": "",
    "hotel": this.hotel
  }


  generateNewReview(): void {


    this.newReview.hotel = this.hotel;



    this.hotelService.saveReviewAndPush(this.newReview, this.hotel.id)
      .subscribe(review => { this.hotel.reviewList.push(review) });

    window.location.reload();
  }

// In case necessary in the future:
//   resetReviewForm(reviewForm: NgForm) {
//     reviewForm.resetForm();;
//   }


}
