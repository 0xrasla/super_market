import { useMutation, useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import {
  Button,
  Checkbox,
  Collapse,
  Grid,
  Group,
  Table,
  TextInput,
  Title,
} from "@mantine/core";
import { Icon } from "@iconify/react";
import { useForm } from "@mantine/form";
import { axios } from "../../config/Axios";
import _axios from "axios";
import { AxiosError } from "axios";
import { FileInput } from "@mantine/core";
import { API_URL } from "../../config/Constants";

export function Warehouse() {
  const {
    data,
    isLoading,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: [""],
    queryFn: () =>
      axios("/categories/all", {}).then((res) => {
        return res.data;
      }),
  });

  const categoryAddMutation = useMutation({
    mutationFn: (values: any) => {
      let formData = new FormData();

      formData.append("name", values.name);

      if (values.image) {
        formData.append("image", values.image);
      }

      return axios.post("/categories/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (e: any) => {
      handleToast({
        title: "Success",
        color: "green",
        message: "Category added successfully",
      });
      refetchCategories();
      form.reset();
      setShowForm(false);
    },
    onError: (e: any) => {
      console.log("Error");
      const data: any = e.response?.data;
      handleToast({
        title: "Error",
        color: "red",
        message: data?.message || "Something went wrong",
      });
      setShowForm(true);
    },
  });

  const categoryDeleteMutation = useMutation({
    mutationFn: (id: any) => {
      return axios(`/categories?id=${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: (e: any) => {
      handleToast({
        title: "Success",
        color: "green",
        message: "Category deleted successfully",
      });
      refetchCategories();
    },
    onError: (e: AxiosError) => {
      const data: any = e.response?.data;
      handleToast({
        title: "Error",
        color: "red",
        message: data?.message || "Something went wrong",
      });
    },
  });

  const [selectedRows] = useState<number[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleToast = ({
    title,
    message,
    color = "green",
  }: {
    title: string;
    message: string;
    color?: "red" | "green";
  }) => {
    return notifications.show({
      title: title,
      message: message,
      color: color,
    });
  };

  const form = useForm({
    initialValues: {
      name: "",
      managername: "",
      location: "",
      mobile: "",
      city: "",
      address: "",
    },
    validate: {
      name: (value) => value.trim().length < 2,
      managername: (value) => value.trim().length < 2,
      location: (value) => value.trim().length < 2,
      mobile: (value) => !/^\d+$/.test(value) || value.length <= 10,
      city: (value) => value.trim().length < 2,
      address: (value) => value.trim().length < 2,
    },
  });

  const rows = () => {
    if (isLoading) return [];
    return data?.data.map((_data: any) => (
      <Table.Tr
        key={_data.name}
        bg={
          selectedRows.includes(_data._id)
            ? "var(--mantine-color-blue-light)"
            : undefined
        }
      >
        <Table.Td className="flex gap-2 items-center">
          <img
            src={API_URL + "/files/view?path=" + _data.image}
            alt=""
            className="cursor-pointer w-10 h-10 rounded-md"
            crossOrigin="anonymous"
          />
          {_data.name}
        </Table.Td>
        <Table.Td>
          {" "}
          <img
            src="/icons/deleteicon.svg"
            alt=""
            className="cursor-pointer"
            onClick={() => categoryDeleteMutation.mutate(_data._id)}
          />
        </Table.Td>
      </Table.Tr>
    ));
  };

  const handleAdd = () => {
    if (form.validate().hasErrors) return;
    categoryAddMutation.mutate(form.values);
  };

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <div>
          {showForm ? (
            <Collapse
              in={showForm}
              transitionDuration={200}
              transitionTimingFunction="linear"
            >
              <div className="p-8 border-2 border-solid border-gray-200 rounded-md ml-4 mt-4 flex gap-4 w-[50%] items-start">
                <form
                  onSubmit={form.onSubmit(() => handleAdd())}
                  encType="multipart/form-data"
                >
                  <Title
                    order={2}
                    size="h3"
                    className="font-poppins"
                    fw={700}
                    ta="start"
                  >
                    Add Ware House
                  </Title>
                  <Grid>
                    <Grid.Col span={6}>
                      <TextInput
                        label="Name"
                        placeholder="Warehouse Name"
                        mt="md"
                        name="name"
                        variant="default"
                        {...form.getInputProps("name")}
                      />
                    </Grid.Col>

                    <Grid.Col span={6}>
                      <TextInput
                        label="Manager Name"
                        placeholder="Manager Name"
                        mt="md"
                        name="managername"
                        variant="default"
                        {...form.getInputProps("managername")}
                      />
                    </Grid.Col>

                    <Grid.Col span={6}>
                      <TextInput
                        label="Location"
                        placeholder="Lat/Long"
                        mt="md"
                        name="location"
                        variant="default"
                        {...form.getInputProps("location")}
                      />
                    </Grid.Col>

                    <Grid.Col span={6}>
                      <TextInput
                        label="Mobile Number"
                        placeholder="+91 XXXXXXXXXX"
                        mt="md"
                        name="mobile"
                        variant="default"
                        {...form.getInputProps("mobile")}
                      />
                    </Grid.Col>

                    <Grid.Col span={6}>
                      <TextInput
                        label="City"
                        placeholder="Nagercoil"
                        mt="md"
                        name="city"
                        variant="default"
                        {...form.getInputProps("city")}
                      />
                    </Grid.Col>

                    <Grid.Col span={6}>
                      <TextInput
                        label="Address"
                        placeholder="Address"
                        mt="md"
                        name="address"
                        variant="default"
                        {...form.getInputProps("address")}
                      />
                    </Grid.Col>
                  </Grid>

                  <Group justify="start" mt="xl">
                    <Button
                      type="submit"
                      size="md"
                      variant="filled"
                      className="bg-admin-dominant text-white w-full"
                      leftSection={<Icon icon="material-symbols:add" />}
                      loading={categoryAddMutation.isPending}
                      disabled={categoryAddMutation.isPending}
                    >
                      {categoryAddMutation.isPending
                        ? "Loading..."
                        : "Save Warehouse"}
                    </Button>
                  </Group>
                </form>
              </div>
            </Collapse>
          ) : (
            <Collapse
              in={!showForm}
              transitionDuration={400}
              transitionTimingFunction="linear"
            >
              <div className="p-8 border-2 border-solid border-gray-200 rounded-md ml-4 mt-4 flex gap-4 w-[97%] items-start">
                <div className="flex flex-col w-full">
                  <div className="flex justify-between m-2">
                    <h2 className="capitalize font-medium text-lg">
                      Warehouse List
                    </h2>
                    <Button className="bg-red-600">Report</Button>
                  </div>

                  <div className="m-2">
                    <Button
                      className="bg-admin-dominant"
                      rightSection={<Icon icon="material-symbols:add" />}
                      onClick={() => setShowForm(true)}
                    >
                      Create New
                    </Button>
                  </div>

                  <Table className="w-full">
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Warehouse</Table.Th>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Phone No</Table.Th>
                        <Table.Th>City</Table.Th>
                        <Table.Th>Location</Table.Th>
                        <Table.Th>Address</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows()}</Table.Tbody>
                  </Table>
                </div>
              </div>
            </Collapse>
          )}
        </div>
      )}
    </div>
  );
}
