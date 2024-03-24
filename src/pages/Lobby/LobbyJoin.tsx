import { useEffect, useState } from 'react'
import { FormCard } from '../../components/FormCard'
import { Button, Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSignalR } from '../../lib/context/SignalRContext';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  lobbycode: string,
};

export const LobbyJoin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  // const {user} = useAuth();
  const [action, setAction] = useState('');
  const navigate = useNavigate();
  const {connection, establishConnection} = useSignalR();

  useEffect(() => {
    establishConnection();
  }, []);


  connection?.on('RedirectLobby', (gameLobby: string) => {
      navigate('/lobby', {
        state: {
          gameLobby: JSON.parse(gameLobby),
        },
      })

  });

  const joinLobby = async (name: string) => {
    await connection?.send("JoinLobby", name);
  }

  const createLobby = async (name: string) => {
    await connection?.send("CreateLobby", name);
  }
  
  const onSubmit: SubmitHandler<Inputs> = async (formData: Inputs) => {
    if(action === 'join') {
        joinLobby(formData.lobbycode);
        return;
    }
    
    createLobby(formData.lobbycode);
  };

  return (
    <FormCard>
      <h1>Join een lobby</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Lobbycode</Form.Label>
          <Form.Control type="text" autoComplete="off" placeholder="Voer een lobbycode in" {...register("lobbycode", {required: true})} />
          {errors?.lobbycode && (
            <Form.Text className="text-danger" >
              {errors?.lobbycode?.message}
            </Form.Text>
          )}
        </Form.Group>
     
        <Form.Group className='footer'>
        <Button variant={'secondary'} type="submit" onClick={() => setAction('join')}>
            Join lobby
        </Button>
        <Button variant={"success"} type="submit" onClick={() => setAction('create')}>
            Aanmaken
        </Button>
        </Form.Group>
      </Form>   
       
    </FormCard>
  )
}
