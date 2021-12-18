# Bruinzon- Ecommerce for Bruin Products 

* Created by Rahul Chander, Ivan Guan, David Xiong, Matthew Yang


### Detailed Description
* Display Dynamic Data to the User
    * Sellers can dynamically update the products they are selling on the backend (price changes, name change, etc.), and the frontend ecommerce interface will display the changes to buyers, as products are pulled from server to the website

* Upload Data from Client to Backend
    * We will let sellers add/edit products and users update profiles, which will be updated on the database

* Meaningfully search through Server-side data
    * We will allow users to enter keywords to search for products (which will likely be based on the name set up by the seller)

* Account database verification
    * Let user’s signup, login and access their personal information. They can also edit their name, email address or password

* Smart Recommendation
    * Recommend similar products to the items on their pages, based on the category the item was placed in when created

* Filter Products
    * When searching for products on the home page, users can filter the products by price or category, making it easier to search

* Bruinzon also has a secure login for new users during signup, giving users a sense of security. 


### Distinct Features (Summary)
* Ability for sellers to create new categories and items to sell to buyers 
* Filter for specific items on the frontend based on price and category
* Search bar to quickly locate a specific product on the backend 
* After viewing the product, we recommend you to similar items that the store offers
* A secure login for any new users, and the ability to create accounts

### Steps for Running Bruinzon 
#### Setting up repository on your local machine
* git clone https://github.com/IvanG17/Bruinzon_CS35L.git
* cd Bruinzon*
* Edit the .env in the main directory 
   * Set MONGO_URI to your own MongoDB URI database link 
#### Starting the backend
* npm install       
* node app.js 
#### Starting the frontend
* cd ecommerce 
* npm install 
* npm start
