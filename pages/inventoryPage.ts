const { I } = inject();

export = {
  selectors: {
    item: ".inventory_item",
    itemName: ".inventory_item_name",
    addToCartButtons: ".inventory_item .pricebar button",
    sortSelect: ".product_sort_container",
    cartLink: ".shopping_cart_link",
  },

  async addAllToCart() {
    const total = await I.grabNumberOfVisibleElements(this.selectors.item);
    for (let i = 1; i <= total; i++) {
      await I.click(locate(this.selectors.addToCartButtons).at(i));
    }
  },

  openItemByName(name: string) {
    I.click(locate(this.selectors.itemName).withText(name));
  },

  sortBy(option: string) {
    I.selectOption(this.selectors.sortSelect, option);
  },

  async getProductNames() {
    return I.grabTextFromAll(this.selectors.itemName);
  },

  goToCart() {
    I.click(this.selectors.cartLink);
  },
};
