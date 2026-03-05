
@api
Feature: Print products with odd ids

  Scenario: Get products and print odd IDs
    When I send GET "/products"
    Then response code should be 200
    And I print product titles with odd IDs
