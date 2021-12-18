import React, { useEffect, useState } from "react";
import Layout2 from './Layout2';
import {getProducts} from './ApiCore'
import Card from './Card'
import Search from './Search'

const HomePage = () => {
  const [productsBySell, setProductsBySell] = useState([])
  const [productsByArrival, setProductsByArrival] = useState([])
  const [error, setError] = useState(false)

  const loadProductsBySell = () => {
    getProducts('price').then(data => {
      if(data.error){
        setError(data.error)
      }else{
        setProductsBySell(data)
      }

    })
  }

  const loadProductsByArrival = () => {
    getProducts('createdAt').then(data => {
      if(data.error){
        setError(data.error)
      }else{
        setProductsByArrival(data)
      }

    })
  }

  useEffect(() => {
    loadProductsByArrival()
    loadProductsBySell()
  }, [])

  return (
    <Layout2 
      title = "Home" 
      description = "Bruinzon"
      className = "container-fluid"
      >
      
      <blockquote class="blockquote text-center">
  <p class="mb-0">The products on Bruinzon drop as hard as Randall dropped my mental health.</p>
  <footer class="blockquote-footer">Student, <cite title="Source Title">CS 35L</cite></footer>
</blockquote>
<hr/>
      <Search id="searchbar"/>
      <div id="container3"></div>
      <img src="https://www.uclastore.com/site/img/Headers/Slider-Holiday-DESKTOP.jpg"></img>
      <div  id="container3"></div>
      <hr/>

      <h2 className="mb-4" id="text4">New Arrivals</h2>
      <div class="mb-4" id="container4"></div>
      <div className = "row">
        {productsByArrival.map((item, i) => (
            <div key = {i} className="col-3 mb-3">
                <Card product={item}/>
            </div>
        ))}
      </div>
      <div id="container3"></div>
      <img src="https://ns.asucla.ucla.edu/site/img/homepage/threads-carousel-home-nike2.jpg" width ="1411"></img>
      <div  id="container3"></div>
      
      
    </Layout2>
  )
}

export default HomePage