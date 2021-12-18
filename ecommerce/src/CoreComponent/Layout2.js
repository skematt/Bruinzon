import React from 'react';
import MenuPage from './MenuPage';
import '../styles.css';
import Search from './Search'

const Layout2 = ({title = 'Title',
                    description = 'Description',
                    className,
                    children
}) => (

    //<img src="https://asucla.ucla.edu/v2/wp-content/uploads/2020/05/ASUCLA-Zoom-Royce-Hall-Fisheye.jpg" 
    <div>
        <MenuPage />
        
        
        
            <div id="container">
            <div id="container2"></div>
                <img id= "image" 
                src="https://asucla.ucla.edu/v2/wp-content/uploads/2020/05/ASUCLA-Zoom-Royce-Hall.jpg"
                
                ></img>
                
                <p id="text2-1" >aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                <p id="text2-2">aaaaaaaaa</p>
                <p id="text2" className="display-1">{description}</p>
            </div>
        <div id="container2"></div>

        <hr class="mt-5"/>
        <div className={className}>{children}</div>
    </div>

);

export default Layout2;