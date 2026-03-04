
@api
Feature: Delayed response

  Scenario Outline: Delayed response validation
    When I send GET "/products?delay=<delay>"
    Then response code should be 200
    And response time should be <= 1000 ms

    Examples:
      | delay |
      | 0     |
      | 5000  |
      | 6000  |
