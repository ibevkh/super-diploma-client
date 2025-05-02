import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopItemCategoryGridViewComponent } from './shop-item-category-grid-view.component';

describe('ShopItemCategoryGridViewComponent', () => {
  let component: ShopItemCategoryGridViewComponent;
  let fixture: ComponentFixture<ShopItemCategoryGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopItemCategoryGridViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopItemCategoryGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
