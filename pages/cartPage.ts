const { I } = inject();

export = {
  selectors: {
    item: ".cart_item",
    removeBtn: ".cart_item button",
    checkoutBtn: "#checkout",
  },

  async countItems() {
    return I.grabNumberOfVisibleElements(this.selectors.item);
  },

  removeByIndex(index: number) {
    I.click(locate(this.selectors.removeBtn).at(index));
  },

  openCheckout() {
    I.click(this.selectors.checkoutBtn);
  },
};
