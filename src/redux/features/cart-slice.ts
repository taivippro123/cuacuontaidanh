// Lightweight stub for removed cart feature to keep imports valid during cleanup
export const addItemToCart = (item: any) => {
  return { type: "cart/addItem", payload: item } as const;
};

export const removeItemFromCart = (id: any) => {
  return { type: "cart/removeItem", payload: id } as const;
};

export type CartAction = ReturnType<typeof addItemToCart> | ReturnType<typeof removeItemFromCart>;

export default {} as unknown;
