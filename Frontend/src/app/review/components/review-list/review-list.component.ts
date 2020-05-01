import { ActivatedRoute } from '@angular/router';
import { ReviewService } from './../../services/review.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Review } from '../../model/review';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  reviews: any[] | any;

  constructor(private service: ReviewService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getReviews(+id).subscribe(review => this.reviews = review);
  }

  deleteThisReview(id: number) {
    this.service.deleteReview(id).subscribe(_ => window.location.reload());
  }
}
