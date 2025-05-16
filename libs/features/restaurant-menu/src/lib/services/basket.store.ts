import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { OrderItemGrid, OrderRequest, RestaurantMenuItem } from '../models';
import { BasketItem } from '../models/basket-item';
import { OrderApiService } from './order/order-api.services';
import { OrderMappingServices } from './order/order-mapping.services';

type BasketState = {
  items: BasketItem[],
  form: OrderRequest;
}

const initialForm: OrderRequest = {
  id: 0,
  customerName: '',
  customerPhoneNumber: '',
  deliveryAddress: '',
  deliveryTime: '',
  items: [],
};

const initialState: BasketState = {
  items: [],
  form: initialForm,
};

export const BasketStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ items }) => ({
    itemCount: computed(() => items().length),
    totalCost: computed(() =>
      items().reduce((sum, basketItem) => sum + basketItem.menuItem.price * basketItem.quantity, 0)
    )
  })),
  withMethods((store) => {
    const _api = inject(OrderApiService);
    const _mapper = inject(OrderMappingServices);

    const addItem = async (menuItem: RestaurantMenuItem) => {
      const existingItem = store.items().find(item => item.menuItem.id === menuItem.id);
      if (existingItem) {
        await updateQuantity(menuItem.id, existingItem.quantity + 1);
      } else {
        patchState(store, {
          items: [...store.items(), { menuItem, quantity: 1 }],
          // form: { ...store.form(), items: [
          //     ...store.items().map(item => ({
          //       shopItemId: item.menuItem.id,
          //       shopItemName: item.menuItem.name,
          //       quantity: item.quantity,
          //       price: item.menuItem.price,
          //     })),
          //   ]}
          form: {
            ...store.form(),
            items: [
              ...(store.form().items || []),
              {
                shopItemId: menuItem.id,
                shopItemName: menuItem.name,
                quantity: 1,
                price: menuItem.price,
              },
            ],
          },
        });
        console.log('!!!', store.form());
      }
    };

    const updateQuantity = async (itemId: number, newQuantity: number) => {
      patchState(store, {
        items: store.items().map(item =>
          item.menuItem.id === itemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      });
    };

    const removeItem = async (itemId: number) => {
      patchState(store, {
        items: store.items().filter(item => item.menuItem.id !== itemId)
      });
    };

    const cleanBasket = async () => {
      patchState(store, { items: [] });
    };

    const createOrder = async () => {
      const order = _mapper.mapOrderRequestToDto(store.form());
      await _api.createOrder(order);
      await resetForm();
    }

    const resetForm = async () => {
      patchState(store, {form: {...initialForm}});
    }

    return {
      addItem,
      updateQuantity,
      removeItem,
      cleanBasket,
      createOrder,
      resetForm,
    };
  })
);
