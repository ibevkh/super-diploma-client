import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopItemsGridViewComponent } from './shop-items-grid-view.component';

describe('ShopItemsGridViewComponent', () => {
  let component: ShopItemsGridViewComponent;
  let fixture: ComponentFixture<ShopItemsGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopItemsGridViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopItemsGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
