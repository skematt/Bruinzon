import React from 'react'
import { API } from "../config"
import '../styles.css'
const ShowImage = ({item, url}) => (
    
    <div class="frame">
        <div class="helper">
    
            <img src={`${API}/${url}/photo/${item._id}`} 
                alt={item.name}
                className="mb-3"
                
                style={{maxHeight: "100%", maxWidth: "100%"}}
            />
        
        </div>
    </div>
    
);

export default ShowImage;