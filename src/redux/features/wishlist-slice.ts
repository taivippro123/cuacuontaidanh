// Lightweight stub for removed wishlist feature to keep imports valid during cleanup
export const addItemToWishlist = (item: any) => {
  return { type: "wishlist/addItem", payload: item } as const;
};

export const removeItemFromWishlist = (id: any) => {
  return { type: "wishlist/removeItem", payload: id } as const;
};

export type WishlistAction = ReturnType<typeof addItemToWishlist> | ReturnType<typeof removeItemFromWishlist>;

export default {} as unknown;
