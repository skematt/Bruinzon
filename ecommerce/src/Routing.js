import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import UserSignUp from './UserComponent/UserSignUp'
import UserSignIn from './UserComponent/UserSignIn'
import HomePage from './CoreComponent/HomePage'
import PrivateRoute from './Auth/PrivateRoute'
import AdminRoute from './Auth/AdminRoute'
import UserDashboard from './UserComponent/UserDashboard'
import AdminDashboard from './UserComponent/AdminDashboard'
import AddProduct from './admin/AddProduct'
import AddItem from './admin/AddItem'

import ShopPage from './CoreComponent/Shop'
import ManageProducts from './admin/ManageProduct'
import UpdateItem from './admin/UpdateItem'
import Product from './CoreComponent/Product'
import UserProfile from './UserComponent/UserProfile'

const Routing  = () => {
    return (<div>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/signin" exact component={UserSignIn} />
                <Route path="/signup" exact component={UserSignUp} />
                <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/create/category" exact component={AddProduct} />
                <AdminRoute path="/admin/item/update/:productId" exact component={UpdateItem} />
                <AdminRoute path="/create/product" exact component={AddItem} />

                <AdminRoute path="/admin/products" exact component={ManageProducts} />
                <Route path="/shop" exact component={ShopPage}/>
                <Route path="/product/:productId" exact component={Product} />

                <PrivateRoute path = "/profile/:userID" exact component={UserProfile} />
                
            </Switch>
        </BrowserRouter>
    </div>)
}

export default Routing;