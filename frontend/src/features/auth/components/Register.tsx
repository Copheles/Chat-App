import {
  Box,
  Button,
  Container,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegisterInput } from "../interfaces/AuthInterface";
import { RegisterInSchema } from "../schemas/AuthSchema";
import useRegisterMutation from "../hooks/useRegisterMutation";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterInput>({
    resolver: yupResolver(RegisterInSchema),
  });

  const mutation = useRegisterMutation();

  const onSubmit: SubmitHandler<IRegisterInput> = async (data) => {
    const authData = { ...data };

    mutation.mutate(authData);


  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "300px" }}>
        <Typography variant="h3" sx={{ marginBottom: "30px" }}>
          Join Today!
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            maxWidth: "100%",
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            type="text"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              },
            }}
            label="User"
            id="name"
            {...register("name")}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                ),
              },
            }}
            label="Email"
            id="email"
            {...register("email")}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
              },
            }}
            label="Password"
            type="password"
            id="password"
            {...register("password")}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />

          <Button variant="contained" type="submit">Register</Button>
          <Typography>
            Already have an account?{" "}
            <Link href="/login" sx={{ cursor: "pointer" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
