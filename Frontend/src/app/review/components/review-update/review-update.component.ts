import { RestaurantService } from './../../../restaurants/services/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../model/review';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-review-update',
  templateUrl: './review-update.component.html',
  styleUrls: ['./review-update.component.css']
})
export class ReviewUpdateComponent implements OnInit {


  reviewToBeUpdated: Review = null;
  restaurant: any;



  author = '';
  cleanness = 0;
  friendliness = 0;
  foodQuality = 0;
  ambience = 0;
  familyFriendly = 0;
  comment = '';

  constructor(private service: ReviewService, private route: ActivatedRoute,
              private fb: FormBuilder, private restaurantService: RestaurantService) { }

  updateReviewForm: FormGroup;

  ngOnInit(): void {
    const restaurantId = this.route.snapshot.paramMap.get('restaurantId');
    this.restaurantService.fetchById(+restaurantId).subscribe(restaurant => this.restaurant = restaurant);
    const reviewId = this.route.snapshot.paramMap.get('reviewId');
    this.service.getReviewPerId(+reviewId).subscribe(review => this.reviewToBeUpdated = review);
    this.createForm();
  }

  createForm() {
    this.updateReviewForm = this.fb.group({
      id: [''],
      author: [''],
      averageRating: [''],
      cleanness: [''],
      friendliness: [''],
      foodQuality: [''],
      ambience: [''],
      familyFriendly: [''],
      comment: ['']

    });
  }

  handelSubmit() {
    const restaurantId = this.route.snapshot.paramMap.get('restaurantId');
    const reviewId = this.route.snapshot.paramMap.get('reviewId');
    this.updateReviewForm.patchValue({
      author: this.author,
      cleanness: this.cleanness,
      friendliness: this.friendliness,
      foodQuality: this.foodQuality,
      ambience: this.ambience,
      familyFriendly: this.familyFriendly,
      comment: this.comment
    });
    this.service.updateReview(+restaurantId, +reviewId, this.updateReviewForm.value).subscribe(_ => window.history.back());
  }

}
