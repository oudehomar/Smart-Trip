import { Component, OnInit, Input } from '@angular/core';
import { Hotel } from '../hotel/model/hotel';
import { HotelService } from '../hotel/hotel.service';

@Component({
  selector: 'app-update-hotel',
  templateUrl: './update-hotel.component.html',
  styleUrls: ['./update-hotel.component.css']
})
export class UpdateHotelComponent implements OnInit {


  @Input()
  hotel: Hotel;
  updatedHotel:Hotel;

  constructor(private hotelService:HotelService) { }

  ngOnInit(): void {
  }


updateHotel():void {
this.hotelService.updateHotel(this.hotel, this.hotel.id).subscribe(()=>{});



}


}
