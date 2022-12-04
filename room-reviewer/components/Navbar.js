import Link from "next/Link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavigationBar() {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Room Reviewer</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/reviews">Recent Reviews</Nav.Link>
                            <Nav.Link href="/login">Sign up</Nav.Link>
                            <NavDropdown
                                title="Dashboard"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item href="/dashboard">
                                    Account
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/dashboard/profile">
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/dashboard/settings">
                                    Settings
                                </NavDropdown.Item>
                                {/* <NavDropdown.Divider /> */}
                                {/* <NavDropdown.Item href="#">
                                    Separated link
                                </NavDropdown.Item> */}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
export default NavigationBar;
