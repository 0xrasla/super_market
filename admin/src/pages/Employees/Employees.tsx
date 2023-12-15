import { useMutation, useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import {
  Button,
  CloseButton,
  Collapse,
  Grid,
  Group,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { Icon } from "@iconify/react";
import { useForm } from "@mantine/form";
import { axios } from "../../config/Axios";
import _axios from "axios";
import { AxiosError } from "axios";
import { WarehouseTable } from "../../components/Warehouse/Datatable-Warehouse";

export function Employees() {
  const {
    data,
    isLoading,
    refetch: refetchEmployees,
  } = useQuery({
    queryKey: [""],
    queryFn: () =>
      axios("/employees/all", {}).then((res) => {
        return res.data;
      }),
  });

  const EmployeesAddMutation = useMutation({
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
    onSuccess: () => {
      handleToast({
        title: "Success",
        color: "green",
        message: "Category added successfully",
      });
      refetchEmployees();
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
      return axios(`/employees?id=${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      handleToast({
        title: "Success",
        color: "green",
        message: "employees deleted successfully",
      });
      refetchEmployees();
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

  const [productFormCount, setProductFormCount] = useState(0);
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

  const handleAdd = () => {
    if (form.validate().hasErrors) return;
    EmployeesAddMutation.mutate(form.values);
  };

  return (
    <div>
      <div className="w-full overflow-hidden">
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
                <div className="w-full flex">
                  <div className="p-8 border-2 h-fit border-solid border-gray-200 rounded-md ml-4 mt-4 flex gap-4 w-[40%] items-start">
                    <form
                      onSubmit={form.onSubmit(() => handleAdd())}
                      encType="multipart/form-data"
                    >
                      <div className="flex justify-between">
                        <div className="flex gap-1 items-center">
                          <Icon
                            className="cursor-pointer"
                            icon="ic:outline-arrow-back"
                            fontSize={24}
                            onClick={() => setShowForm(false)}
                          />
                          <Title
                            order={2}
                            size="h3"
                            className="font-poppins"
                            fw={700}
                            ta="start"
                          >
                            Add Ware House
                          </Title>
                        </div>

                        <div className="m-2">
                          <Button
                            className="bg-admin-dominant"
                            rightSection={<Icon icon="material-symbols:add" />}
                            onClick={() => {
                              setProductFormCount((e) => e + 1);
                            }}
                          >
                            Add Product
                          </Button>
                        </div>
                      </div>

                      <Grid>
                        <Grid.Col span={6}>
                          <TextInput
                            label="Name"
                            placeholder="employees Name"
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
                          loading={EmployeesAddMutation.isPending}
                          disabled={EmployeesAddMutation.isPending}
                        >
                          {EmployeesAddMutation.isPending
                            ? "Loading..."
                            : "Save employees"}
                        </Button>
                      </Group>
                    </form>
                  </div>

                  <Stack className="w-[40%] h-[calc(100vh-100px)] overflow-y-scroll hide-scroll">
                    {Array.from({ length: productFormCount }).map(
                      (_, index) => (
                        <div
                          key={index}
                          className="p-8 border-2 border-solid border-gray-200 rounded-md ml-4 mt-4 flex gap-4 items-start"
                        >
                          <form
                            onSubmit={form.onSubmit(() => handleAdd())}
                            encType="multipart/form-data"
                          >
                            <div className="flex justify-between">
                              <Title
                                order={2}
                                size="h3"
                                className="font-poppins"
                                fw={700}
                                ta="start"
                              >
                                Add Product ({index + 1})
                              </Title>

                              <div className="m-2 flex gap-2 items-center">
                                <CloseButton
                                  onClick={() => {
                                    setProductFormCount((e) => e - 1);
                                  }}
                                />
                              </div>
                            </div>

                            <Grid>
                              <Grid.Col span={6}>
                                <TextInput
                                  label="Name"
                                  placeholder="employees Name"
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

                            {/* <Group justify="start" mt="xl">
                        <Button
                          type="submit"
                          size="md"
                          variant="filled"
                          className="bg-admin-dominant text-white w-full"
                          leftSection={<Icon icon="material-symbols:add" />}
                          loading={EmployeesAddMutation.isPending}
                          disabled={EmployeesAddMutation.isPending}
                        >
                          {EmployeesAddMutation.isPending
                            ? "Loading..."
                            : "Add Product"}
                        </Button>
                      </Group> */}
                          </form>
                        </div>
                      )
                    )}
                  </Stack>

                  {/* {productFormCount > 0 && (
                <h3 className="px-8 py-4 font-bold font-poppins">
                  Products : {productFormCount}
                </h3>
              )} */}
                </div>
              </Collapse>
            ) : (
              <WarehouseTable
                data={data}
                categoryDeleteMutation={categoryDeleteMutation}
                isLoading={isLoading}
                setShowForm={setShowForm}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
