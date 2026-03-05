import { keyValueTableToObject } from "../../utils/gherkin";
import assert from "assert";

const { I, loginPage, inventoryPage, cartPage, checkoutPage, productPage } =
  inject();

Given("I am on the SauceDemo login page", () => {
  loginPage.open();
});

When("I log in as {string}", async (user: string) => {
  const users: Record<string, { username: string; password: string }> = {
    standard_user: { username: "standard_user", password: "secret_sauce" },
    problem_user: { username: "problem_user", password: "secret_sauce" },
    locked_out_user: { username: "locked_out_user", password: "secret_sauce" },
  };
  const creds = users[user];
  if (!creds) throw new Error(`Unknown user alias: ${user}`);
  await loginPage.login(creds.username, creds.password);
});

When("I should see login error {string}", () => {
  loginPage.seeLockedOutError();
});

When("I add all products to the cart", async () => {
  await inventoryPage.addAllToCart();
});

When("I open the cart", () => {
  inventoryPage.goToCart();
});

When("I remove product number {int} from the cart", (index: number) => {
  cartPage.removeByIndex(index);
});

When("I proceed to checkout with data:", (table: any) => {
  cartPage.openCheckout();
  const data = keyValueTableToObject(table);
  checkoutPage.fillCustomer({
    firstName: data.firstName,
    lastName: data.lastName,
    zip: data.zip,
  });
  checkoutPage.continue();
});

Then(
  "I should see the checkout overview contains correct items and count",

  async () => {
    const count = await checkoutPage.countOverviewItems();
    assert.strictEqual(count, 5, `Expected 5 items but found ${count}`);
  },
);

When("I finish the purchase", () => {
  checkoutPage.finish();
});

Then("I should see order confirmation", () => {
  checkoutPage.seeOrderConfirmation();
});

When("I open product {string}", (name: string) => {
  inventoryPage.openItemByName(name);
});

When("I add product to cart from product page", () => {
  productPage.addToCart();
});

Then("I should see product {string} in the cart", (name: string) => {
  I.see(name, ".cart_item");
});

When("I sort products by {string}", (option: string) => {
  inventoryPage.sortBy(option);
});

Then("product names should be sorted ascending", async () => {
  const names = await inventoryPage.getProductNames();
  const expected = [...names].sort((a, b) => a.localeCompare(b));
  assert.strictEqual(
    JSON.stringify(names),
    JSON.stringify(expected),
    `Products not sorted correctly.\nActual:   ${JSON.stringify(names)}\nExpected: ${JSON.stringify(expected)}`,
  );
});
