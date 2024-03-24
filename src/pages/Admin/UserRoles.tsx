import { useEffect, useState } from "react";
import { FormCard } from "../../components/FormCard"
import { getRoles } from "../../lib/services/RolesApiService";
import { getUsers } from "../../lib/services/UserApiService";
import { Roles } from "../../lib/interfaces/Roles";
import { User } from "../../lib/interfaces/User";
import {  SubmitHandler, useForm } from "react-hook-form";
import { updateErrorToast, updateToast } from "../../lib/services/ToastService";
import { Button, Form } from "react-bootstrap";


type Inputs = {
  user: string,
  role: string,
};


export const UserRoles = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  
  const [users, setUsers] = useState<User[]>();
  const [roles, setRoles] = useState<Roles[]>();
  const [disableSubmit, setDisableSubmit] = useState(false);

  useEffect(() => {
    populateUsers();
    populateRoles();

  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    // setDisableSubmit(true);
    // const id = toast.loading("Een moment geduld...")


  };
  // Get users
  // get all possible roles


  // const getUsers = async () => {
  //   const response = await getUsers();
  //   console.log(response?.data);
  // }


  const populateRoles = async () => {
    const response = await getRoles();
    const data = await response.data;
    setRoles(data);
  }


  const populateUsers = async () => {
    const response = await getUsers();
    const data = await response.data;

    setUsers(data);
  }

  return (
    <>
      <FormCard>
      <h1>Beheren gebruikers</h1>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Gebruiker</Form.Label>
            <Form.Select aria-label="Default select example" {...register("user", {required: true})} >
              <option hidden={true} >Selecteer een gebruiker</option>
              {users?.map((user, index)=> {
                return <option value={user.id} key={index}>{user.email}</option>
              })}
 
            </Form.Select>

          </Form.Group>


          <Form.Group className='footer'>
          <Button variant={"success" + (disableSubmit ? ' ' + 'disabled' : '')} type="submit">
              Login
            </Button>

          </Form.Group>
        </Form>
      </FormCard>
    </>
   
  )
}
