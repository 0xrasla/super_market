import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Pagination, Paper, Table } from "@mantine/core";

interface Props {
  data: any;
  warehouseDeleteMutation: any;
  isLoading: boolean;
  setShowForm: any;
  warehouseAddMutation: any;
  setIsEdit: any;
  setDataId: any;
  fromReset: any;
  setPage: any;
  totalPages: number;
}

const makeFirstLetterCapital = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function WarehouseTable({
  data,
  isLoading,
  setShowForm,
  warehouseDeleteMutation,
  warehouseAddMutation,
  setIsEdit,
  setDataId,
  fromReset,
  setPage,
  totalPages,
}: Props): JSX.Element {
  const rows = () => {
    if (isLoading) return [];
    return data?.data.map((_data: any) => (
      <Table.Tr key={_data._id}>
        <Table.Td className='flex gap-2 items-center'>
          <a
            href={`/singlewarehouse/${_data._id}`}
            style={{ textDecoration: "underline", color: "blue" }}
          >
            {makeFirstLetterCapital(_data.name)}
          </a>
        </Table.Td>
        <Table.Td>{makeFirstLetterCapital(_data.managername)}</Table.Td>
        <Table.Td>{_data.mobilenumber}</Table.Td>
        <Table.Td>{makeFirstLetterCapital(_data.city)}</Table.Td>
        <Table.Td>{makeFirstLetterCapital(_data.location)}</Table.Td>
        <Table.Td>{makeFirstLetterCapital(_data.address)}</Table.Td>
        <Table.Td className='flex gap-4 items-center'>
          <img
            src='/icons/deleteicon.svg'
            alt=''
            className='cursor-pointer w-6 h-6'
            onClick={() => warehouseDeleteMutation.mutate(_data._id)}
          />

          <Icon
            icon='tabler:edit'
            color='#00b207'
            className='cursor-pointer w-6 h-6'
            onClick={() => {
              warehouseAddMutation.mutate();
              setIsEdit(true);
              setShowForm(true);
              console.log(_data);
              setDataId(_data._id);
            }}
          />
        </Table.Td>
      </Table.Tr>
    ));
  };

  const handlePageChange = (newpage: number) => {
    setPage(newpage);
  };

  return (
    <>
      <Paper shadow='' className='p-8 ml-4 mt-4 flex gap-4 w-[97%] items-start'>
        <div className='flex flex-col w-full'>
          <div className='flex justify-between m-2'>
            <h2 className='capitalize font-medium text-lg'>Warehouse List</h2>
            <Button className='bg-red-600'>Report</Button>
          </div>

          <div className='m-2'>
            <Button
              className='bg-admin-dominant'
              rightSection={<Icon icon='material-symbols:add' />}
              onClick={() => {
                setShowForm(true), setIsEdit(false);
                fromReset();
              }}
            >
              Create New
            </Button>
          </div>

          <Table className='w-full font-poppins'>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Warehouse</Table.Th>
                <Table.Th>Manager Name</Table.Th>
                <Table.Th>Phone No</Table.Th>
                <Table.Th>City</Table.Th>
                <Table.Th>Location</Table.Th>
                <Table.Th>Address</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows()}</Table.Tbody>
          </Table>
        </div>
      </Paper>

      {/* pagination */}
      {/* <Pagination
        total={totalPages}
        onChange={handlePageChange}
        defaultValue={1}
        radius={"xl"}
        size='md'
        withControls={false}
        bg={"white"}
      /> */}
    </>
  );
}
