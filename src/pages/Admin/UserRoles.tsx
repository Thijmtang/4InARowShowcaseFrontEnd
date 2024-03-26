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
import { AxiosError } from "axios";
import { useAuth } from "../../lib/context/AuthContext";
import { useNavItem } from "@restart/ui/NavItem";
import { useNavigate } from "react-router";


type Inputs = {
  user: string,
  role: string,
};


export const UserRoles = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const navigate = useNavigate();
  

  const [users, setUsers] = useState<User[]>();
  const [roles, setRoles] = useState<Roles[]>();
  const [disableSubmit, setDisableSubmit] = useState(false);

  useEffect(() => {
    try {
      populateUsers();
      populateRoles();
    } catch (error) {
      navigate('/');
    }
 

  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setDisableSubmit(true);
    const id = toast.loading("Een moment geduld...");

    try {
      const response = await putRolesEdit(formData.user, formData.role);

      const data = await response?.data;

      if(response.status != 200) {
        updateErrorToast(id,standardErrorMessage );
        return;
      }
      updateToast(id, "Gebruiker is succesvol aangepast", "success");
    } catch (error) {

        const err = error as AxiosError;
        
        const msg = err?.response?.data;
        updateErrorToast(id, msg); 
    }

    setDisableSubmit(false)
  };

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
                return <option value={role.name} key={index}>{role.name}</option>
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
