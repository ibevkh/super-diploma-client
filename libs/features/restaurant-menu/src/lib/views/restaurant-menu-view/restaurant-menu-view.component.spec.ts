import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantMenuViewComponent } from './restaurant-menu-view.component';

describe('RestaurantMenuViewComponent', () => {
  let component: RestaurantMenuViewComponent;
  let fixture: ComponentFixture<RestaurantMenuViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantMenuViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantMenuViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
