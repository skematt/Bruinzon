import React, {useState, useEffect} from 'react'
import Layout from '../CoreComponent/Layout'
import {isAuthenticated} from '../Auth'
import {Link} from "react-router-dom"
import {getItem, getItems, getProducts, updateItem} from './backend'

const UpdateItem = ({match}) => {


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

    const init = productId => {
        getItem(productId).then(data =>{
            if(data.error){
                setValues({...values, error: data.error})
            } else{
                console.log(data)
                console.log(data.price)
                console.log(data.productType._id)
                setValues({...values, name: data.name,
                    
                    description: data.description,
                    price: data.price,
                    productType: data.productType,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData()
                })
                initCategories()
            }
        })
    }

    // Loading products
    const initCategories = () => {
        getProducts().then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({ items: data, formData: new FormData()})
            }
        })
    }

    useEffect(() => {
        init(match.params.productId);
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

        updateItem(match.params.productId, customer._id, token, formData).then(data => {
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

            <button className="btn btn-outline-primary">Update Product</button>

        </form>
    );


    const showError = () => (
        <div className = "alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className = "alert alert-info" style={{display: createdItem ? '' : 'none'}}>
            <h2>{`${createdItem}`} is updated!</h2>
        </div>
    );

    const showLoading = () => (
        loading && (<div className="alert alert-success">
            <h2>Loading...</h2>
        </div>)
    );

    return (
        <Layout
            title="Manage products"
            description= {"Update an item"}
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
};

export default UpdateItem;