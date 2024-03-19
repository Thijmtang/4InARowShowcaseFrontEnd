import React from 'react'
import { FormCard } from '../components/FormCard'
import { Button, Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as signalR from "@microsoft/signalr";
import { useAuth } from '../lib/context/AuthContext';

type Inputs = {
  lobbycode: string,
};

export const Lobby = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const {user} = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async () => {

    const id = toast.loading("Een moment geduld...")
    // send();
  };

  const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7161/hub")
  .build();

  connection.start().catch((err) => document.write(err));


  connection.on("ReceiveMessage", (username: string, message: string) => {
  console.log(message);
  // const m = document.createElement("div");

  // m.innerHTML = `<div class="message-author">${username}</div><div>${message}</div>`;

  // divMessages.appendChild(m);
  // divMessages.scrollTop = divMessages.scrollHeight;
  });



  function send() {
    connection.send("SendMessage", user.username, user.username);
  };

  
  const onError = () => {
    send();
    toast.error("Lobby bestaat niet");
  }


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
        <Button variant={'secondary'} type="submit">
            Join lobby
        </Button>
        <Button variant={"success"} type="submit">
            Aanmaken
        </Button>
        </Form.Group>
      </Form>    </FormCard>
  )
}
