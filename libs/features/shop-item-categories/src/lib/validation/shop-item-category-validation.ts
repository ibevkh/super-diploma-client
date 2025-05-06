import { enforce, only, staticSuite, test } from 'vest';
import { ShopItemCategoryForm } from '../models';

export const createShopItemCategoryValidationConfig = (): {
  [key: string]: string[];
} => {
  return {
    // Додай залежності полів, якщо потрібно
  };
};

export const createShopItemCategoryValidationSuite = () => {
  return staticSuite((model: ShopItemCategoryForm, field: string) => {
    if (field) {
      only(field);
    }

    test('name', 'Поле "Назва" є обов’язковим', () => {
      enforce(model.name).isNotBlank();
    });

  });
};
