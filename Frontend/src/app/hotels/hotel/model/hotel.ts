import { Review } from './review';
import { AvgRating } from './avgRating';


export interface Hotel {


  id: number;
  name: string;
  address: string;
  telephone: string;
  city: string;
  description?: string;
  website: string;
  rating?: number;

  price: number;
  stars: string;
  rooms: number;
  swimmingPool: boolean;
  restaurant: boolean;
  breakfast: boolean | string;
  wifi: boolean;
  parking: boolean | string;
  email: boolean;
  reviewList: Review[];
  avgRatingStats: AvgRating;
}
