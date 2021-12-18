import React, {useEffect, useState} from 'react'
import Layout from '../CoreComponent/Layout'
import {isAuthenticated} from '../Auth'
import {Link} from "react-router-dom"
import {getItems, deleteItem, deleteProduct} from './backend'


const ManageProducts = () => {


    const [products, setProducts] = useState([])


    const {customer, token} = isAuthenticated()

    const loadProducts = () => {
        getItems().then(data => {
            if(data.error){
                console.log(data.error)
            } else{
                setProducts(data)
            }
        })
    }

    const destroy  = productId => {
        deleteProduct(productId, customer._id, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                loadProducts()
            }
        })
    }

    useEffect(() => {
        loadProducts()
    }, [])



    return (
        <Layout 
          title = "Manage Products" 
          description = "Update products"
          className = "container-fluid"

          >
          <div className="row">
                <div className="col-12">
                    <h2>
                        Total {products.length} products
                    </h2>
                    <hr/>
                    <ul className = "list-group">
                        {products.map((p,i) => (
                            <li 
                            key={i}
                            className="list-group-item d-flex justify-content-between
                            align-items-center">
                                    <strong>
                                        {p.name}
                                    </strong>
                                    <Link to={`/admin/item/update/${p._id}`}>
                                        <span className="badge badge-warning badge-pill">Update</span>
                                        
                                    </Link>
                                    <button onClick ={() => destroy(p._id)} className="badge badge-danger badge-pill">Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
          </div>
          
    
    
        </Layout>
      );
}

export default ManageProducts;