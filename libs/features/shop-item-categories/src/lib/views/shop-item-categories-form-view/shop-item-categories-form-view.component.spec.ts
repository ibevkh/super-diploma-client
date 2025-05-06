import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopItemCategoriesFormViewComponent } from './shop-item-categories-form-view.component';

describe('ShopItemCategoriesFormViewComponent', () => {
  let component: ShopItemCategoriesFormViewComponent;
  let fixture: ComponentFixture<ShopItemCategoriesFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopItemCategoriesFormViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopItemCategoriesFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
