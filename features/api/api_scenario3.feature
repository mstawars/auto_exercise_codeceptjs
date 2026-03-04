
@api
Feature: Update third product

  Scenario: Update product and validate
    Given I store response from GET "/products/3"
    When I send PUT "/products/3" with body:
      """
      { "title": "Updated" }
      """
    Then response code should be 200
    And updated product should contain original properties except changed ones
