import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import "../assets/Form.scss";
import { toast } from "react-toastify";
import { useAuth } from "../lib/context/AuthContext"; // Assuming you export AuthContext from AuthContext.tsx
import { updateErrorToast, updateToast } from "../lib/services/ToastService";
import { FormCard } from "../components/FormCard";
import { AxiosError } from "axios";

type Inputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { login } = useAuth();
  const [disableSubmit, setDisableSubmit] = useState(false);
  const navigate = useNavigate();

  // if(user) {
  //   return <Navigate replace to="/" />;
  // }

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setDisableSubmit(true);
    const id = toast.loading("Een moment geduld...");

    try {
      await login(formData.email, formData.password, "");

      updateToast(id, "Succesvol ingelogd", "success", true);
    } catch (error) {
      const err = error as AxiosError;

      const details = (err?.response?.data as { detail?: string })?.detail;
      // Logged in, but requires 2FA
      if (details === "RequiresTwoFactor") {
        navigate("/2fa/verify", {
          state: {
            email: formData.email,
            password: formData.password,
          },
        });
        // (<TwoFactorLogin />);

        toast.dismiss(id);
        return;
      }

      updateErrorToast(id);
    }

    setDisableSubmit(false);
  };

  const onError = () => {
    toast.error("Vul alle velden in!");
  };

  return (
    <FormCard>
      <h1 data-cy="input-title">Login</h1>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", { required: true })}
            data-cy="input-email"
          />
          {errors?.email && (
            <Form.Text className="text-danger">
              {errors?.email?.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            data-cy="input-password"
          />
          {errors?.email && (
            <Form.Text className="text-danger">
              {errors?.password?.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="footer">
          <Button
            variant={"success" + (disableSubmit ? " " + "disabled" : "")}
            type="submit"
            data-cy="submit"
          >
            Login
          </Button>

          <Link to="/register" data-cy="link-register">
            Nog geen account?
          </Link>
        </Form.Group>
      </Form>
    </FormCard>
  );
};
