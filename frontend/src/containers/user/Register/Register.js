import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { REGISTER_USER } from '../../../documents/user';

const RegisterContainer = styled.div`
  width: 100%;
  border: 1px solid red;
  display: flex;
  justify-content: center;

  form {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 50%;
    min-height: 200px;
    max-height: 25%;
    border: 1px solid lightgrey;
    border-radius: 10px;
    padding: 2% 2%;
    margin-top: 20%;
  }
  .input_wrapper {
    flex: 1;
    display: flex;
    padding: 1% 1%;

    & > * {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    & > input {
      padding: 1px 10px;
    }
  }
  .button_wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
    margin-top: 10px;

    & > button {
      width: 30%;
      outline: none;
      border-radius: 5px;
      border: 1px solid lightgray;
    }
  }
`;

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: ({ register }) => {
      console.log(register);
    },
  });

  if (loading) return <div>Loading....</div>;

  function onChangeHandler({ target: { name, value } }) {
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    else setUsername(value);
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    registerUser({ variables: { email, password, username } });
    setEmail('');
    setPassword('');
    setUsername('');
  }

  return (
    <RegisterContainer>
      <form>
        <div className="input_wrapper">
          <div>Email</div>
          <input name="email" type="text" value={email} onChange={onChangeHandler} />
        </div>
        <div className="input_wrapper">
          <div>Password</div>
          <input name="password" type="password" value={password} onChange={onChangeHandler} />
        </div>
        <div className="input_wrapper">
          <div>Username:</div>
          <input name="username" type="text" value={username} onChange={onChangeHandler} />
        </div>
        <div className="button_wrapper">
          <button type="button" onClick={onSubmitHandler}>
            Submit
          </button>
        </div>
      </form>
    </RegisterContainer>
  );
};

export default Register;
