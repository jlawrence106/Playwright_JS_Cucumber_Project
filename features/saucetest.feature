Feature: Saucetest Smoke Test Validations

Scenario: Validate Menu items
    Given When a user login to the application with "standard_user" and "secret_sauce"
    Then the following menu items must be displayed
    | All Items, About, Logout, Reset App State |

Scenario: TEST02 - Validate Product Items
    Given When a user login to the application with "standard_user" and "secret_sauce"
    Then the following product items must be displayed
    | All Items, About, Logout, Reset App State |

Scenario: TEST03 - Validate Product Pages
    Given When a user login to the application with "standard_user" and "secret_sauce"
    When the user opens a product
    Then the product must have the <productname>, <productprice>, <productdesc>
    | productname | productprice | productdesc |

Scenario: TEST04 - End-to-end Checkout Single Item
    Given When a user login to the application with "standard_user" and "secret_sauce"
    When the user opens the product "productname"
    Then the product must have the "productname", "productprice", "productdesc"
    When the user clicks the Add to cart Button
    Then the product is added to the cart
    


Scenario: TEST05 - End-to-end Checkout Multiple Item
    Given When a user login to the application with "standard_user" and "secret_sauce"
    Then the following menu items must be displayed
    | All Items, About, Logout, Reset App State |




