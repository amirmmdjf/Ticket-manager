import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Link to="/Ticket-manager/" className="no-underline text-orange-400 text-[24px] mr-10">Ticket manager</Link>
                    <Nav className="me-auto">
                        <Link className="no-underline text-white mr-5" to="/Ticket-manager/form">Send Ticket</Link>
                        <Link className="no-underline text-white" to="/Ticket-manager/users">Tickets List</Link>
                    </Nav>
                </Container>
            </Navbar>
        </>

    );
}

export default Header;