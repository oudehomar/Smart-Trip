import { Review } from '../../review/model/review';
export interface Restaurant {

  id: number;
  name: string;
  address: string;
  telephone: string;
  city: string;
  description: string;
  website: string;
  rating: number;
  type: any;
  seats: number;
  openTime: string;
  parking: boolean;
  familyFriendly: boolean;
  veganFriendly: boolean;
  reviewList: Review[];



}
