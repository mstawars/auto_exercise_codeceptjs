const { I } = inject();

export = {
  fields: {
    first: "#first-name",
    last: "#last-name",
    zip: "#postal-code",
  },
  buttons: {
    continue: "#continue",
    finish: "#finish",
  },
  selectors: {
    overviewItem: ".cart_item",
    completeHeader: ".complete-header",
  },

  fillCustomer(data: { firstName: string; lastName: string; zip: string }) {
    I.fillField(this.fields.first, data.firstName);
    I.fillField(this.fields.last, data.lastName);
    I.fillField(this.fields.zip, data.zip);
  },

  continue() {
    I.click(this.buttons.continue);
  },

  async countOverviewItems() {
    return I.grabNumberOfVisibleElements(this.selectors.overviewItem);
  },

  finish() {
    I.click(this.buttons.finish);
  },

  seeOrderConfirmation() {
    I.see("Thank you for your order");
    I.seeElement(this.selectors.completeHeader);
  },
};
