import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Button, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../auth/firebase";
import Logo from "../components/Logo";
import Theme from "../components/Theme";

const Layout = () => {
	return (
		<Container fluid>
			<Row>
				<Col></Col>
				<Navbar
					bg="light"
					variant="light"
					data-bs-theme="light"
				>
					<Container className="justify-content-end">
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav>
								<LinkContainer to="/">
									<Logo />
								</LinkContainer>
								<LinkContainer to="/landing">
									<Nav.Link>Home</Nav.Link>
								</LinkContainer>
								<LinkContainer to="/countries">
									<Nav.Link>Countries</Nav.Link>
								</LinkContainer>
								<LinkContainer to="/favourities">
									<Nav.Link>Favourites</Nav.Link>
								</LinkContainer>
							</Nav>
						</Navbar.Collapse>
						<Navbar.Collapse id="basic-navbar-nav">
							<Theme />
						</Navbar.Collapse>
						<Button onClick={() => logout()}>signOut</Button>
					</Container>
				</Navbar>
			</Row>
			<Row>
				<Outlet />
			</Row>
		</Container>
	);
};

export default Layout;
