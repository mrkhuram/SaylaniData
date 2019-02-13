import React, { Component } from 'react';

import {Link } from 'react-router-dom'

import './App.css';

class App extends Component {
  state={
    todos:[],
    currentindex:'',
    disable:0

  }


  componentDidMount(){
    const {todos} = this.state
    if(localStorage.getItem('lists')){
      var mylist = JSON.parse(localStorage.getItem('lists'))
      this.setState({
        todos:mylist
      })

    }
    else{
      localStorage.setItem('lists',JSON.stringify(todos))
    }
    
    
  }
  addlist(){
    const {todos} = this.state
     var item = {
       name:this.refs.name.value,
       description:this.refs.des.value,
       price:this.refs.price.value,
       category:this.refs.cate.value,
     }
     todos.push(item)
     this.setState({todos})
     localStorage.setItem('lists',JSON.stringify(todos))

  }
  delitem(index){
    const {todos} = this.state
    todos.splice(index,1)
    var mylist = JSON.parse(localStorage.getItem('lists'))
    mylist.splice(index,1)
    localStorage.setItem('lists',JSON.stringify(mylist))

    this.setState({todos})

    




  }
  updateitem(index){
    const {currentindex} = this.state
    this.setState({currentindex:index,
    disable:1})

    

  }

  updatelist(){
    const {currentindex,todos} = this.state

    var item = {
      name:this.refs.name.value,
      description:this.refs.des.value,
      price:this.refs.price.value,
      category:this.refs.cate.value,
    }

    todos.splice(currentindex,1)
    todos.splice(currentindex,0,item)



    var mylist = JSON.parse(localStorage.getItem('lists'))

    mylist.splice(currentindex,1)
    mylist.splice(currentindex,0,item)
    localStorage.setItem('lists',JSON.stringify(mylist))




    this.setState({
      todos
    })


  }
  render() {
    const {todos} = this.state
    return (
      <div className="App">
        <h4 className='ml-5 set'>Read Products</h4>




        
<button type="button" class="btn btn-primary btn-sm set" data-toggle="modal" data-target="#exampleModal" onClick={()=>{
  this.setState({disable:0})
}}>
  Create Product
</button>


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add an Item</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
        <div class="form-group row">
    <label for="inputEmail3" class="col-sm-2 col-form-label">Name</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" placeholder="Name" ref='name'/>
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Description</label>
    <div class="col-sm-10">
      <input type="text" class="form-control"  placeholder="Description" ref='des'/>
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Price</label>
    <div class="col-sm-10">
      <input type="text" class="form-control"  placeholder="Price" ref='price'/>
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Category</label>
    <div class="col-sm-10">
      <input type="text" class="form-control"  placeholder="Category"  ref='cate'/>
    </div>
  </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        {this.state.disable==0?<button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.addlist.bind(this)}>Add</button>:
        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.updatelist.bind(this)}>Update</button>}
      </div>
    </div>
  </div>
</div>















<table class="table table-bordered  col-lg-8 offset-lg-2 col-sm-12 offset-sm-0 mt-5">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Price</th>
      <th scope="col">Category</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {todos.map((obj,index)=>{
      return (
        <tr>
      <th scope="row">{obj.name}</th>
      <td>{obj.description}</td>
      <td>{obj.price}</td>
      <td>{obj.category}</td>
      <td><Link to={
        {
          pathname:'/item',
          state:obj
        }
      }><button type="button" class="btn btn-info btn-sm ml-2">Read One</button></Link>
      <button type="button" class="btn btn-primary btn-sm ml-2" data-toggle="modal" data-target="#exampleModal" onClick={this.updateitem.bind(this,index)}>
  edit
</button>
<button type="button" class="btn btn-danger btn-sm ml-2" onClick={this.delitem.bind(this,index)}>Delete</button>
</td>
    </tr>
      )

    })}
   
  </tbody>
</table>
      </div>
    );
  }
}

export default App;
