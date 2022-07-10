import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

// Authentication
import { signIn, signUp } from "../redux/features/auth/authActions";

import { styled } from "@mui/material/styles";

import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Button from "../components/Button";
import Input from "../components/Form/Input";
import Spinner from "../components/Spinner";

// Form validation
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Wrapper = styled("div")({
  textAlign: "center",
  boxShadow:
    "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
  borderRadius: "5px",
  padding: "30px",
  maxWidth: "500px",
  margin: "15px",
});

// Yup schema for form validation
const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required("Email is required")
    .matches(
      /* eslint-disable no-useless-escape */
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email address is not valid."
    ),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

const Login = () => {
  // Show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check if loading spinner is active
  const isLoading = useSelector((state) => state.auth.isLoading);
  const user = useSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(validationSchema),
  });

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Submit login form
  const submitForm = async (formData) => {
    const email = formData.email;
    const password = formData.password;

    {
      isLoginForm
        ? dispatch(signIn(email, password))
        : dispatch(signUp(email, password));
    }

    // Redirect to locations page if user is authenticated
    {
      user && navigate("/locations");
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
          {isLoginForm ? "Sign In" : "Sign Up"}
        </Typography>
        <Input
          {...register("email")}
          type="email"
          label="Email"
          placeholder="Email"
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <Input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Password"
          error={!!errors.password}
          helperText={errors?.password?.message}
          InputProps={{
            endAdornment: (
              <Tooltip title="Show/hide password">
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handlePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              </Tooltip>
            ),
          }}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoginForm ? "Sign In" : "Sign Up"}
        </Button>
        {isLoading ? <Spinner /> : null}
      </form>
      {isLoginForm ? (
        <Typography variant="body2" marginTop={1}>
          Don't have an account? Sign Up{" "}
          <Link
            component="button"
            variant="body2"
            underline="none"
            onClick={() => setIsLoginForm(false)}
          >
            here
          </Link>
          .
        </Typography>
      ) : (
        <Typography variant="body2" marginTop={1}>
          Already have an account? Sign In{" "}
          <Link
            component="button"
            variant="body2"
            underline="none"
            onClick={() => setIsLoginForm(true)}
          >
            here
          </Link>
          .
        </Typography>
      )}
    </Wrapper>
  );
};

export default Login;
