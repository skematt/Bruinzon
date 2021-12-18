import React, {useState, useEffect} from 'react'
import Layout from '../CoreComponent/Layout'
import {isAuthenticated} from '../Auth'
import {Link} from "react-router-dom"
import {createItem, getProducts} from './backend'

const AddItem = () => {


    const [values, setValues] = useState ({
        name: '',
        description: '',
        price: '',
        products: [],
        productType: '',
        validShipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdItem: '',
        redirectToProfile: false,
        formData: ''
    });

    const {customer, token} = isAuthenticated();
    const {
        name,
        description,
        price,
        products,
        productType,
        validShipping,
        quantity,
        photo,
        loading,
        error,
        createdItem,
        redirectToProfile,
        formData
    } = values;

    // Loading products
    const init = () => {
        getProducts().then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, products: data, formData: new FormData()})
            }
        })
    }

    useEffect(() => {
        init();
    }, [])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name]: value})
    }

    const clickSubmit = event => {
        event.preventDefault()
        console.log(values)
        setValues({...values, error: '', loading: true})

        createItem(customer._id, token, formData).then(data => {
                if (data.error) {
                    setValues({...values, error: data.error})
                } else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        photo: '',
                        price: '',
                        quantity: '',
                        loading: false,
                        createdItem: data.name
                    });
                }
            });
    }

    const uploadForm = () => (
        <form className = "mb-3" onSubmit={clickSubmit}>
            <h4>Upload photo</h4>
            <div className = "form-group">
                <label className = "btn btn-secondary">
                    <input onChange={handleChange('photo')}
                           type="file"
                           name="photo"
                           accept="image/*"/>
                </label>

            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')}
                       type="text"
                       className="form-control"
                       value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')}
                       className="form-control"
                       value={description} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')}
                       type="number"
                       className="form-control"
                       value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Product</label>
                <select onChange={handleChange('productType')}
                        className="form-control">
                    <option>Please Select</option>
                    {products && products.map((p, i) => (<option key = {i} value={p._id}>
                        {p.name}
                    </option>))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('validShipping')}
                        className="form-control">
                    <option>Please Select</option>
                    <option value = "0">No Shipping</option>
                    <option value = "1">Yes Shipping</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')}
                       type="number"
                       className="form-control"
                       value={quantity} />
            </div>

            <button className="btn btn-outline-primary">Create Item</button>

        </form>
    );


    const showError = () => (
        <div className = "laert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className = "alert alert-info" style={{display: createdItem ? '' : 'none'}}>
            <h2>{`${createdItem}`} is created!</h2>
        </div>
    );

    const showLoading = () => (
        loading && (<div className="alert alert-success">
            <h2>Loading...</h2>
        </div>)
    );

    return (
        <Layout
            title="Add a new item"
            description= {"Create an item now"}
            className="container-fluid">
            <div className="row">
                <div className = "col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {uploadForm()}
                </div>
            </div>

        </Layout>
    )
}

export default AddItem