import { useRef } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { useAppDispatch } from '../../app/hooks';
import { getToken } from './token.api';
import { getUser } from './Login.api';
import { login } from './authSlice';
import { updateUser } from './userSlice';
import { useHistory } from 'react-router-dom';

export let util = {loginAccount: (event: any) => {}};

export default function Login() {

  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  // Verifying login credentials through firebase, alerting with error message coming from Firebase
  util.loginAccount = async (event: any) => {
    event.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {

      const email: string = emailRef.current.value;
      const password: string = passwordRef.current.value;

      try {
        const tokenObj = await getToken(email, password);
        dispatch(login(tokenObj.token));

      } catch (err) {
        console.log(err);
      }

      try {
        const userObj = await getUser();
        // const userObj = {
        //   id: "123445",
        //   email
        // };
        dispatch(updateUser(userObj));
        history.push("/feed");

      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="loginRow">
        <Col>
          <h2>Login</h2>
          <div id="loginDiv" className="d-flex">
            <Card id="loginCard">
              <Card.Body>
                <Form id="inputLogin">
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required autoFocus />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                  </Form.Group>
                  <Button data-testid="submitButton" className="w-100 mt-2" type="submit" onClick={(event) => util.loginAccount(event)}>Login</Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
