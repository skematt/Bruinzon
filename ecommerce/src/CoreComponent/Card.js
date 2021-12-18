import React from 'react'
import {Link} from 'react-router-dom'
import ShowImage from './ShowImage'

const Card = ({product, showViewProductButton = true}) => {

    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                <button className="btn btn-outline-primary mt-2 mb-2">View Product</button>
                </Link>
            )
        )
    }

    const showAddToCartButton = () => {
        return (
        <button className="btn btn-outline-warning mt-2 mb-2">
            Add to cart
        </button>
        )
    }

    const showQuantity = (quantity) => {
        return quantity > 0 ? (<span className="badge badge-primary badge-pill">In Stock</span>)
                            : (<span className="badge badge-primary badge-pill">Out of Stock</span>)
    }

    return (
            <div className="card" >
                <div className="card-header">{product.name}</div>
                <div className="card-body" >
                    <ShowImage item={product} url = "items"/>
                    <p className="lead mt-2">{product.description}</p>
                    <p>${product.price}</p>
                    <p>Category: {product.productType && product.productType.name}</p>
                    {showQuantity(product.quantity)}
                    <br/>
                    {showViewButton(showViewProductButton)}
                    {showAddToCartButton()}

                </div>
            </div>
    )
};

export default Card;