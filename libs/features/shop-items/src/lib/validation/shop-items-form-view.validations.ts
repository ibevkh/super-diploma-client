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

    test('name', 'Поле необхідно заповненити!:)', () => {
      enforce(model.name).isNotBlank();
    })
  });
};
