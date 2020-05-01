import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarLpComponent } from './searchbar-lp.component';

describe('SearchbarLpComponent', () => {
  let component: SearchbarLpComponent;
  let fixture: ComponentFixture<SearchbarLpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchbarLpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbarLpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
