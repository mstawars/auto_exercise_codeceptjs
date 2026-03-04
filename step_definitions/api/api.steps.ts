export {};
/* global Given, When, Then */
const { I } = inject();

let storedProduct: any = {};
let lastBody: any = undefined;
let lastDuration = 0;

// Helpers
function parseData(data: any) {
  try {
    return typeof data === "string" ? JSON.parse(data) : data;
  } catch (e) {
    return data;
  }
}

// --- GENERIC ---
When("I send GET {string}", async (endpoint: string) => {
  const start = Date.now();
  const res = await I.sendGetRequest(endpoint);
  lastDuration = Date.now() - start;
  lastBody = parseData(res.data);
});

When("I send POST {string} with body:", async (endpoint: string, body: any) => {
  const json = JSON.parse(body.content);

  const start = Date.now();
  const res = await I.sendPostRequest(endpoint, json);

  lastDuration = Date.now() - start;
  lastBody = parseData(res.data);
});

When("I send PUT {string} with body:", async (endpoint: string, body: any) => {
  const json = JSON.parse(body.content);
  const start = Date.now();
  const res = await I.sendPutRequest(endpoint, json);
  lastDuration = Date.now() - start;
  lastBody = parseData(res.data);
});

Then("response code should be {int}", (code: number) => {
  I.seeResponseCodeIs(code);
});

Then("response code should be 200", () => {
  I.seeResponseCodeIsSuccessful();
});

Then("response should contain JSON:", (expected: any) => {
  I.seeResponseContainsJson(JSON.parse(expected.content));
});

// --- SCENARIO 1: PRINT ODD TITLES ---
Then("I print product titles with odd IDs", async () => {
  const products = (lastBody && lastBody.products) || [];
  products
    .filter((p: any) => p.id % 2 === 1)
    .forEach((p: any) => console.log(`ODD PRODUCT: ${p.id} - ${p.title}`));
});

// --- SCENARIO 3 ---
Given("I store response from GET {string}", async (endpoint: string) => {
  const res = await I.sendGetRequest(endpoint);
  storedProduct = parseData(res.data);
});

Then(
  "updated product should contain original properties except changed ones",
  async () => {
    const updated = lastBody;
    if (!updated || !storedProduct)
      throw new Error("Missing stored or updated product data");

    if (updated.id !== storedProduct.id)
      throw new Error("ID should remain unchanged");
    if (updated.brand !== storedProduct.brand)
      throw new Error("Brand should remain unchanged");
    if (updated.description !== storedProduct.description)
      throw new Error("Description should remain unchanged");
    if (updated.title === storedProduct.title)
      throw new Error("Title should be changed");
  },
);

// --- SCENARIO 4 ---
Then("response time should be <= 1000 ms", () => {
  if (lastDuration > 1000)
    throw new Error(`Response took ${lastDuration} ms (> 1000 ms)`);
});
