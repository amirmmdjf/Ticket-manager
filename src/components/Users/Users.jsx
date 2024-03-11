import { useState, useEffect } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { MdDelete, MdEdit} from "react-icons/md";
import { FaEye } from "react-icons/fa6";

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
                console.log(Object.entries(response.data));
            })
    }, [getData])

    useEffect(() => {
        let mainUserInfo = users.find(user => user[0] == userId)

        if (mainUserInfo) {
            setFirstName(mainUserInfo[1].subjectTicket)
            setLastName(mainUserInfo[1].message)
            setEmail(mainUserInfo[1].email)
        }
    }, [userId])

    const removeHandler = async () => {

        const response = await axios.delete(`https://test-3a7f8-default-rtdb.firebaseio.com/users/${userId}.json`)

        setShowDeleteModal(false)
        setGetData(!getData)
    }


    return (
        <div className="w-[1000px] text-center mx-auto mt-[100px]">
            <Table className="" striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Subject</th>
                        <th>Ticket message</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{user[1].subjectTicket}</td>
                            <td>{user[1].message.slice(0, 50)}...</td>
                            <td>{user[1].email}</td>
                            <td className="flex justify-evenly h-[40px]">
                                <MdDelete className="cursor-pointer mt-1"
                                    onClick={() => {
                                        setShowDeleteModal(true)
                                        setUserId(user[0])
                                    }}
                                />

                                <FaEye className="cursor-pointer mt-1"
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
                    {/* <Form.Group className="mb-3" controlId="formBasicPassword">
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
                    </Form.Group> */}

                    <p>{lastName}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowEditModal(false)}>Close</Button>
                    {/* <Button onClick={() => editHandler()}>Edit</Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Users;