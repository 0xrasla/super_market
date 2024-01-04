import { Button, Table } from "@mantine/core";



export function VendorWastage() {

  const  rows = () => {
   return(
    <>
      <Table.Tr >
        <Table.Td className="">20-01-2022</Table.Td>
        <Table.Td className="p-2 font-semibold">Onion <br />
        <span className="text-[#4C4C4C9C] font-semibold">Vendor Id - #453435</span> <br />
        <span className="text-[#5c5b5b9c] font-light text-xs">23324543/23523364</span>
        </Table.Td>
        <Table.Td className="text-[#808080]">5</Table.Td>
        <Table.Td className="text-[#808080]">kg</Table.Td>
        <Table.Td className="text-[#808080]">86</Table.Td>
        <Table.Td className="text-[#808080]">2.5%</Table.Td>
        <Table.Td className="text-[#808080]">2.5%</Table.Td>
        <Table.Td className="text-[#808080]">$1470</Table.Td>
      </Table.Tr>

      <Table.Tr >
        <Table.Td className="">20-01-2022</Table.Td>
        <Table.Td className="p-2 font-semibold">Onion <br />
        <span className="text-[#4C4C4C9C] font-semibold">Vendor Id - #453435</span> <br />
        <span className="text-[#5c5b5b9c] font-light text-xs">23324543/23523364</span>
        </Table.Td>
        <Table.Td className="text-[#808080]">5</Table.Td>
        <Table.Td className="text-[#808080]">kg</Table.Td>
        <Table.Td className="text-[#808080]">86</Table.Td>
        <Table.Td className="text-[#808080]">2.5%</Table.Td>
        <Table.Td className="text-[#808080]">2.5%</Table.Td>
        <Table.Td className="text-[#808080]">$1470</Table.Td>
      </Table.Tr>

</>
   )
  }


  return (
    <div className="p-8 border-2 border-solid border-gray-200 rounded-md ml-4 mt-4 flex gap-4 w-[97%] items-start">
      <div className="flex flex-col w-full">
        <div className="flex justify-between m-2">
          <h2 className="capitalize font-medium text-lg">Wastage</h2>
        </div>

        <Table className="w-full">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Date</Table.Th>
              <Table.Th>Products</Table.Th>
              <Table.Th>Qty</Table.Th>
              <Table.Th>Unit</Table.Th>
              <Table.Th>Purchase Price/Unit</Table.Th>
              <Table.Th>Gst</Table.Th>
              <Table.Th>Discount</Table.Th>
              <Table.Th>Total Price</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows()}</Table.Tbody>
        </Table>
      </div>
    </div>
  );
}
