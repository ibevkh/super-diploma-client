import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopItemsFormViewComponent } from './shop-items-form-view.component';

describe('ShopItemsFormViewComponent', () => {
  let component: ShopItemsFormViewComponent;
  let fixture: ComponentFixture<ShopItemsFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopItemsFormViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopItemsFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
