import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { FormCard } from '../../components/FormCard';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../lib/context/AuthContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { standardErrorMessage, updateErrorToast, updateToast } from '../../lib/services/ToastService';


type Inputs = {
    VerificationToken: string,
  };

export const TwoFactorLogin = () => {
    const location = useLocation();
    const locationState = (location.state as {email : string, password: string});

    const{login} = useAuth();
    const [disableSubmit, setDisableSubmit] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const navigate = useNavigate();

    const email = locationState?.email;
    const password = locationState?.password;

    if(!email || !password) {
        navigate('/login');
    }

    const onSubmit: SubmitHandler<Inputs> = async (formData) => {
        setDisableSubmit(true);

        const id = toast.loading("Een moment geduld...")
        console.log(formData.VerificationToken);
        try {

            await login(email, password, formData.VerificationToken);

            navigate("/");
            updateToast(id, "Succesvol ingelogd",  'success', true);

        } catch (error) {
            updateErrorToast(id);
            setDisableSubmit(false);
        }
    };


  return (
    <FormCard>
        <h1>2FA</h1>
     
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            </Form.Group>

            <Form.Group className='footer'>
            <Form.Label>Authenticatie code</Form.Label>
            <Form.Control type="text" placeholder="Authenticatie code" {...register("VerificationToken", {required:true })} maxLength={6}/>
                <Button variant={"success" + (disableSubmit ? ' ' + 'disabled' : '')} type="submit">
                    Verifiëren
                </Button>
        </Form.Group>
        </Form>
    </FormCard>
  )
}
