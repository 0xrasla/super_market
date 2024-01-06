import { notifications } from "@mantine/notifications";

export const API_URL = "http://localhost:4001/api";

//toast message
export const handleToast = ({
  title,
  message,
  color = "green",
}: {
  title: string;
  message: string;
  color?: "red" | "green";
  icon?: string;
}) => {
  return notifications.show({
    title: title,
    message: message,
    color: color,
    radius: "lg",
  });
};
