import React, { useEffect, useState } from "react";
import { getProducts } from "../admin/backend";
import { getProductTypes } from "./ApiCore";


// const Checklist = ({productTypes}) => {
//     return productTypes.map((products, index) => (
//         <li key = {index} className = "list-unstyled">
//             <input type="checkbox" className = "form-check-input"/>
//             <label className = "form-check-label">{products.name}</label>
//         </li>
//     ))
// }

const Checklist = ({productType, itemFilter}) => {

    const [checked, setCheck] = useState([])
    
    const handleCheck = product => () => {
        const prodID = checked.indexOf(product)
        const nowProcessed  = [...checked]

        if (prodID === -1)
        {
            nowProcessed.push(product)
        }else{
            nowProcessed.splice(prodID, 1)
        }
        console.log(nowProcessed)
        setCheck(nowProcessed)
        itemFilter(nowProcessed)
            
    } 

    return productType.map((products,index) =>(
        <li key={index} className = "list-unstyled">
            <input onChange = {handleCheck(products._id)} value = {checked.indexOf(products._id === -1)} type="checkbox" className = "form-check-input"/>
            <label className = "form-check-label">{products.name}</label>
        </li>
    ))
}

export default Checklist;