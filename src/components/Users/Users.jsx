import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

const Users = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('https://test-3a7f8-default-rtdb.firebaseio.com/users.json')
            .then(response => {
                console.log(Object.entries(response.data))
                setUsers(Object.entries(response.data))
            })
    }, [])


    return (
        <div className="w-[1000px] text-center mx-auto mt-[100px]">
            <Table className="" striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{user[1].firstName}</td>
                            <td>{user[1].lastName}</td>
                            <td>{user[1].email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Users;