@smoketest
Feature: Saucetest Smoke Test Validations


Scenario: Validate Menu items
    Given When a user login to the application with "standard_user" and "secret_sauce"
    Then the following menu items must be displayed
    | All Items, About, Logout, Reset App State |


Scenario: TEST02 - Validate Product Items
    Given When a user login to the application with "standard_user" and "secret_sauce"
    Then the following product items and price must be displayed
    | productname                       | productprice |
    | Sauce Labs Backpack               | $29.99 |
    | Sauce Labs Bike Light             | $9.99  |
    | Sauce Labs Bolt T-Shirt           | $15.99 |
    | Sauce Labs Fleece Jacket          | $49.99 |
    | Sauce Labs Onesie                 | $7.99  |
    | Test.allTheThings() T-Shirt (Red) | $15.99 |

Scenario: TEST03 - Validate Product Pages
    Given When a user login to the application with "standard_user" and "secret_sauce"
    When the user opens a product from "home-products.json" file
    Then the product must have the productname, productprice, productdesc as per the "home-products.json" file

@runme
Scenario: TEST04 - End-to-end Checkout Single Item
    Given When a user login to the application with "standard_user" and "secret_sauce"
    When the user opens a random product
    Then the product must have the productname, productprice productdesc as per the "home-products.json" file
    When the user clicks the Add to cart Button
    Then the product is added to the cart
    When the user clicks on the cart icon
    Then the cart page is opened with productname, productprice productdesc as per the "home-products.json" file
    When the user clicks on the Checkout page
    Then Checkout: Your Information is displayed
    Given the user fills the checkout information with First Name "Mike", Last Name "John", Zip code "1111"
    When the Continue button is clicked
    Then Checkout: Overview page is displayed with the correct Item Price, Tax and Total Price
    When the Finish button is clicked
    Then Checkout: Complete! Page is displayed with the message "Thank you for your order!"




