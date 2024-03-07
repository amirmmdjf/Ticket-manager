import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';


function FormRegister() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')


  useEffect(() => {
    let data = [firstName, lastName, email]
    console.log(data);
  }, [firstName, lastName, email])

  const changeFirstNameHandler = (event) => {
    setFirstName(event.target.value)
  }

  const changeLastNameHandler = (event) => {
    setLastName(event.target.value)
  }

  const changeEmailHandler = (event) => {
    setEmail(event.target.value)
  }

  const registerHandler = (event) => {
    event.preventDefault()

    let userInfo = {
      firstName,
      lastName,
      email
    }

    // fetch('https://test-3a7f8-default-rtdb.firebaseio.com/users.json', {
    //   method: 'POST',
    //   body: JSON.stringify(userInfo)
    // }).then((response) => {
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
    //   return response.json(); // Assuming you want to work with the response data
    // })
    // .then((data) => {
    //   console.log('Data successfully posted:', data);
    // })
    // .catch((error) => {
    //   console.error('Error posting data:', error);
    // });

    axios.post('https://test-3a7f8-default-rtdb.firebaseio.com/users.json', userInfo)
      .then(function (response) {
        setFirstName('')
        setLastName('')
        setEmail('')
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });



  }

  return (
    <>
      <Form onSubmit={registerHandler} className='w-[500px] h-max py-5 px-8 rounded-lg mx-auto mt-20 bg-[#212529] text-white'>
        <Form.Label className='font-semibold' htmlFor="first-name">First name</Form.Label>
        <Form.Control
          type="text"
          id="first-name"
          value={firstName}
          onChange={changeFirstNameHandler}
        />

        <Form.Label className='mt-4 font-semibold' htmlFor="last-name">Last name</Form.Label>
        <Form.Control
          type="text"
          id="last-name"
          value={lastName}
          onChange={changeLastNameHandler}
        />

        <Form.Label className='mt-4 font-semibold' htmlFor="Email">Email</Form.Label>
        <Form.Control
          type="email"
          id="Email"
          value={email}
          onChange={changeEmailHandler}
        />

        <Button variant="warning" type='submit' className='mt-8 w-full'>Register</Button>
      </Form>
    </>
  );
}

export default FormRegister;