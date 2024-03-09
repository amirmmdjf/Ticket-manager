import { useState, useEffect } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";

const Users = () => {

    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState('')
    const [getData, setGetData] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')


    useEffect(() => {
        axios.get('https://test-3a7f8-default-rtdb.firebaseio.com/users.json')
            .then(response => {
                setUsers(Object.entries(response.data))
            })
    }, [getData])

    useEffect(()=>{
        let mainUserInfo = users.find(user => user[0] == userId)

        if(mainUserInfo){
            setFirstName(mainUserInfo[1].firstName)
            setLastName(mainUserInfo[1].lastName)
            setEmail(mainUserInfo[1].email)
        }
    }, [userId])

    const removeHandler = async () => {

        const response = await axios.delete(`https://test-3a7f8-default-rtdb.firebaseio.com/users/${userId}.json`)

        setShowDeleteModal(false)
        setGetData(!getData)
    }


    async function editHandler() {
        // try {
        //     const response = await axios.put(`https://test-3a7f8-default-rtdb.firebaseio.com/users/${userId}.json`);

        //     // Assuming setFirstName, setLastName, and setEmail are async functions that update state
        //     await Promise.all([
        //         setFirstName(''),
        //         setLastName(''),
        //         setEmail('')
        //     ]);

        //     console.log(response);
        // } catch (error) {
        //     console.error(error);
        // }

        let userNewInfos = {
            firstName,
            lastName,
            email
        }

        // await fetch(`https://test-3a7f8-default-rtdb.firebaseio.com/users/${userId}.json`, {
        //     method: 'PUT',
        //     body: JSON.stringify(userNewInfos)
        // }).then(response => console.log(response))

        try {
            const response = await axios.put(`https://test-3a7f8-default-rtdb.firebaseio.com/users/${userId}.json`, userNewInfos);
            console.log(response);
        } catch (error) {
            console.log(error);
        }

            
        setShowEditModal(false)
        setGetData(!getData)
    }


    return (
        <div className="w-[1000px] text-center mx-auto mt-[100px]">
            <Table className="" striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{user[1].firstName}</td>
                            <td>{user[1].lastName}</td>
                            <td>{user[1].email}</td>
                            <td className="flex justify-evenly h-[40px]">
                                <MdDelete className="cursor-pointer"
                                    onClick={() => {
                                        setShowDeleteModal(true)
                                        setUserId(user[0])
                                    }}
                                />
                                <MdEdit className="cursor-pointer"
                                    onClick={() => {
                                        setShowEditModal(true)
                                        setUserId(user[0])
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Delete Modal */}
            <Modal
                show={showDeleteModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete Confirm
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <p>
                        Are you sure to delete this user?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowDeleteModal(false)}>Close</Button>
                    <Button onClick={() => removeHandler()}>Yes Delete</Button>
                </Modal.Footer>
            </Modal>



            {/* Edit Modal */}
            <Modal
                show={showEditModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>FirstName: </Form.Label>
                        <Form.Control type="text" value={firstName} placeholder="Enter FirstName"
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>LastName: </Form.Label>
                        <Form.Control type="text" value={lastName} placeholder="Enter LastName"
                            onChange={(event) => setLastName(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email: </Form.Label>
                        <Form.Control type="email" value={email} placeholder="Enter Email"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowEditModal(false)}>Close</Button>
                    <Button onClick={() => editHandler()}>Edit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Users;