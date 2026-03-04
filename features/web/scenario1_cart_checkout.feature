
@ui @scenario1 @regression
Feature: Full purchase flow

  Scenario: Add all items, remove one, buy remaining items
    Given I am on the SauceDemo login page
    When I log in as "standard_user"
    And I add all products to the cart
    And I open the cart
    And I remove product number 3 from the cart
    And I proceed to checkout with data:
      | firstName | John   |
      | lastName  | Doe    |
      | zip       | 50-000 |
    Then I should see the checkout overview contains correct items and count
    When I finish the purchase
    Then I should see order confirmation
