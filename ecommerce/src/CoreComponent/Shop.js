import React, { useEffect, useState } from "react";
import Layout from './Layout'
import Card from './Card'
import {getProductTypes} from './ApiCore'
import Checklist from './Checklist'
import {prices} from './Prices'
import PriceButton from './PriceButton'
import {filterItem} from './ApiCore'
import Layout3 from './Layout3'





const ShopPage = () => {
    const [shopFilters, setFilters] = useState({
        filters: {productType : [], price : []}
    })
    const [productType, setType] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    const [filteredRes, setFilteredRes] = useState([])

    const [size, setSize] = useState(0)

    const init = () => {
        getProductTypes().then(data => {
            if(data.error) {
                setError(data.error)
                
            } else {
                setType(data)
            }
        })
    }

    const loadItems = (passedFilters) => {
        filterItem(skip, limit, passedFilters).then(data => {
            if (data.error){
                setError(data.error)
            }else {
                //console.log(data)
                setFilteredRes(data.data)
                setSize(data.size)
                setSkip(0)
            }
        })
    //    console.log(passedFilters)
    }

    const loadExtra = () => {

        let more = skip + limit
        filterItem(more, limit, shopFilters.filters).then(data => {
            if (data.error){
                setError(data.error)
            }else {
                //console.log(data)
                setFilteredRes([...filteredRes, ...data.data])
                setSize(data.size)
                setSkip(more)
            }
        })
       // console.log(passedFilters)
    }

    const loadMore = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick = {loadExtra} className="btn btn-warning mb-5">Load</button>
            )
        )
    }


    useEffect(() => {
        init()
        loadItems(skip,limit, shopFilters.filters)


    }, [])

    
    const itemFilter  = (filter, filterBy) => {
        const newFilters = {...shopFilters}
        newFilters.filters[filterBy] = filter

        if (filterBy == 'price'){
            let val = handlePrice(filter)
            newFilters.filters[filterBy] = val
        }
        loadItems(shopFilters.filters)
        setFilters(newFilters)
    }

    const handlePrice = value => {
        const data = prices
        let array = []

        for (let i in data){
            if (data[i]._id === parseInt(value)){
                array = data[i].array
            }
        }
        return array
    }

    

    return (
        <Layout3
          title = "Shop Page" 
          description = "Bruinzon Shop"
          className = "container-fluid"
          >
        <div className ="row">
        
            <div className = 'col-4' >
            <h4>See specific items with types</h4>
                <ul>
              
            
                <Checklist productType = {productType} itemFilter={ filters =>itemFilter(filters, 'productType')}/>
                
                </ul>

                <h4>See specific items with prices</h4>
                <div>
               
            
                <PriceButton prices = {prices} itemFilter={ filters =>itemFilter(filters, 'price')}/>
                
                </div>
               
            </div>
            <div className = 'col-8' >
                
                
                
                <div id="container2"></div>
                <h2 id="shop-text" className="mb-4">Available Products</h2>
                <div id="container4"></div>
                <div className="row mt-5" >
                        {filteredRes.map((product, i) => (
                            <div key = {i} className="col-4 mb-3">
                                <Card product={product}/>
                            </div>
                           //<Card key = {i} product ={product} />
                        ))}
                    </div>
                    {loadMore()}
            </div>

        </div>
          
    
        </Layout3>
      )
}

export default ShopPage