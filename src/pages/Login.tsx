import React, { useMemo, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form";
import '../assets/Form.scss';
import { toast } from 'react-toastify';
import { useAuth } from '../lib/context/AuthContext'; // Assuming you export AuthContext from AuthContext.tsx
import { updateErrorToast, updateToast } from '../lib/services/ToastService';
import { FormCard } from '../components/FormCard';

type Inputs = {
  email: string,
  twoFactorAuthcode: string,
  password: string,
};

export const Login = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const { login, user, logout, loggedIn} = useAuth();
  const [disableSubmit, setDisableSubmit] = useState(false);
  const navigate = useNavigate();

  if(user) {
    // return <Navigate replace to="/enable2FA" />;
    return <Navigate replace to="/" />;
  }

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {

    const id = toast.loading("Een moment geduld...")

    try {
      await login(formData.email, formData.password, formData.twoFactorAuthcode);


      updateToast(id, "Succesvol ingelogd",  'success', true);

 

    } catch(err) {
      updateErrorToast(id);
    }
  };

  const onError = () => {

    toast.error("");
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


        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Verification code</Form.Label>
          <Form.Control type="text" placeholder="Authenticatie code" {...register("twoFactorAuthcode", {required:true })} maxLength={6}/>
          {errors?.twoFactorAuthcode && (
            <Form.Text className="text-danger">
              {errors?.twoFactorAuthcode?.message}
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