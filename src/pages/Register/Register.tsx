import React, { useEffect, useState } from 'react'
import { Button, Form, Toast } from 'react-bootstrap'
import { Link, Navigate, redirect } from 'react-router-dom'
import { useForm, SubmitHandler, FieldError, FieldErrors } from "react-hook-form";
import '../../assets/Form.scss';
import { toast } from 'react-toastify';

type Inputs = {
  email: string,
  password: string,
};

export const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);

    // return <Navigate to={"/login"} />;  

    toast.success("Je account is succesvol aangemaakt");
    toast.error("Je account kon niet aangekomt worden, probeer het later opnieuw!");
  };
  

  const onError = () => {
    toast.error("Vul alle velden correct in!");
  }




  return (
    <div className='form-container'>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" {...register("email", {required:true })}/>
          {errors?.email && (
            <Form.Text className="text-danger">
              {errors?.email?.message}
            </Form.Text>
          )}

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          isValid={ errors?.password === null}
          type="password" placeholder="Password"
           {...register("password", {
            required: true,
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/,
              message: "Het wachtwoord moet minimaal één kleine letter, één hoofdletter, één cijfer en één speciaal teken bevatten en minimaal zes tekens lang zijn"
            }
            })}/>
    
        </Form.Group>

      
        <Form.Group className='footer'> 
          <Link to="/login">Heb je al een account?</Link>

          <Button variant="success" type="submit">
            Login
          </Button>
        </Form.Group>

      </Form>
    </div>
  )
}
