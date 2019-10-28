import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import {Link} from 'react-router-dom';
import ContactService from './ContactService';

class ListContact extends Component {
  constructor(props) {
      super(props);
      this.state = {value: '', items: ''};
    }

    componentDidMount(){
      ContactService.getApi('/')
      .then(response => {
        this.setState({ items: response.data.data });
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    tabRow(){
      if(this.state.items instanceof Array){
        return this.state.items.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        })
      }
    }
   

    render() {
      return (
        <div className="container" >
            <div>
              <h3 className="text-center">Contact List</h3>
              <Link to={"/add-contact/"} className="float-right btn btn-dark btn-sm mb-1">< i className ="fa fa-fw fa-plus-circle"/>Add New Contact</Link>
            </div>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.tabRow()}
              </tbody>
            </table>
        </div>
      );
    }
  }

export default ListContact;
