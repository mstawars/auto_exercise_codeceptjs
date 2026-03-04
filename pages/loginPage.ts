const { I } = inject();

export = {
  url: "https://www.saucedemo.com/",
  fields: {
    username: "#user-name",
    password: "#password",
  },
  buttons: {
    login: "#login-button",
  },
  messages: {
    error: ".error-message-container",
  },

  open() {
    I.amOnPage(this.url);
  },

  async login(username: string, password: string) {
    await I.fillField(this.fields.username, username);
    await I.fillField(this.fields.password, password);
    await I.click(this.buttons.login);
  },

  seeLockedOutError() {
    I.see(
      "Epic sadface: Sorry, this user has been locked out.",
      this.messages.error,
    );
  },
};
