import { RestaurantService } from './../../services/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../../model/restaurant';
import { ReviewService } from 'src/app/review/services/review.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  restaurant: Restaurant;
  reviews: any[] | any;

  showForm = false;
  showComments = false;

  public changeShowForm(): void {
    this.showForm = !this.showForm;
  }

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService,
              private service: ReviewService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.restaurantService.fetchById(+id).subscribe(restaurant => (this.restaurant = restaurant));
    this.service.getReviews(+id).subscribe(review => this.reviews = review);
  }

  deleteThisReview(id: number) {
    this.service.deleteReview(id).subscribe(_ => window.location.reload());
    this.ngOnInit();
    this.restaurantService.fetchById(+id).subscribe(_ => window.location.reload());
  }

  changeShowComments() {
    this.showComments = !this.showComments;
  }
}
