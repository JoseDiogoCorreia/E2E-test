Feature: Pass Soft Age Gate

  Scenario Outline: Pass Soft Age Gate
    Given I open the global frontend for "<marketCode>" with retailerId "<retailerId>"
    When I input the date "<date>" and submit
    Then I should see the "<nextPageType>" page

  Examples:
    | marketCode | retailerId | date       | nextPageType |
    | VU04       | VU000005   | 01/01/1990 | flow         |
    | CC04       | CC000001   | 31/12/1985 | brand        |
    | VU04       | VU000005   | 20/12/2010 | underAge     |
