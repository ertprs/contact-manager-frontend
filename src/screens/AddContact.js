import React from 'react';
import ContactService from '../helpers/ContactService';
import TextInputGroup from "../components/TextInputGroup";
class AddContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      errors: {}
    }
  }

  addContact = () => {
    const {firstName, email, lastName, phoneNumber} = this.state;
    if (firstName === "") {
      this.setState({ errors: { firstName: "First Name is required" } });
      return;
    }
    if (lastName === "") {
      this.setState({ errors: { lastName: "Last Name is required" } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }
    if (phoneNumber === "") {
      this.setState({ errors: { phoneNumber: "PhoneNumber is required" } });
      return;
    }
    ContactService.postApi('/contacts', {firstName, email, lastName, phoneNumber})
      .then(json => {
        if (json.data.status === 'success') {
          this.props.history.push('/index')
        } else {
          alert('something went wrong!!');
          this.props.history.push('/index')
        }
      }).catch((error) => {
      console.log("error-----------", error)
    })
  };


  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  render() {
    const {firstName, email, lastName, phoneNumber,errors} = this.state;
    return (
      <div>
        <h2 className="text-center">Contact Form</h2>
        <div className="row justify-content-md-center">
          <div className="col-md-6 col-md-offset-3">
            <form>
              <TextInputGroup
                label="First Name"
                name="firstName"
                value={firstName}
                placeholder="enter first name "
                onChange={this.onChange}
                error={errors.firstName}
              />

              <TextInputGroup
                label="Last Name"
                name="lastName"
                value={lastName}
                placeholder="enter last name"
                onChange={this.onChange}
                error={errors.lastName}
              />

              <TextInputGroup
                label="Email"
                name="email"
                value={email}
                placeholder="enter email"
                onChange={this.onChange}
                error={errors.email}
              />
              <TextInputGroup
                label="Phone Number:"
                name="phoneNumber"
                value={phoneNumber}
                placeholder="enter phone number"
                onChange={this.onChange}
                error={errors.phoneNumber}
              />
              <button type="button" onClick={this.addContact} className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default AddContact;
