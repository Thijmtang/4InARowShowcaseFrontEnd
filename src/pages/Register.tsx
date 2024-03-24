import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form";
import '../assets/Form.scss';
import { toast } from 'react-toastify';
import { register as registerAPI} from '../lib/services/AuthService';
import {updateToast} from '../lib/services/ToastService';
import { FormCard } from '../components/FormCard';

type Inputs = {
  email: string,
  password: string,
};

export const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [disableSubmit, setDisableSubmit] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    setDisableSubmit(true);

    const id = toast.loading("Een moment geduld...")


    try {
      await registerAPI(data.email,  data.password );

      updateToast(id, "Je account is succesvol aangemaakt",  'success', true);
      navigate("/login");
    } catch (error) {
      updateToast(id, "Je account kon niet aangemaakt worden, probeer het later opnieuw",  'error', true);
      setDisableSubmit(false);
    }
  };
  
  const onError = () => {
    toast.error("Vul alle velden correct in!");
  }

  return (
    <FormCard>
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
             isValid={ errors?.password === null} type="password" placeholder="Password"
            {...register("password", {
              required: true,
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/,
                message: "Het wachtwoord moet minimaal één kleine letter, één hoofdletter, één cijfer en één speciaal teken bevatten en minimaal zes tekens lang zijn"
              }}
            )}
            />

          {errors?.password && (
            <Form.Text className="text-danger">
              {errors?.password?.message}
            </Form.Text>
          )}
        </Form.Group>

      
        <Form.Group className='footer'> 

          <Button variant={"success" + (disableSubmit ? ' ' + 'disabled' : '')} type="submit">
            Account aanmaken
          </Button>

          <Link to="/login">Heb je al een account?</Link>

        </Form.Group>

      </Form>
  </FormCard>
  )
}
