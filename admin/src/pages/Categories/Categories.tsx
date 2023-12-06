import { useMutation, useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import {
  Button,
  Checkbox,
  Collapse,
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

export function Categories() {
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

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
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
    },
    validate: {
      name: (value) => value.trim().length < 2,
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
        <Table.Td>
          <Checkbox
            aria-label="Select row"
            checked={selectedRows.includes(_data._id)}
            onChange={(event) =>
              setSelectedRows(
                event.currentTarget.checked
                  ? [...selectedRows, _data._id]
                  : selectedRows.filter((_id) => _id !== _data._id)
              )
            }
          />
        </Table.Td>
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
        <div className="flex items-start">
          <div className="shadow-lg p-4 border-2 border-solid border-gray-200 rounded-md ml-4 mt-4 w-[35%] flex gap-4 items-start">
            <Table className="">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th />
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows()}</Table.Tbody>
            </Table>
          </div>
          <img
            src="/icons/addicon.svg"
            alt=""
            className="cursor-pointer"
            onClick={() => setShowForm(!showForm)}
          />

          {showForm && (
            <Collapse
              in={showForm}
              transitionDuration={200}
              transitionTimingFunction="linear"
              className="p-6 shadow-xl"
            >
              <div className="p-4 rounded-md ml-4 mt-4 flex gap-4 items-start">
                <form
                  onSubmit={form.onSubmit(() => handleAdd())}
                  encType="multipart/form-data"
                >
                  <Title
                    order={2}
                    size="h1"
                    style={{
                      fontFamily: "Greycliff CF, var(--mantine-font-family)",
                    }}
                    fw={900}
                    ta="center"
                  >
                    Add Category
                  </Title>

                  <TextInput
                    label="Category Name"
                    placeholder="Category Name"
                    mt="md"
                    name="name"
                    variant="default"
                    {...form.getInputProps("name")}
                  />

                  <FileInput
                    rightSection={<Icon icon="material-symbols:add" />}
                    label="Upload Image"
                    placeholder="Upload image"
                    rightSectionPointerEvents="none"
                    mt="md"
                    accept="image/*"
                    onChange={(e) => {
                      form.setFieldValue("image", e);
                    }}
                  />

                  <Group justify="start" mt="xl">
                    <Button
                      type="submit"
                      size="md"
                      variant="filled"
                      className="bg-admin-dominant text-white"
                      leftSection={<Icon icon="material-symbols:add" />}
                      loading={categoryAddMutation.isPending}
                      disabled={categoryAddMutation.isPending}
                    >
                      {categoryAddMutation.isPending ? "Loading..." : "Create"}
                    </Button>

                    <Button
                      type="button"
                      size="md"
                      variant="filled"
                      className="bg-red-500 outline-none text-white"
                      leftSection={<Icon icon="material-symbols:close" />}
                      onClick={() => setShowForm(!showForm)}
                    >
                      Close
                    </Button>
                  </Group>
                </form>
              </div>
            </Collapse>
          )}
        </div>
      )}
    </div>
  );
}
