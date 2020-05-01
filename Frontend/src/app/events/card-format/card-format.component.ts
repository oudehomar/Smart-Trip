import { SocialEvent } from './../model/event';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EventService } from './../event.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-card-format',
  templateUrl: './card-format.component.html',
  styleUrls: ['./card-format.component.css']
})
export class CardFormatComponent implements OnInit {
  @Input()
  public event: SocialEvent;

  constructor(private service: EventService) {

  }

  ngOnInit(): void {
  }

}
