import { Component, OnInit } from '@angular/core';
import { Hotel } from '../hotels/hotel/model/hotel';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../hotels/hotel/hotel.service';
import { Review } from '../hotels/hotel/model/review';
import { AvgRating } from '../hotels/hotel/model/avgRating';
// import { NgbdRatingConfig } from '../common/rating-config';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {

  toggleReviewForm: boolean = false;
  toggleAdminForm: boolean = false;
  toggleUpdateForm: boolean = false;

  hotel: Hotel;
  reviews: Review[] = [];
  avgRevStats: AvgRating;


  constructor(private route: ActivatedRoute, private hotelService: HotelService) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get("id");
    this.hotelService.fetchById(id).subscribe(fetchedHotel => (this.hotel = fetchedHotel));

    this.hotelService.findReviewList(id).subscribe(fetchedReviewList => this.reviews = fetchedReviewList);
    this.hotelService.getAvgRatingStats(id).subscribe(reviewObj => (this.avgRevStats = reviewObj));
  }

  showReviewForm(): void {
    this.toggleReviewForm = !this.toggleReviewForm;
  }

  showAdminForm(): void {
    this.toggleAdminForm = !this.toggleAdminForm;
  }

  showUpdateForm(): void {
    this.toggleUpdateForm = !this.toggleUpdateForm;
    console.log(this.toggleUpdateForm);
  }

}
