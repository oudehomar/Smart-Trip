
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { Ng5SliderModule } from 'ng5-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardFormatComponent } from './events/card-format/card-format.component';
import { HotelListComponent } from './hotels/hotel-list/hotel-list.component';
import { MatSliderModule } from '@angular/material/slider';
import { CheckboxesComponent } from './common/checkboxes/checkboxes.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './common/landing-page/landing-page.component';
import { HotelComponent } from './hotels/hotel/hotel.component';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';
import { SearchbarLpComponent } from './common/searchbar-lp/searchbar-lp.component';
import { CreateReviewComponent } from './hotels/create-review/create-review.component';
import { ManageReviewsComponent } from './hotels/manage-reviews/manage-reviews.component';
import { UpdateHotelComponent } from './hotels/update-hotel/update-hotel.component';
import { RestaurantListComponent } from './restaurants/components/restaurant-list/restaurant-list.component';
import { RestaurantFilterComponent } from './restaurants/components/restaurant-filter/restaurant-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestaurantDetailsComponent } from './restaurants/components/restaurant-details/restaurant-details.component';
import { RatingModule } from 'ng-starrating';
import { ReviewListComponent } from './review/components/review-list/review-list.component';
import { ReviewAddComponent } from './review/components/review-add/review-add.component';
import { ReviewUpdateComponent } from './review/components/review-update/review-update.component';
import { SurpriseMeComponent } from './common/surprise-me/surprise-me.component';
import { ImpressumComponent } from './common/impressum/impressum.component';
import { KontaktComponent } from './common/kontakt/kontakt.component';






@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventDetailsComponent,
    CardFormatComponent,
    LandingPageComponent,
    HotelComponent,
    NavBarComponent,
    SearchbarLpComponent,
    HotelListComponent,
    CheckboxesComponent,
    HotelDetailsComponent,
    CreateReviewComponent,
    ManageReviewsComponent,
    UpdateHotelComponent,
    RestaurantListComponent,
    RestaurantFilterComponent,
    RestaurantDetailsComponent,
    ReviewListComponent,
    ReviewAddComponent,
    ReviewUpdateComponent,
    SurpriseMeComponent,
    ImpressumComponent,
    KontaktComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    RatingModule,
    ReactiveFormsModule,
    FormsModule,
    Ng5SliderModule,
    RatingModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
