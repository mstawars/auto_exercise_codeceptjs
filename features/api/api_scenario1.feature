
@api
Feature: DummyJSON API scenario 1

  Scenario: Get products and print odd IDs
    When I send GET "/products"
    Then response code should be 200
    And I print product titles with odd IDs
