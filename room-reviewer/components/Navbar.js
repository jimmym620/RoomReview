import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "react-bootstrap/Button";

function NavigationBar() {
    const { data: session, status } = useSession();

    return (
        <div>
            <Navbar id="navigation" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Room Reviewer</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/reviews">Recent Reviews</Nav.Link>
                            <Nav.Link href="/reviews/submit">
                                Add a Review
                            </Nav.Link>
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
                        <div className="profile-container ">
                            {/* if user is authenticated, render sign in or out button*/}
                            {status === "authenticated" ? (
                                <div>
                                    <img
                                        className="userImage"
                                        src={session.user.image}
                                        alt=""
                                    />
                                    <Button
                                        onClick={() => {
                                            signOut();
                                        }}
                                    >
                                        Sign Out
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <Button
                                        onClick={() => {
                                            signIn();
                                        }}
                                    >
                                        Sign In
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
export default NavigationBar;
