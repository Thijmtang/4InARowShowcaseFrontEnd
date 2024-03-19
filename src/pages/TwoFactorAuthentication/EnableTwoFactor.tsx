import React, { useEffect, useState } from 'react'
import { FormCard } from '../../components/FormCard'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { standardErrorMessage, updateToast } from '../../lib/services/ToastService';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import {enableTwoFactorAuthentication, getTwoFactorSecretKey} from '../../lib/services/AuthService';
import QRCode from 'react-qr-code';
import '../../assets/TwoFactorAuthentication.scss'
import { useAuth } from '../../lib/context/AuthContext';

type Inputs = {
    VerificationToken: string,
  };
  
export const EnableTwoFactor = () => {
    const{refreshUser} = useAuth();
    const [disableSubmit, setDisableSubmit] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const navigate = useNavigate();

    const [twoFactorSecretKey, setTwoFactorSecretKey] = useState("");
    const [twoFactorQRCodeURI, settwoFactorQRCodeURI] = useState("");

    useEffect(() => {
        const fetchSecretKey = async () => {
            const response = await getTwoFactorSecretKey();
            const data = response.data;

            setTwoFactorSecretKey(data.secret);
            settwoFactorQRCodeURI(data.qrCodeURI);
        }
    
        try {
            fetchSecretKey();
        } catch (error) {
            toast.error(standardErrorMessage)
        }

    });

    const onSubmit: SubmitHandler<Inputs> = async (formData) => {
        setDisableSubmit(true);

        const id = toast.loading("Een moment geduld...")
        console.log(formData.VerificationToken);
        try {
            await enableTwoFactorAuthentication(formData.VerificationToken);
            await refreshUser();

            navigate("");
            updateToast(id, "2FA is succesvol geactiveerd",  'success', true);
            navigate("/login");
        } catch (error) {
            updateToast(id, "2FA kon niet geactiveerd worden, probeer het later nog eens!",  'error', true);
            setDisableSubmit(false);
        }
    };


  return (
    <FormCard>
        <h1>2FA inschakelen</h1>
        <h4>Stap 1</h4>
        <p>Scan de QR of voer handmatig de geheime code in uw gewenste authenticator app</p>

        <h4>Stap 2.</h4>
        <p>Voer de 6 digit code die verschijnt binnen uw authenticator</p>
        <div className='qr-container'>
            <QRCode
                size={256}
                value={twoFactorQRCodeURI}
                viewBox={`0 0 256 256`}
                />
            <p>{twoFactorSecretKey}</p>

        </div>

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
