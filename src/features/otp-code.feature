
Feature: Verify OTP via Email and Phone

  Scenario Outline: Verify Send OTP
    Given I open the global frontend for "<marketCode>" with retailerId "<retailerId>"
    When I input the date "<date>" and submit
    And I should see the "<nextPageType>" page
    And I select the flow "<flow>"
    And I select the brand "<brand>"
    And I should see the landing page of "<brand>"
    And I input the test user "<loginType>" and submit
    And I enter the "<loginType>" OTP code
    Then I should see the "Create Account" page

  Examples:
    | marketCode | retailerId | date       | nextPageType | flow       | brand    | loginType |
    | VU04       | VU000005   | 01/01/1990 | flow         | account    | IQOS     | email     |
    #| VU04       | VU000005   | 01/01/1990 | flow         | account    | VEEV     | email     |
    #| CC04       | NA         | 31/12/1985 | brand        | NA         | IQOS     | phone     |
    | CC04       | NA         | 31/12/1985 | brand        | NA         | VEEV     | phone     |

  Scenario Outline: Verify Resend OTP
    Given I open the global frontend for "<marketCode>" with retailerId "<retailerId>"
    When I input the date "<date>" and submit
    And I should see the "<nextPageType>" page
    And I select the flow "<flow>"
    And I select the brand "<brand>"
    And I should see the landing page of "<brand>"
    And I input the test user "<loginType>" and submit
    And I wait 60 sec and ask for a new otp code
    And I enter the "<loginType>" OTP code
    Then I should see the "Create Account" page

  Examples:
    | marketCode | retailerId | date       | nextPageType | flow       | brand    | loginType |
    | VU04       | VU000005   | 01/01/1990 | flow         | account    | IQOS     | email     |
    #| VU04       | VU000005   | 01/01/1990 | flow         | account    | VEEV     | email     |
    #| CC04       | NA         | 31/12/1985 | brand        | NA         | IQOS     | phone     |
    | CC04       | NA         | 31/12/1985 | brand        | NA         | VEEV     | phone     |
