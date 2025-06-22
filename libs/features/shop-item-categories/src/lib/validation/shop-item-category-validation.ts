import { enforce, only, staticSuite, test } from 'vest';
import { ShopItemCategoryForm } from '../models';

export const createShopItemCategoryValidationConfig = (): {
  [key: string]: string[];
} => {
  return {
  };
};

export const createShopItemCategoryValidationSuite = () => {
  return staticSuite((model: ShopItemCategoryForm, field: string) => {
    if (field) {
      only(field);
    }

    test('name', 'Поле необхідно заповнити!:)', () => {
      enforce(model.name).isNotBlank();
    });

    test('description', 'Поле необхідно заповнити!:)', () => {
      enforce(model.name).isNotBlank();
    });
  });
};
