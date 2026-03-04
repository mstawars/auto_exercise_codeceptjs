
@ui @scenario2
Feature: Add item from product page for problem_user

  Scenario: Add a single product using PDP
    Given I am on the SauceDemo login page
    When I log in as "problem_user"
    And I open product "Sauce Labs Backpack"
    And I add product to cart from product page
    And I open the cart
    Then I should see product "Sauce Labs Backpack" in the cart
