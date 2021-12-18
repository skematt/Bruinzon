import React from 'react'
import MenuPage from './MenuPage'

const Layout = ({title = 'Title',
                    description = 'Description',
                    className,
                    children
}) => (


    <div>
        <MenuPage />
        
        
        
            <div class="container2" id="container5">
                
                <img id= "image2" 
                src="https://s3.amazonaws.com/cms.ipressroom.com/173/files/20201/5e546fa02cfac215af338e58_Janss+Steps+by+Patricia+Marroquin/Janss+Steps+by+Patricia+Marroquin_5a0d4865-02c5-46e8-828a-1a41476efa22-prv.jpg"
                
                ></img>
                
                
                <p id="text5" className="display-1 centertext">{description}</p>
            </div>
        <div id="container2"></div>

        <hr class="mt-5"/>
        <div className={className}>{children}</div>
    </div>

);

export default Layout