const { I } = inject();
import assert from "assert";
let storedProduct: any = {};
let lastBody: any = undefined;
let lastDuration = 0;

function parseData(data: any) {
  try {
    return typeof data === "string" ? JSON.parse(data) : data;
  } catch (e) {
    return data;
  }
}

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

Then("I print product titles with odd IDs", async () => {
  const products = (lastBody && lastBody.products) || [];
  products
    .filter((p: any) => p.id % 2 === 1)
    .forEach((p: any) => console.log(`ODD PRODUCT: ${p.id} - ${p.title}`));
});

Given("I store response from GET {string}", async (endpoint: string) => {
  const res = await I.sendGetRequest(endpoint);
  storedProduct = parseData(res.data);
});

Then(
  "updated product should contain original properties except changed ones",

  async () => {
    const updated = lastBody;
    assert(updated, "Missing updated product");
    assert(storedProduct, "Missing stored product");

    assert.equal(updated.id, storedProduct.id, "ID should remain unchanged");
    assert.equal(
      updated.brand,
      storedProduct.brand,
      "Brand should remain unchanged",
    );
    assert.equal(
      updated.description,
      storedProduct.description,
      "Description should remain unchanged",
    );

    assert.notEqual(
      updated.title,
      storedProduct.title,
      "Title should be changed",
    );
  },
);

Then("response time should be <= 1000 ms", () => {
  if (lastDuration > 1000)
    throw new Error(`Response took ${lastDuration} ms (> 1000 ms)`);
});
