import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';


function FormRegister() {

  const [subjectTicket, setSubjectTicket] = useState('')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')


  useEffect(() => {
    let data = [subjectTicket, message, email]
    console.log(data);
  }, [subjectTicket, message, email])

  const changeSubjectTicketHandler = (event) => {
    setSubjectTicket(event.target.value)
  }

  const changeMessageHandler = (event) => {
    setMessage(event.target.value)
  }

  const changeEmailHandler = (event) => {
    setEmail(event.target.value)
  }

  const registerHandler = (event) => {
    event.preventDefault()

    let ticketInfo = {
      subjectTicket,
      message,
      email
    }

    // fetch('https://test-3a7f8-default-rtdb.firebaseio.com/users.json', {
    //   method: 'POST',
    //   body: JSON.stringify(ticketInfo)
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

    axios.post('https://test-3a7f8-default-rtdb.firebaseio.com/users.json', ticketInfo)
      .then(function (response) {
        setSubjectTicket('')
        setMessage('')
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
        <Form.Label className='font-semibold' htmlFor="subjectTicket">Subject Ticket</Form.Label>
        <Form.Control
          type="text"
          id="subjectTicket"
          value={subjectTicket}
          onChange={changeSubjectTicketHandler}
        />

        <Form.Label className='mt-4 font-semibold' htmlFor="message">Write your message</Form.Label>
        <Form.Control as="textarea"
          aria-label="With textarea"
          id="message"
          value={message}
          onChange={changeMessageHandler}
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