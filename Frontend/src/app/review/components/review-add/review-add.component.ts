import { RestaurantService } from './../../../restaurants/services/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.css']
})
export class ReviewAddComponent implements OnInit {

  addReviewForm: FormGroup;
  restaurant: any;

  author = '';
  cleanness = 0;
  friendliness = 0;
  foodQuality = 0;
  ambience = 0;
  familyFriendly = 0;
  comment = '';

  constructor(private restaurantService: RestaurantService, private service: ReviewService,
              private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    const restaurantId = this.route.snapshot.paramMap.get('restaurantId');

    this.restaurantService.fetchById(+restaurantId).subscribe(restaurant => this.restaurant = restaurant);
    this.createForm();
  }

  createForm() {
    this.addReviewForm = this.fb.group({
      // id: [''],
      author: [],
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
    this.addReviewForm.patchValue({
      author: this.author,
      cleanness: this.cleanness,
      friendliness: this.friendliness,
      foodQuality: this.foodQuality,
      ambience: this.ambience,
      familyFriendly: this.familyFriendly,
      comment: this.comment
    });
    this.service.addReview(+restaurantId, this.addReviewForm.value).subscribe(_ => window.history.back());
  }
}


