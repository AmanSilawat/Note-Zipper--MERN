import React from 'react';
import { Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../actions/userActions';

const Header = ({ set_search }) => {
    const history = useHistory();

    const dispatch = useDispatch();
    const { user_info } = useSelector((state) => state.user_login);

    const handler_logout = () => {
        dispatch(logout())
        history.push('/')
    }
    return (
        <Navbar bg="primary" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand>
                    <Link to="/">Note Zipper</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="m-auto">
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="mr-2"
                                aria-label="Search"
                                onChange={(e) => set_search(e.target.value)}
                            />
                        </Form>
                    </Nav>
                    <Nav
                        className="my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {user_info ? (
                            <>
                                <Nav.Link href="/mynotes">My Notes</Nav.Link>
                                <NavDropdown
                                    title={`${user_info.name}`}
                                    id="collasible-nav-dropdown"
                                >
                                    <NavDropdown.Item href="/profile">
                                        My Profile
                                    </NavDropdown.Item>

                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handler_logout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <Nav.Link href="/login">Login</Nav.Link>
                        )}
                        {/* <Nav.Link>
                            <Link to="mynotes">My Note</Link>
                        </Nav.Link>
                        <NavDropdown title={user_info?.name} id="">
                            <NavDropdown.Item href="#action3">My Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handler_logout}>Logout</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
