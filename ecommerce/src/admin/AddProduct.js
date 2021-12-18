import React, {useState} from 'react'
import Layout from '../CoreComponent/Layout'
import {isAuthenticated} from '../Auth'
import {Link} from "react-router-dom"
import {addProduct, createProduct} from './backend'


const AddProduct = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false) 
    const [success, setSuccess] = useState(false)


    const {customer, token} = isAuthenticated()

    const handleChange = (event) =>{
        setError('')
        setName(event.target.value)
    }

    const clickSubmit = (event) => {
        event.preventDefault() 
        setError('')
        setSuccess(false)


        createProduct(customer._id, token, {name})
        .then(data => {
            if(data.error){
                setError(true)
            }else {
                setError('');
                setSuccess(true);
            }
        })
    }

    const newProductForm = () => (
        <form onSubmit={clickSubmit}> 
            <div className="form-group">
                <label className = 'text-muted'>Category Name</label>
                <input type= "text" className="form-control" onChange ={handleChange} value={name} autoFocus/>

               


            </div>
            <button className='btn btn-outline-primary'>Create Category</button>
        </form>
    )

    const showSuccess = () =>{
        if (success){
            return <h3 className = "text-success">{name}</h3>
        }
    }

    const showError = () =>{
        if (error){
            return <h3 className = "text-success">{name} should be different.</h3>
        }
    }
    return (
        <Layout
            title="Add a Category"
            description= {"Create a category now"}
            className="container-fluid">
            <div className="row">
    
                <div className = "col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newProductForm()}
                    
                </div>
            </div>

        </Layout>
    )
}

export default AddProduct