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

    test('customerPhoneNumber', 'Номер телефону необхідно заповнити! :)', () => {
      enforce(model.customerPhoneNumber).isNotBlank();
      // Можна додати перевірку формату номера телефону
      enforce(model.customerPhoneNumber).matches(/^\+?\d{10,15}$/);
    });

    test('deliveryAddress', 'Адреса доставки необхідна! :)', () => {
      enforce(model.deliveryAddress).isNotBlank();
    });

    test('deliveryTime', 'Дата доставки не може бути пізніше ніж через 7 днів від сьогодні :) ',  () => {
      enforce(model.deliveryTime).isNotBlank();

      if (model.deliveryTime) {
        const deliveryDate = new Date(model.deliveryTime);
        const now = new Date();
        const maxDate = new Date();
        maxDate.setDate(now.getDate() + 7); // сьогодні + 7 днів

        const isValidDate = !isNaN(deliveryDate.getTime());
        const isWithin7Days = deliveryDate <= maxDate;

        enforce(isValidDate).equals(true);
        enforce(isWithin7Days).equals(true, 'Дата доставки не може бути пізніше ніж через 7 днів від сьогодні');
      }
    });
  });
};

