
@ui @scenario4
Feature: Locked out user login

  Scenario: Login fails for locked_out_user
    Given I am on the SauceDemo login page
    When I log in as "locked_out_user"
    Then I should see login error "Epic sadface"
