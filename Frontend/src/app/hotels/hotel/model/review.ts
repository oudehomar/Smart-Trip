import { Hotel } from './hotel';
import { AvgRating } from './avgRating';

export interface Review {
    id:number;
    author:string;
    // averageRating: number;
    cleanness: number;
    friendliness: number;
    foodQuality: number;
    ambience: number;
    familyFriendly: number;
    comment: string;
    hotel:Hotel;
    
}