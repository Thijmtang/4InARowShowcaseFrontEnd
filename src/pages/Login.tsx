import React, { useMemo, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form";
import '../assets/Form.scss';
import { toast } from 'react-toastify';
import { useAuth } from '../lib/context/AuthContext'; // Assuming you export AuthContext from AuthContext.tsx
import { updateErrorToast, updateToast } from '../lib/services/ToastService';
import { FormCard } from '../components/FormCard';
import ArgumentError from '../lib/errors/ArgumentError';
import { TwoFactorLogin } from './TwoFactorAuthentication/TwoFactorLogin';

type Inputs = {
  email: string,
  password: string,
};

export const Login = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const { login, user, logout, loggedIn} = useAuth();
  const [disableSubmit, setDisableSubmit] = useState(false);
  const navigate = useNavigate();

  // if(user) {
  //   return <Navigate replace to="/" />;
  // }

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {

    const id = toast.loading("Een moment geduld...")

    try {
      await login(formData.email, formData.password);


      updateToast(id, "Succesvol ingelogd",  'success', true);

    } catch(err) {
      const details = err.response.data.detail;

      // Logged in, but requires 2FA
      if(details === 'RequiresTwoFactor') {
        navigate('/2fa/verify', {state: {
          email: formData.email,
          password: formData.password,
        }});
        // (<TwoFactorLogin />);

          toast.dismiss(id);
        return;
      }

      updateErrorToast(id);
    }
  };

  const onError = () => {
    toast.error("Vul alle velden in!");
  }
  

  return (
    <FormCard>
  
      <h1>Login</h1>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" {...register("email", {required: true})}/>
          {errors?.email && (
            <Form.Text className="text-danger">
              {errors?.email?.message}
            </Form.Text>
          )}
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" {...register("password", {required: true})}/>
          {errors?.email && (
            <Form.Text className="text-danger">
              {errors?.password?.message}
            </Form.Text>
          )}
          
        </Form.Group>

        <Form.Group className='footer'>
        <Button variant={"success" + (disableSubmit ? ' ' + 'disabled' : '')} type="submit">
            Login
          </Button>

          <Link to="/register">Nog geen account?</Link>
        </Form.Group>
      </Form>
    </FormCard>
  )
}
