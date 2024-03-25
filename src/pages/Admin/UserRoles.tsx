import { useEffect, useState } from "react";
import { FormCard } from "../../components/FormCard"
import { getRoles, putRolesEdit } from "../../lib/services/RolesApiService";
import { getUsers } from "../../lib/services/UserApiService";
import { Roles } from "../../lib/interfaces/Roles";
import { User } from "../../lib/interfaces/User";
import {  SubmitHandler, useForm } from "react-hook-form";
import { standardErrorMessage, updateErrorToast, updateToast } from "../../lib/services/ToastService";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";


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
    const id = toast.loading("Een moment geduld...");

    const response = await putRolesEdit(formData.user, formData.role);

    const data = await response?.data;

    updateToast(id, "Gebruiker is succesvol aangepast", "success");
    

    if(data.status != 200) {
      updateErrorToast(id,standardErrorMessage );
      return;
    }


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

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Rol</Form.Label>
            <Form.Select aria-label="Default select example" {...register("role", {required: true})} >
              <option hidden={true} >Selecteer een gebruiker</option>
              {roles?.map((role, index)=> {
                return <option value={role.id} key={index}>{role.name}</option>
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
