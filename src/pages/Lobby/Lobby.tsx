import React from 'react'
import { FormCard } from '../../components/FormCard'
import { Button, Form } from 'react-bootstrap'
import signalR from '@microsoft/signalr';

interface Props {
    connection: signalR.HubConnection;
}
export const Lobby = () => {

  return (
    <FormCard> 
        <h1>Lobby: {}</h1>
  

        <Form.Group className='footer'>
        <Button variant={"success"} type="submit" onClick={() => setAction('create')}>
            Start
        </Button>
        </Form.Group>        
    </FormCard>
  )
}
