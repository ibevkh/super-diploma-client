import { enforce, only, staticSuite, test } from 'vest';
import { ShopItemForm } from '../models';

export const createShopItemValidationConfig = (): {
  [key: string]: string[];
} => {
  return {
    //transactionTypeId: ['accountToId']
  };
};

export const createShopItemValidationSuite = () => {
  return staticSuite((model: ShopItemForm, field: string) => {
    if (field) {
      only(field);
    }

    test('name', 'Без назви ніяк!:)', () => {
      enforce(model.name).isNotBlank();
    })

    test('description', 'Без опису ніяк!:)', () => {
      enforce(model.description).isNotBlank();
    })

    test('price', 'Ціна не може бути 0!:)', () => {
      enforce(model.price).greaterThan(0);
    });

    test('state', 'Обери стан!:)', () => {
      enforce(model.state).isNotBlank();
    });

    test('categoryId', 'Обери категорію!:)', () => {
      enforce(model.categoryId).isNotBlank();
    });
  });
};
