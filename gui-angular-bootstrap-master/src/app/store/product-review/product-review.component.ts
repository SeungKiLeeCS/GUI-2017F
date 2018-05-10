import { Component, OnInit, Input } from '@angular/core';
//For mediumDate
import { DatePipe } from '@angular/common';

//I'm wondering if having a filler words like Component actually makes module names good
import { ProductReview } from '../../domain/models/product-review';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})

export class ProductReviewComponent implements OnInit {
  @Input() review: ProductReview;
  constructor() { }
  ngOnInit() { }
}
