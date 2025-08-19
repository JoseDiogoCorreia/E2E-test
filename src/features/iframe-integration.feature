Feature: iframe integration
  @only
  Scenario Outline: Use SSR through iframe
    Given The example iframe page
    When I Load SSR through iframe
    Then I should see SSR working as expected

