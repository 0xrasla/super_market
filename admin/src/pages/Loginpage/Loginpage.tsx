import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Stack,
  Box,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

export function Loginpage(props: PaperProps) {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
    },
  });

  const handleLogin = () => {
    if (
      form.values.email === "admin@gmail.com" &&
      form.values.password === "admin"
    ) {
      navigate("/dashboard");
    }
  };

  return (
    <Box className="w-screen h-screen flex justify-center items-center">
      <Paper radius="md" shadow="xl" p="xl" w={500} withBorder {...props}>
        <Text className="text-center font-bold text-3xl">Admin Login</Text>

        <form onSubmit={form.onSubmit(() => handleLogin())}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="admin@gmail.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Button type="submit" radius="xl">
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Box>
  );
}
