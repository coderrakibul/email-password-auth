import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from './firebase.init';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useState } from 'react';



const auth = getAuth(app)

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const handleNameBlur = (event) => {
    setName(event.target.vlaue);
  }

  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  }
  const handlePasswordBlur = (event) => {
    setPassword(event.target.value)
  }
  const handleRegisterCheck = (event) => {
    setRegistered(event.target.checked);
  }
  const handleFormSubmit = (event) => {

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (!/^(?=.*[0-9]).*$/.test(password)) {
      setError("Password should contain at least one character")
    }
    setValidated(true);
    setError("");

    if(registered){
      signInWithEmailAndPassword(auth, email, password)
      .then( result => {
        const user = result.user;
        console.log(user);
      })
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setEmail("");
        setPassword("");
        verifyEmail();
        setUserName();
      })
      .catch(error => {
        console.error(error);
        setError(error.message)
      })
    }
  
    event.preventDefault();
  }

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
    .then( () => {
      console.log("reset pass email sent")
    })
  }
  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
    .then(() => {
      console.log("updating name");
    })
    .catch(error => {
      setError(error.message)
    })
  }
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
    .then( () =>{
      console.log("email sent");
    }) 
  }
  return (
    <div>
      <div className="registration w-50 mx-auto mt-5">
        <h2 className='text-primary'>Please {registered ? "Login" : "Register"}</h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          { !registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name</Form.Label>
            <Form.Control onBlur={handleNameBlur} type="text" required placeholder="Enter Name" />
            <Form.Control.Feedback type="invalid">
              Please provide your name
            </Form.Control.Feedback>
          </Form.Group>}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" required placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" required placeholder="Password" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisterCheck} type="checkbox" label="Alredy Regestured?" />
          </Form.Group>
          <p className='text-danger'>{error}</p> <br />
          <Button onClick={handlePasswordReset} variant="link">Forget Password?</Button>
          <Button variant="primary" type="submit">
           {registered? "Login" : "Register"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
