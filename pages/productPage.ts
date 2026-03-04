const { I } = inject();

export = {
  buttons: {
    addToCart: 'button[data-test^="add-to-cart"]',
  },

  addToCart() {
    I.click(this.buttons.addToCart);
  },
};
