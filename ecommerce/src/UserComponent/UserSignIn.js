import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Layout from '../CoreComponent/Layout'
import {signin, authenticate, isAuthenticated} from '../Auth/index'


const UserSignIn = () => {

    const [values, setValues] = useState({

        email:'',
        password:'',
        error:'',
        loading: false,
        redirectToReferrer: false,
    });

    const {email, password, loading, error, redirectToReferrer} = values
    const { customer } = isAuthenticated()

    const handleChange = name => event =>{
        setValues({...values, error:false,
            [name]:event.target.value})
    }

    
    
    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false, loading: true})
        signin({email, password})
        .then(data => {

            
            if(data.error){
                setValues({...values,error: data.error, 
                    loading: false})
            }else{
                authenticate(
                    data, () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true
                        });
                    }
                )
            }

        })
    }


    const signUpForm = () => (
        <form>
            
            <div className="form-group">
                <label className="text-muted">
                    Email
                </label>
                <input onChange={handleChange('email')} 
                type="email" 
                className="form-control"
                value={email}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">
                    Password
                </label>
                <input onChange={handleChange('password')} 
                type="password" 
                className="form-control"
                value={password}></input>
            </div>
            <button onClick= {clickSubmit} className="btn btn-primary">Sign In</button>
            
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" 
        style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showLoading = () => loading && (
        <div className="alert alert-info">
            <h2>Loading...</h2>
        </div>
    );

    const redirectUser = () => {
        if(redirectToReferrer){
            if(customer && customer.role === 1){
                return <Redirect to="/admin/dashboard"/>
            } else{
                return <Redirect to="/user/dashboard"/>
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/"/>
        }
    }

    

    return (
        <Layout
            title="Signin"
            description="Sign in to your account"
            className="container col-md-8 offset-md-2"
        >
            {showLoading()}
            {signUpForm()}
            {showError() }
            {redirectUser()}
            
        </Layout>
    )
}

export default UserSignIn