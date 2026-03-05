/// <reference types='codeceptjs' />
type steps_file = typeof import("./steps_file");
type loginPage = typeof import("./pages/loginPage");
type inventoryPage = typeof import("./pages/inventoryPage");
type cartPage = typeof import("./pages/cartPage");
type checkoutPage = typeof import("./pages/checkoutPage");
type productPage = typeof import("./pages/productPage");

declare namespace CodeceptJS {
  interface SupportObject {
    I: I;
    current: any;
    loginPage: loginPage;
    inventoryPage: inventoryPage;
    cartPage: cartPage;
    checkoutPage: checkoutPage;
    productPage: productPage;
  }
  interface Methods extends Playwright, REST, JSONResponse {}
  interface I extends ReturnType<steps_file>, WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
