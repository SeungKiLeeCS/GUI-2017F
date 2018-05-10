import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//internal modules
import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './store/product-details/product-details.component';
import { ProductReviewComponent } from './store/product-review/product-review.component';
import { RatingComponent } from './store/rating/rating.component';

@NgModule({
  declarations: [ AppComponent, ProductDetailsComponent, ProductReviewComponent, RatingComponent ],
  imports: [ BrowserModule, FormsModule ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
