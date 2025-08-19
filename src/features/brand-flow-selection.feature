Feature: Navigate flow and brand selection
@only
  Scenario Outline: Navigate flow and brand selection
    Given I open the global frontend for "<marketCode>" with retailerId "<retailerId>"
    When I input the date "<date>" and submit
    And I should see the "<nextPageType>" page
    And I select the flow "<flowSelection>"
    And I select the brand "<brandSelection>"
    Then I should see the landing page of "<brandSelection>"

  Examples:
    | marketCode | retailerId | date       | nextPageType | flowSelection | brandSelection |
    | VU04       | VU000005   | 01/01/1990 | flow         | account       | IQOS           |
    | VU04       | VU000005   | 01/01/1990 | flow         | device        | VEEV           |
    | CC04       | NA         | 31/12/1985 | brand        | NA            | IQOS           |
    | CC04       | NA         | 31/12/1985 | brand        | NA            | VEEV           |

