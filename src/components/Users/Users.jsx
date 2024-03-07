import { useState, useEffect } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";

const Users = () => {

    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState('')
    const [getData, setGetData] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
        axios.get('https://test-3a7f8-default-rtdb.firebaseio.com/users.json')
            .then(response => {
                console.log(Object.entries(response.data))
                setUsers(Object.entries(response.data))
            })
    }, [getData])

    const removeHandler = async () => {
        await fetch(`https://test-3a7f8-default-rtdb.firebaseio.com/users/${userId}.json`, {
            method: 'DELETE'
        }).then(response => console.log(response))

        setShowDeleteModal(false)
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
                                <MdEdit className="cursor-pointer" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>


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
        </div>
    );
}

export default Users;