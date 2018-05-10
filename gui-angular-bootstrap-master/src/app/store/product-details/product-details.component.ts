import { Component, OnInit } from '@angular/core';
//for USD display
import { CurrencyPipe } from '@angular/common';
//from internal modules
import { Product } from '../../domain/models/product';
import { ProductReview } from '../../domain/models/product-review';
import { ProductReviewComponent } from '../product-review/product-review.component';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

//OnInit for directive
//https://angular.io/api/core/OnInit
export class ProductDetailsComponent implements OnInit {
  itemReviews: ProductReview[] = [  ]
  item: Product = {
    id: 1,
    categoryID: 1,
    categoryName: "If your kids are living off of these call child protection",
    name: "Jif Peanut Butter, 16 OZ",
    description: "7g of Protein per Serving. Not to Mention 55% of Daily Fat Consumption. Will give you constipation.",
    imageName: "jif.png",
    price: 5.99,
    reviews: this.itemReviews
  };

  //individual reviews
  liveReview: ProductReview;
  constructor() { this.liveReview = new ProductReview(); }
  ngOnInit() {  }
  //add to the list of reviews
  addReview() {
    this.liveReview.date = new Date;
    this.itemReviews.push(this.liveReview);
    this.item.reviews = this.itemReviews;
  }

}
