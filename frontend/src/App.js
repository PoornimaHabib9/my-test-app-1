import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from "react-bootstrap/Navbar";
import { Nav } from 'react-bootstrap';
import Routers from './Routers';
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from './lib/contextLib';
import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router';

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [isAuthenticated, userHasAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    try {
      await Auth.currentSession()
      userHasAuthenticated(true)
    } catch (e) {
      userHasAuthenticated(false)
    }
    setIsAuthenticating(false)
  }

  return (
    (!isAuthenticating && <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            Scratch
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            {isAuthenticated ? (
              <>
                <LinkContainer to="/list">
                  <Nav.Link >Courses</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/addCourse">
                  <Nav.Link>Add/Update Course</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
              </>
            ) :
              (<>
                <LinkContainer to="/signup">
                  <Nav.Link >Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </>
              )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routers />
      </AppContext.Provider>
    </div>
    )
  );

  async function handleLogout() {
    await Auth.signOut()
    userHasAuthenticated(false)
    navigate("/login")
  }
}

export default App;
