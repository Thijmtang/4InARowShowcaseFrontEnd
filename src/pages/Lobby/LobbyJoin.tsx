import { useEffect, useState } from 'react'
import { FormCard } from '../../components/FormCard'
import { Button, Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSignalR } from '../../lib/context/SignalRContext';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  lobbycode: string,
};

export const LobbyJoin = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

  // const {user} = useAuth();
  const [action, setAction] = useState('');
  const navigate = useNavigate();
  const {connection, establishConnection} = useSignalR();
  useEffect(() => {
    establishConnection();
  },[]);


  useEffect(() => {
    connection?.on('RedirectLobby', (gameLobby: string) => {
        navigate('/lobby', {
          state: {
            gameLobby: JSON.parse(gameLobby),
          },
        })

    });
  }, [connection]);



  console.log(connection);


  // useEffect(() => {
  //   // connection.start().catch((err) => document.write(err));
  //   establishConnection();
  // },[]);
 
  // useEffect(() => {
  //   if(connection) {
  //     try {
  //       connection.start().then(() => {
  //         connection?.on("FlashAlert", (message:string, type:string) => {
  //           try {
  //             toast[type](message);
  //           } catch (error) {
  //             toast.error(standardErrorMessage);
  //           }
  //         });
      
  //         connection?.on("Send", (message:string, type:string) => {
  //           console.log(message);
  //         });

  //         connection?.on("RedirectToLobby", (message:string, type:string) => {
  //           console.log(message);
  //         });
        
  //       });
  //     } catch (error) {
        
  //     }
  //   }

  //   return () => {
  //     connection?.stop();
  //   };

    
  // },[connection]);

  // connection?.on("FlashAlert", (message:string, type:string) => {
  //   try {
  //     toast[type](message);
  //   } catch (error) {
  //     toast.error(standardErrorMessage);
  //   }
  // });

  // connection?.on("Send", (message:string, type:string) => {
  //   alert(message);
  // });


  const joinLobby = async (name: string) => {
    await connection?.send("JoinLobby", name);
  }

  const createLobby = async (name: string) => {
    await connection?.send("CreateLobby", name);
  }
  
  const onError = () => {
    toast.error("Lobby bestaat niet");
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
