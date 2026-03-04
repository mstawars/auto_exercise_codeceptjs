
@api
Feature: Create product

  Scenario: Create product with required fields
    When I send POST "/products/add" with body:
      """
      {
        "title": "Test Product",
        "description": "Test Description",
        "price": 99,
        "brand": "TestBrand"
      }
      """
    Then response code should be 201
    And response should contain JSON:
      """
      {
        "title": "Test Product",
        "price": 99
      }
      """
