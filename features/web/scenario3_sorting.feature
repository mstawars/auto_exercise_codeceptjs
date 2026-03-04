
@ui @scenario3
Feature: Product sorting

  Scenario: Sort products A to Z
    Given I am on the SauceDemo login page
    When I log in as "standard_user"
    And I sort products by "Name (A to Z)"
    Then product names should be sorted ascending
