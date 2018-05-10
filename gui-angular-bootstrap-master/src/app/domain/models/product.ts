//From Canvas
import { ProductReview } from './product-review'

export class Product {
  id: number;
  categoryID: number;
  categoryName: string;
  name: string;
  description: string;
  imageName: string;
  price: number;
  reviews: ProductReview[];
}
