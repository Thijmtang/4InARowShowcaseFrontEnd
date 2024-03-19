import React, { useState } from 'react'
import { FormCard } from '../components/FormCard'
import { Button, Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as signalR from "@microsoft/signalr";
import { useAuth } from '../lib/context/AuthContext';
import { standardErrorMessage } from '../lib/services/ToastService';

type Inputs = {
  lobbycode: string,
};

export const Lobby = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const {user} = useAuth();
  const [action, setAction] = useState('');
  
  const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7161/hub")
  .build();

  connection.start().catch((err) => document.write(err));



  connection.on("FlashAlert", (message: string, type: string) => {
    try {
        toast[type](message);
    } catch (error) {
      toast.error(standardErrorMessage);
    }
  });

  connection.on("Send", (message: string) => {
    try {
      console.log(message);
    } catch (error) {
      toast.error(standardErrorMessage);
    }
  });

  const joinLobby = async (name: string) => {
    await connection.send("JoinLobby", name);
  }

  const createLobby = async (name: string) => {
    await connection.send("CreateLobby", name);
  }
  
  const onError = () => {
    // send();
    toast.error("Lobby bestaat niet");

    joinLobby();

  }

  const onSubmit: SubmitHandler<Inputs> = async (formData: Inputs) => {
    if(action === 'join') {
        joinLobby(formData.lobbycode);
        return;
    }

    createLobby(formData.lobbycode);

    // const id = toast.loading("Een moment geduld...")
    // send();
  };


  return (
    <FormCard>
      <h1>Join een lobby</h1>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Lobbycode</Form.Label>
          <Form.Control type="text" placeholder="Voer een lobbycode in" {...register("lobbycode", {required: true})}/>
          {errors?.lobbycode && (
            <Form.Text className="text-danger">
              {errors?.lobbycode?.message}
            </Form.Text>
          )}
        </Form.Group>
     
        <Form.Group className='footer'>
        <Button variant={'secondary'} type="submit" onClick={ () => setAction('join') }>
            Join lobby
        </Button>
        <Button variant={"success"} type="submit" onClick={ () => setAction('create') }>
            Aanmaken
        </Button>
        </Form.Group>
      </Form>   
       
    </FormCard>
  )
}
