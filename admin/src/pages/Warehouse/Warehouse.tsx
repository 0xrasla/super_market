import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Button,
  CloseButton,
  Collapse,
  Grid,
  Group,
  NativeSelect,
  NumberInput,
  Paper,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { Icon } from "@iconify/react";
import { useForm } from "@mantine/form";
import { axios } from "../../config/Axios";
import _axios from "axios";
import { handleToast } from "../../config/Constants";
import { WarehouseTable } from "../../components/Warehouse/Datatable-Warehouse";

export function Warehouse() {
  //pagination
  const [page, setPage] = useState(1);
  console.log("page", page);
  const {
    data,
    isLoading,
    refetch: refetchWarehouse,
  } = useQuery({
    queryKey: ["", page],
    queryFn: () =>
      axios(`/warehouse/all?page=${page}&limit=${10}`, {}).then((res) => {
        return res.data;
      }),
  });

  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ["category"],
    queryFn: () =>
      axios("/categories/all", {}).then((res) => {
        return res.data;
      }),
  });
  const [isEdit, setIsEdit] = useState(false);
  const [dataId, setDataId] = useState("");

  const warehouseAddMutation = useMutation({
    mutationFn: async (_data: any) => {
      try {
        console.log(isEdit, "booomer");
        console.log(_data);

        let warehouseData;

        if (isEdit) {
          const response = await axios(`/warehouse?id=${dataId}`);
          warehouseData = response.data.data;

          if (warehouseData) {
            form.setValues({
              name: warehouseData.name,
              address: warehouseData.address,
              city: warehouseData.city,
              location: warehouseData.location,
              managername: warehouseData.managername,
              mobilenumber: warehouseData.mobilenumber,
            });
          }
        }

        const updateResponse = isEdit
          ? await axios.patch(`/warehouse?id=${warehouseData._id}`, _data, {})
          : await axios.post("/warehouse/add", _data, {});

        console.log(updateResponse);
        return updateResponse.data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (e: any) => {
      console.log("Success", e.ok);
      if (e.ok === true) {
        handleToast({
          title: "Success",
          color: "green",
          message: isEdit
            ? "Warehouse updated successfully"
            : "Warehouse added successfully",
        });
      }
      refetchWarehouse();
    },
    onError: (e: any) => {
      console.log("Error", e);
      const data: any = e.response?.data;
      handleToast({
        title: "Error",
        color: "red",
        message: data?.message || "Something went wrong",
      });
    },
  });

  const warehouseDeleteMutation = useMutation({
    mutationFn: (id: any) => {
      return axios.delete(`/warehouse?id=${id}`);
    },
    onSuccess: () => {
      handleToast({
        title: "Success",
        color: "green",
        message: "Warehouse deleted successfully",
      });
      refetchWarehouse();
    },
    onError: (e: any) => {
      const data: any = e.response?.data;
      handleToast({
        title: "Error",
        color: "red",
        message: data?.message || "Something went wrong",
      });
    },
  });

  const [showForm, setShowForm] = useState(false);

  const productForm = {
    lotNumber: 0,
    rackNumber: "",
    productName: "",
    category: "",
    quantity: 0,
    price: 0,
    discount: 0,
    gst: "",
  };

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      managername: "",
      location: "",
      mobilenumber: "",
      city: "",
      address: "",
      products: [],
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? "Invalid name" : null),
      managername: (value) =>
        value.trim().length < 2 ? "Invalid manager name" : null,
      location: (value) =>
        value.trim().length < 2 ? "Invalid location" : null,
      mobilenumber: (value) =>
        value.toString().trim().length < 10 ||
        value.toString().trim().length > 10
          ? "Invalid mobile number"
          : null,
      city: (value) => (value.trim().length < 2 ? "Invalid city" : null),
      address: (value) => (value.trim().length < 2 ? "Invalid address" : null),
      products: (value: any) => {
        if (value.length > 0) {
          if (value[0].lotNumber == "") {
            return "Invalid lot number";
          }

          if (value[0].rackNumber == "") {
            return "Invalid rack number";
          }

          if (value[0].productName == "") {
            return "Invalid product name";
          }

          if (value[0].quantity == "") {
            return "Invalid quantity";
          }

          if (value[0].price == "") {
            return "Invalid price";
          }

          if (value[0].discount == "") {
            return "Invalid discount";
          }

          if (value[0].gst == "") {
            return "Invalid gst";
          }

          return null;
        }
      },
    },
  });

  const handleAdd = () => {
    if (form.validate().hasErrors) return;
    warehouseAddMutation.mutate(form.values);
    setShowForm(false);
  };

  const fromReset = () => {
    form.reset();
  };

  return (
    <div className='w-full overflow-hidden'>
      {isLoading ? (
        "Loading..."
      ) : (
        <div>
          {showForm ? (
            <Collapse
              in={showForm}
              transitionDuration={200}
              transitionTimingFunction='linear'
            >
              <div className='w-full flex'>
                <Paper
                  shadow='xl'
                  radius={"xl"}
                  className='p-8 h-fit  rounded-md ml-4 mt-4 flex gap-4 w-[45%] items-start'
                >
                  <form
                    onSubmit={form.onSubmit(() => handleAdd())}
                    encType='multipart/form-data'
                  >
                    <div className='flex justify-between'>
                      <div className='flex gap-1 items-center'>
                        <Icon
                          className='cursor-pointer'
                          icon='ic:outline-arrow-back'
                          fontSize={24}
                          onClick={() => {
                            setShowForm(false), form.reset();
                          }}
                        />
                        <Title
                          order={2}
                          size='h3'
                          className='font-poppins'
                          fw={700}
                          ta='start'
                        >
                          {isEdit ? "Edit Warehouse" : "Add Warehouse"}
                        </Title>
                      </div>

                      <div className='m-2'>
                        {isEdit ? null : (
                          <Button
                            className='bg-admin-dominant'
                            rightSection={<Icon icon='material-symbols:add' />}
                            onClick={() => {
                              form.insertListItem("products", {
                                ...productForm,
                              });
                            }}
                          >
                            Add Product
                          </Button>
                        )}
                      </div>
                    </div>

                    <Grid>
                      <Grid.Col span={6}>
                        <TextInput
                          label='Name'
                          placeholder='Warehouse Name'
                          mt='md'
                          name='name'
                          variant='default'
                          {...form.getInputProps("name")}
                        />
                      </Grid.Col>

                      <Grid.Col span={6}>
                        <TextInput
                          label='Manager Name'
                          placeholder='Manager Name'
                          mt='md'
                          name='managername'
                          variant='default'
                          {...form.getInputProps("managername")}
                        />
                      </Grid.Col>

                      <Grid.Col span={6}>
                        <TextInput
                          label='Location'
                          placeholder='Lat/Long'
                          mt='md'
                          name='location'
                          variant='default'
                          {...form.getInputProps("location")}
                        />
                      </Grid.Col>

                      <Grid.Col span={6}>
                        <NumberInput
                          label='Mobile Number'
                          placeholder='+91 XXXXXXXXXX'
                          mt='md'
                          name='mobilenumber'
                          hideControls
                          variant='default'
                          {...form.getInputProps("mobilenumber")}
                        />
                      </Grid.Col>

                      <Grid.Col span={6}>
                        <TextInput
                          label='City'
                          placeholder='Nagercoil'
                          mt='md'
                          name='city'
                          variant='default'
                          {...form.getInputProps("city")}
                        />
                      </Grid.Col>

                      <Grid.Col span={6}>
                        <TextInput
                          label='Address'
                          placeholder='Address'
                          mt='md'
                          name='address'
                          variant='default'
                          {...form.getInputProps("address")}
                        />
                      </Grid.Col>
                    </Grid>

                    <Group justify='start' mt='xl'>
                      <Button
                        type='submit'
                        size='md'
                        variant='filled'
                        className='bg-admin-dominant text-white w-full'
                        leftSection={
                          isEdit ? (
                            <Icon icon='material-symbols:edit' />
                          ) : (
                            <Icon icon='material-symbols:add' />
                          )
                        }
                        loading={warehouseAddMutation.isPending}
                        disabled={warehouseAddMutation.isPending}
                      >
                        {warehouseAddMutation.isPending
                          ? "Loading..."
                          : isEdit
                          ? "Edit Warehouse"
                          : "Add Warehouse"}
                      </Button>
                    </Group>
                  </form>
                </Paper>

                <Stack className='w-[40%] h-[calc(100vh-100px)] overflow-y-scroll hide-scroll'>
                  {form.values.products.map((_productform: any, index: any) => (
                    <Paper
                      shadow='xl'
                      radius={"xl"}
                      key={index}
                      className='p-8 rounded-md ml-4 mt-4 flex gap-4 items-start'
                    >
                      <form encType='multipart/form-data'>
                        <div className='flex justify-between'>
                          <Title
                            order={2}
                            size='h3'
                            className='font-poppins'
                            fw={700}
                            ta='start'
                          >
                            Add Product ({index + 1})
                          </Title>

                          <div className='m-2 flex gap-2 items-center'>
                            <CloseButton
                              onClick={() => {
                                form.removeListItem("products", index);
                              }}
                            />
                          </div>
                        </div>

                        <Grid>
                          <Grid.Col span={6}>
                            <NumberInput
                              label='Lot Number'
                              placeholder='Lot Number'
                              mt='md'
                              name='lotNumber'
                              variant='default'
                              {...form.getInputProps(
                                `products.${index}.lotNumber`
                              )}
                            />
                          </Grid.Col>

                          <Grid.Col span={6}>
                            <NumberInput
                              label='Rack Number'
                              placeholder='Rack Number'
                              mt='md'
                              name='rackNumber'
                              variant='default'
                              {...form.getInputProps(
                                `products.${index}.rackNumber`
                              )}
                            />
                          </Grid.Col>

                          <Grid.Col span={6}>
                            <TextInput
                              label='Product Name'
                              placeholder='Product Name'
                              mt='md'
                              name='productName'
                              variant='default'
                              {...form.getInputProps(
                                `products.${index}.productName`
                              )}
                            />
                          </Grid.Col>

                          <Grid.Col span={6}>
                            <NativeSelect
                              label='Category'
                              disabled={categoryLoading}
                              placeholder='Category'
                              mt='md'
                              name='category'
                              variant='default'
                              data={
                                categoryLoading
                                  ? []
                                  : [
                                      {
                                        value: "",
                                        label: "Select Category",
                                      },
                                      ...category?.data.map((_data: any) => ({
                                        value: _data._id,
                                        label: _data.name,
                                      })),
                                    ]
                              }
                              {...form.getInputProps(
                                `products.${index}.category`
                              )}
                            />
                          </Grid.Col>

                          <Grid.Col span={6}>
                            <NumberInput
                              label='Quantity'
                              placeholder='Quantity'
                              mt='md'
                              name='quantity'
                              variant='default'
                              {...form.getInputProps(
                                `products.${index}.quantity`
                              )}
                            />
                          </Grid.Col>

                          <Grid.Col span={6}>
                            <NumberInput
                              label='Price'
                              placeholder='Price'
                              mt='md'
                              name='price'
                              variant='default'
                              {...form.getInputProps(`products.${index}.price`)}
                            />
                          </Grid.Col>

                          <Grid.Col span={6}>
                            <NumberInput
                              label='Discount'
                              placeholder='Discount'
                              mt='md'
                              name='discount'
                              variant='default'
                              {...form.getInputProps(
                                `products.${index}.discount`
                              )}
                            />
                          </Grid.Col>

                          <Grid.Col span={6}>
                            <NumberInput
                              label='GST'
                              placeholder='GST'
                              mt='md'
                              name='gst'
                              variant='default'
                              {...form.getInputProps(`products.${index}.gst`)}
                            />
                          </Grid.Col>
                        </Grid>
                      </form>
                    </Paper>
                  ))}
                </Stack>
              </div>
            </Collapse>
          ) : (
            <WarehouseTable
              data={data}
              warehouseDeleteMutation={warehouseDeleteMutation}
              warehouseAddMutation={warehouseAddMutation}
              isLoading={isLoading}
              setShowForm={setShowForm}
              setIsEdit={setIsEdit}
              setDataId={setDataId}
              fromReset={fromReset}
              setPage={setPage}
              totalPages={Math.ceil(data?.count / 10)}
            />
          )}
        </div>
      )}
    </div>
  );
}
