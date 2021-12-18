import React from 'react';
import MenuPage from './MenuPage';
import '../styles.css';
import Search from './Search'

const Layout3 = ({title = 'Title',
                    description = 'Description',
                    className,
                    children
}) => (

    //<img src="https://asucla.ucla.edu/v2/wp-content/uploads/2020/05/ASUCLA-Zoom-Royce-Hall-Fisheye.jpg" 
    <div>
        <MenuPage />
        
        
        
            <div class="container2" id="container5">
                
            <img id= "image" 
                src="https://asucla.ucla.edu/v2/wp-content/uploads/2021/01/Meyerhoff-Park-2-1-1.jpg"
               
                ></img>
                
                
                
                <p id="text6" className="display-1 center">{description}</p>
            </div>
        <div id="container2"></div>

        <hr class="mt-5"/>
        <div className={className}>{children}</div>
    </div>

);

export default Layout3;