import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import {
    Button,
    NavDropdown,
    Navbar,
    Nav,
    Container,
    Modal,
} from "react-bootstrap";
import SignOutModalBody from "./SignOutModalBody";

function NavigationBar() {
    const { data: session, status } = useSession();
    const [showState, setShowState] = useState(false);

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
                            {session ? (
                                <NavDropdown
                                    title="Dashboard"
                                    id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item href="/dashboard/">
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
                            ) : null}
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
                                            setShowState(true);
                                            // signOut({ callbackUrl: "/" });
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <Button
                                        onClick={() => {
                                            signIn();
                                        }}
                                    >
                                        Login
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Modal show={showState} onHide={() => setShowState(false)}>
                <SignOutModalBody showStateChanger={setShowState} />
            </Modal>
        </div>
    );
}
export default NavigationBar;
