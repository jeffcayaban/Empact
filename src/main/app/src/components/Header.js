import React from 'react'

import { Link, withRouter } from 'react-router-dom';
import { NavDropdown, MenuItem, Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { ROLE_ADMIN, WEBSITE_NAME } from "../constants";

/**
 * Is the header that will be displayed on all pages of the website. It will provide the links to the main pages of the
 * system.
 */

class Header extends React.PureComponent {

    // Generates the link to the admin control panel.
    static generateAdminPanelMenuItem(isUserAdmin) {
        return isUserAdmin && (
            <LinkContainer to={`/admin-panel`}><MenuItem eventKey={1.1}>Control Panel</MenuItem></LinkContainer>
        );
    }

    generateUserSpecificActions() {
        const currentUser = this.props.currentUser;

        if (currentUser !== null && currentUser !== undefined && currentUser.authorities) {
            // User is logged in.

            const currentUserUsername = currentUser.username;
            const isUserAdmin = currentUser.authorities[0] === ROLE_ADMIN;
            return (
                <Nav pullRight>
                    <NavDropdown eventKey={1} title={currentUserUsername} id="basic-nav-dropdown">
                        { Header.generateAdminPanelMenuItem(isUserAdmin) }
                        <LinkContainer to={`/user/${currentUserUsername}`}>
                            <MenuItem eventKey={1.1}>Profile</MenuItem>
                        </LinkContainer>
                        <LinkContainer to='/settings'>
                            <MenuItem eventKey={1.2}>Settings</MenuItem>
                        </LinkContainer>
                        <MenuItem divider />
                        <MenuItem eventKey={1.3} onSelect={() => this.props.onLogout()}>Logout</MenuItem>
                    </NavDropdown>
                </Nav>
            )
        } else {
            // User is not logged in.
             return (
                <Nav pullRight>
                    <LinkContainer to='/login'>
                        <NavItem eventKey={1}>Login</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/register'>
                        <NavItem eventKey={2}>Register</NavItem>
                    </LinkContainer>
                </Nav>
            )
        }
    }

    render() {
        return (
            <Navbar id={"header"} collapseOnSelect fixedTop>
                <Navbar.Header>
                    <Navbar.Brand id={"navbar-brand"}><Link to='/'>{WEBSITE_NAME}</Link></Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to='/petition/create'>
                            <NavItem eventKey={1}>Create</NavItem>
                        </LinkContainer>
                        <LinkContainer to='/petitions'>
                            <NavItem eventKey={2}>Explore</NavItem>
                        </LinkContainer>
                        <LinkContainer to='/search'>
                            <NavItem eventKey={3}>Search</NavItem>
                        </LinkContainer>
                        <LinkContainer to='/help'>
                            <NavItem eventKey={4}>Help</NavItem>
                        </LinkContainer>
                    </Nav>
                    { this.generateUserSpecificActions() }
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(Header);
