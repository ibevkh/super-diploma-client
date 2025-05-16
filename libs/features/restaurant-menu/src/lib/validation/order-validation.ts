import { enforce, only, staticSuite, test } from 'vest';
import { OrderRequest } from '../models';

export const createOrderRequestValidationConfig = (): {
  [key: string]: string[];
} => {
  return {
  };
};

export const createOrderRequestValidationSuite = () => {
  return staticSuite((model: OrderRequest, field: string) => {
    if (field) {
      only(field);
    }

    test('name', 'Поле необхідно заповнити!:)', () => {
      enforce(model.customerName).isNotBlank();
    });
  });
};
