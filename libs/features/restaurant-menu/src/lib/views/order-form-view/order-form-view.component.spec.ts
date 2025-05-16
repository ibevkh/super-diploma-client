import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderFormViewComponent } from './order-form-view.component';

describe('OrderFormViewComponent', () => {
  let component: OrderFormViewComponent;
  let fixture: ComponentFixture<OrderFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderFormViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
