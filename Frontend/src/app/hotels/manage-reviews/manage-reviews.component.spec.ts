import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageReviewsComponent } from './manage-reviews.component';

describe('ManageReviewsComponent', () => {
  let component: ManageReviewsComponent;
  let fixture: ComponentFixture<ManageReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
