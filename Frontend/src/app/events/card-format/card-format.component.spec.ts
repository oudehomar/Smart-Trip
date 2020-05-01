import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFormatComponent } from './card-format.component';

describe('CardFormatComponent', () => {
  let component: CardFormatComponent;
  let fixture: ComponentFixture<CardFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
