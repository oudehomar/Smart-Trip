import { KontaktComponent } from './common/kontakt/kontakt.component';
import { ImpressumComponent } from './common/impressum/impressum.component';
import { ReviewAddComponent } from './review/components/review-add/review-add.component';
import { ReviewUpdateComponent } from './review/components/review-update/review-update.component';
import { LandingPageComponent } from './common/landing-page/landing-page.component';
import { RestaurantListComponent } from './restaurants/components/restaurant-list/restaurant-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { SearchbarLpComponent } from './common/searchbar-lp/searchbar-lp.component';
import { RestaurantFilterComponent } from './restaurants/components/restaurant-filter/restaurant-filter.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { RestaurantDetailsComponent } from './restaurants/components/restaurant-details/restaurant-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'smart-trip/', pathMatch: 'full' },
  { path: 'smart-trip/', component: LandingPageComponent },
  { path: 'smart-trip/impressum', component: ImpressumComponent },
  { path: 'smart-trip/kontakt', component: KontaktComponent },
  { path: 'smart-trip/restaurants/:restaurantId/add-review', component: ReviewAddComponent },
  { path: 'smart-trip/restaurants/:restaurantId/update-review/:reviewId', component: ReviewUpdateComponent },
  { path: 'smart-trip/restaurants/filter', component: RestaurantFilterComponent },
  { path: 'smart-trip/restaurants/:id', component: RestaurantDetailsComponent },
  { path: 'smart-trip/restaurants', component: RestaurantListComponent },
  { path: 'smart-trip/hotels', component: SearchbarLpComponent },
  { path: 'smart-trip/events', component: EventListComponent },
  { path: 'smart-trip/events/:id', component: EventDetailsComponent },
  { path: 'smart-trip/hotels/:id', component: HotelDetailsComponent },
  { path: '**', redirectTo: 'smart-trip/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
