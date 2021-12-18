import React, { useEffect, useState, Fragment } from "react";

const PriceButton =({prices, itemFilter}) => {
    const [val, setVal] = useState(0)

    const handleChange = (event) =>{
        itemFilter(event.target.value)
        setVal(event.target.value)
    }

    return prices.map((val,index) =>(
        <div key={index} >
            <input onChange = {handleChange} name ={val} value = {`${val._id}`} type="radio" className = "mr-2 ml-4"/>
            <label className = "form-check-label">{val.name}</label>
        </div>
    ))
}

export default PriceButton