import React, { useContext, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form";
import '../../assets/Form.scss';
import { toast } from 'react-toastify';
import { useAuth } from '../../lib/context/AuthContext'; // Assuming you export AuthContext from AuthContext.tsx
import { Exception } from 'sass';

type Inputs = {
  email: string,
  password: string,
};

export const Login = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const { login, user, loggedIn} = useAuth();

  if(loggedIn) {
    return <Navigate replace to="/home" />;
  }

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      await login(formData.email, formData.password);
      // const data = await response.data;
      // console.log(data);
      // if(response.status === 200) {

        // login(data);
        toast.success("Succesvol ingelogd");
        
      
    } catch(err) {
      console.log(err);
        toast.error("Er is iets fout gegaan, probeer het later opnieuw!");
    }
  };

  const onError = () => {
    toast.error("Vul alle velden correct in!");
  }
  

  return (
    <div className='form-container'>
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
          <Link to="/register">Nog geen account?</Link>

          <Button variant="success" type="submit">
            Login
          </Button>
        </Form.Group>

      </Form>
    </div>
  )
}
