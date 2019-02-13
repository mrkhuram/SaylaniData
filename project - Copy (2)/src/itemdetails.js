import React, {Component} from 'react'


const Item = ({location})=>{
  
    return(
        <div class="card" >
        <div class="card-header">
          Item details
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{location.state.name}</li>
          <li class="list-group-item">{location.state.description}</li>
          <li class="list-group-item">{location.state.price}</li>
          <li class="list-group-item">{location.state.category}</li>
        </ul>
      </div>
    )

}
export default Item