import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurpriseMeComponent } from './surprise-me.component';

describe('SurpriseMeComponent', () => {
  let component: SurpriseMeComponent;
  let fixture: ComponentFixture<SurpriseMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurpriseMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurpriseMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
