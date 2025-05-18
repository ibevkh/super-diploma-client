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

    test('customerName', 'Ім\'я необхідно заповнити! :)', () => {
      enforce(model.customerName).isNotBlank();
    });

    test('deliveryTime', 'Час доставки повинен бути валідною датою і не пізніше, ніж через тиждень від сьогодні!', () => {
      if (model.deliveryTime) {
        const deliveryDate = new Date(model.deliveryTime);
        const now = new Date();
        const oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        const isValid = !isNaN(deliveryDate.getTime());
        enforce(isValid)['isTrue']('Невірний формат дати');
        enforce(deliveryDate.getTime())['lessThanOrEqual'](oneWeekLater.getTime());
      }
    });
  });
};

