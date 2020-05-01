import { SocialEvent } from './../model/event';
import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  event: SocialEvent;

  constructor(private route: ActivatedRoute, private service: EventService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.fetchById(+id).subscribe(event => (this.event = event));
  }

}
