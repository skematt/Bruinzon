import React, {Fragment} from 'react'
import { Link, withRouter } from 'react-router-dom'
import {logout, isAuthenticated} from '../Auth'

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {color: '#FFD100'}
    } else {
        return {color: '#ffffff'}
    }
}

const MenuPage = ({history}) => {
    return (<div >
        
        <ul className = "bruincolor" id="listout">

            <li className = "nav-item" id="listin" >
            
            <li className = "nav-item" id="listin">
                <Link className="nav-link" 
                      style = {isActive(history, '/')}
                      to="/">
                    Home
                </Link>
            </li>


            <li className = "nav-item" id="listin">
                <Link className="nav-link" 
                      style = {isActive(history, '/shop')}
                      to="/shop">
                    Shop List
                </Link>
            </li>
            <Link 
                      style = {isActive(history, '/')}
                      to="/">
                <img  
                    src={require('./Images/logo3.png') }
                    height="40" width="40" class="ml-2"
                ></img>
                </Link>
            </li>

            {isAuthenticated() && isAuthenticated().customer.role === 0 && (<li className = "nav-item" id="listin">
                <Link className="nav-link" 
                      style = {isActive(history, '/dashboard')}
                      to="/user/dashboard"
                >
                    Dashboard
                </Link>
            </li>)}
            {isAuthenticated() && isAuthenticated().customer.role === 1 && (<li className = "nav-item" id="listin">
                <Link className="nav-link" 
                      style = {isActive(history, '/dashboard')}
                      to="/admin/dashboard"
                >
                    Dashboard
                </Link>
            </li>)}

            {!isAuthenticated() && (
                <Fragment>
                    <li className = "nav-item" id="listin">
                        <Link className="nav-link"  style = {isActive(history, '/signin')} to="/signin">Signin</Link>
                    </li>

                    <li className = "nav-item" id="listin">
                        <Link className="nav-link"  style = {isActive(history, '/signup')} to="/signup">Signup</Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <li className = "nav-item" id="listin">
                <span className="nav-link"
                      style ={{cursor: 'pointer', color: '#ffffff'}}
                      onClick ={() => logout(() => {
                          history.push("/");
                      })
                      }
                >
                    Logout
                </span>
                </li>
            )}




        </ul>
    </div>)
}
export default withRouter(MenuPage);


/* Old code with David's new versions down here */

/*
export default function MenuPage() {
    return (
        <header>
          <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
                
                <Navbar.Brand href="/">Bruinzon</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
    
                    <Nav.Link href="/cart"><i className = 'fas fa-shopping-cart'></i>Cart</Nav.Link>
                    <Nav.Link href="/signin"><i className = 'fas fa-user'></i>Sign In</Nav.Link>
                
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
    )
}
*/