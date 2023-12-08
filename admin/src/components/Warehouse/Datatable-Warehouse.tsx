import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Table } from "@mantine/core";
import { API_URL } from "../../config/Constants";

interface Props {
  data: any;
  categoryDeleteMutation: any;
  isLoading: boolean;
  setShowForm: any;
}

export function WarehouseTable({
  data,
  categoryDeleteMutation,
  isLoading,
  setShowForm,
}: Props): JSX.Element {
  const rows = () => {
    if (isLoading) return [];
    return data?.data.map((_data: any) => (
      <Table.Tr key={_data.name}>
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

  return (
    <div className="p-8 border-2 border-solid border-gray-200 rounded-md ml-4 mt-4 flex gap-4 w-[97%] items-start">
      <div className="flex flex-col w-full">
        <div className="flex justify-between m-2">
          <h2 className="capitalize font-medium text-lg">Warehouse List</h2>
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
  );
}