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
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LogInSchema } from "../schemas/AuthSchema";
import { ILoginInput } from "../interfaces/AuthInterface";
import useLoginMutation from "../hooks/useLoginMutation";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>({
    resolver: yupResolver(LogInSchema),
  });

  const mutation = useLoginMutation();

  const onSubmit: SubmitHandler<ILoginInput> = async (data) => {
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
          Let's go
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
            {...register("password")}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            label="Password"
            type="password"
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
          <Typography>
            Don't have an account?{" "}
            <Link href="/register" sx={{ cursor: "pointer" }}>
              Register
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
