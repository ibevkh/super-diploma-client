import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { OrderRequest, RestaurantMenuItem } from '../models';
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
  totalAmount: 0,
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
    itemCount: computed(() =>
      items().reduce((sum, item) => sum + item.quantity, 0)
    ),
    totalCost: computed(() =>
      items().reduce((sum, basketItem) => sum + basketItem.menuItem.price * basketItem.quantity, 0)
    ),
    // totalAmount: computed(() =>
    //   items().reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0)
    // )
  })),
  withMethods((store) => {
    const _api = inject(OrderApiService);
    const _mapper = inject(OrderMappingServices);

    const addItem = async (menuItem: RestaurantMenuItem) => {
      const existingItem = store.items().find(item => item.menuItem.id === menuItem.id);
      if (existingItem) {
        await updateQuantity(menuItem.id, existingItem.quantity + 1);
      } else {
        const newItem: BasketItem = {
          menuItem,
          quantity: 1,
        };
        const updatedItems = [...store.items(), newItem];

        patchState(store, {
          items: updatedItems,
          form: {
            ...store.form(),
            items: updatedItems.map(item => ({
              shopItemId: item.menuItem.id,
              shopItemName: item.menuItem.name,
              quantity: item.quantity,
              price: item.menuItem.price,
            })),
            totalAmount: updatedItems.reduce(
              (sum, item) => sum + item.menuItem.price * item.quantity,
              0
            ),
          },
        });
      }
    };
    const updateQuantity = async (itemId: number, newQuantity: number) => {
      const updatedItems = store.items().map(item =>
        item.menuItem.id === itemId
          ? {
            ...item,
            quantity: newQuantity,
            totalAmount: item.menuItem.price * newQuantity,
          }
          : item
      );

      patchState(store, {
        items: updatedItems,
        form: {
          ...store.form(),
          // items: updatedItems.map(item => ({
          //   shopItemId: item.menuItem.id,
          //   shopItemName: item.menuItem.name,
          //   quantity: item.quantity,
          //   price: item.menuItem.price,
          // })),
          items: (store.form().items || []).map(item =>
            item.shopItemId === itemId
              ? { ...item, quantity: newQuantity }
              : item
          ),
          totalAmount: updatedItems.reduce(
            (sum, item) => sum + item.menuItem.price * item.quantity,
            0
          ),
        }
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
