export {}; // unika konfliktu 'I' (modułowy scope)

/* global Given, When, Then */
const { I } = inject();

// ----------------------
// LOGIN
// ----------------------
Given("I am on the SauceDemo login page", () => {
  I.amOnPage("https://www.saucedemo.com/");
});

When("I log in as {string}", async (user: string) => {
  const users: Record<string, { username: string; password: string }> = {
    standard_user: { username: "standard_user", password: "secret_sauce" },
    problem_user: { username: "problem_user", password: "secret_sauce" },
    locked_out_user: { username: "locked_out_user", password: "secret_sauce" },
  };
  const creds = users[user];
  if (!creds) throw new Error(`Unknown user alias: ${user}`);

  I.fillField("#user-name", creds.username);
  I.fillField("#password", creds.password);
  I.click("#login-button");
});

When("I should see login error {string}", async (user: string) => {
  I.see(
    `Epic sadface: Sorry, this user has been locked out.`,
    ".error-message-container",
  );
});

// ----------------------
// CART ADD / REMOVE
// ----------------------
When("I add all products to the cart", async () => {
  const total = await I.grabNumberOfVisibleElements(".inventory_item");
  // stabilny css + indeksowanie via locate().at()
  for (let i = 1; i <= total; i++) {
    I.click(locate(".inventory_item .pricebar button").at(i));
  }
});

When("I open the cart", () => {
  I.click(".shopping_cart_link");
});

When("I remove product number {int} from the cart", (index: number) => {
  I.click(locate(".cart_item button").at(index));
});

// ----------------------
// CHECKOUT
// ----------------------
When("I proceed to checkout with data:", (table: any) => {
  I.click("#checkout");
  const data = Object.fromEntries(
    table.rows.map((row: any) => row.cells.map((cell: any) => cell.value)),
  );
  I.fillField("#first-name", data.firstName);
  I.fillField("#last-name", data.lastName);
  I.fillField("#postal-code", data.zip);
  I.click("#continue");
});

Then(
  "I should see the checkout overview contains correct items and count",
  async () => {
    // Po usunięciu 1 z 6 → powinno być 5 pozycji na overview
    const count = await I.grabNumberOfVisibleElements(".cart_item");
    if (count !== 5) {
      throw new Error(`Expected 5 items but found ${count}`);
    }
  },
);

When("I finish the purchase", () => {
  I.click("#finish");
});

Then("I should see order confirmation", () => {
  I.see("Thank you for your order");
  I.seeElement(".complete-header");
});

// ----------------------
// PRODUCT PAGE
// ----------------------
When("I open product {string}", (name: string) => {
  I.click(locate(".inventory_item_name").withText(name));
});

When("I add product to cart from product page", () => {
  I.click('button[data-test^="add-to-cart"]');
});

Then("I should see product {string} in the cart", (name: string) => {
  I.see(name, ".cart_item");
});

// ----------------------
// SORTING
// ----------------------
When("I sort products by {string}", (option: string) => {
  I.selectOption(".product_sort_container", option);
});

Then("product names should be sorted ascending", async () => {
  const names = await I.grabTextFromAll(".inventory_item_name");
  const expected = [...names].sort((a, b) => a.localeCompare(b));
  if (JSON.stringify(names) !== JSON.stringify(expected)) {
    throw new Error(
      `Products not sorted correctly.\nActual:   ${JSON.stringify(names)}\nExpected: ${JSON.stringify(expected)}`,
    );
  }
});
