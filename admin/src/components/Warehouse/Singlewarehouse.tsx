import { Button } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import _axios from "axios";
import { axios } from "../../config/Axios";
import { Tabs } from "@mantine/core";
import { useParams } from "react-router-dom";
import { WarehouseProducts } from "./Warehouse-Tables/Datatable-Products";
import { WarehouseStockmovement } from "./Warehouse-Tables/Datatable-stockmovement";
import { WarehouseWastage } from "./Warehouse-Tables/Datatable-wastage";

export default function () {
  const param = useParams();
  console.log("dsjdw", param.id);

  const {
    data: warehouseData,
    isLoading,
    refetch: refetchWarehouse,
  } = useQuery({
    queryKey: [""],
    queryFn: () =>
      axios("/warehouse", { params: { id: param.id } }).then((res) => {
        return res.data;
      }),
  });
  console.log(warehouseData);
  console.log(isLoading);

  return (
    <>
      <div className='flex items-start'>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className='shadow-lg p-4 border-2 border-solid border-gray-200 rounded-md ml-4 mt-4 w-[55%] items-start'>
            <div className='flex justify-between w-full'>
              <div className='font-semibold text-[20px]'>
                {warehouseData?.data.name}
              </div>
              <div className='flex gap-3 font-medium text-[#808080]'>
                <img src='/icons/location.svg' alt='' />
                <div>{warehouseData?.data.location}</div>
              </div>
            </div>
            <div className='text-end text-[12px] font-medium text-[#808080]'>
              {warehouseData?.data.city} <br /> 629001
            </div>

            <div className='flex gap-16'>
              <img src='/icons/warehouse.svg' alt='' />
              <div className='space-y-3'>
                <div className='grid grid-cols-2 gap-24'>
                  <div className='text-[#808080] font-semibold'>Name</div>
                  <div className='font-semibold'>
                    {warehouseData?.data.managername}
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-24'>
                  <div className='text-[#808080] font-semibold'>Email</div>
                  <div className='font-semibold'>
                    {warehouseData?.data.email}
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-24'>
                  <div className='text-[#808080] font-semibold'>Mobile No</div>
                  <div className='font-semibold'>{`+91 ${warehouseData?.data.mobilenumber}`}</div>
                </div>
              </div>
            </div>
            <div className='text-end'>
              <Button className='bg-[#FC5656]'>Report</Button>
            </div>
          </div>
        )}
      </div>

      <Tabs
        color='#00B207'
        className='p-4'
        variant='pills'
        radius='xl'
        defaultValue='Products'
      >
        <Tabs.List>
          <Tabs.Tab
            value='Products'
            className='text-[16px] pt-3 pb-3 pl-9 pr-9 font-bold'
          >
            Products
          </Tabs.Tab>
          <Tabs.Tab
            value='Stockmovement'
            className='text-[16px] pt-3 pb-3 pl-9 pr-9 font-bold'
          >
            Stock movement
          </Tabs.Tab>
          <Tabs.Tab
            value='Wastage'
            className='text-[16px] pt-3 pb-3 pl-9 pr-9 font-bold'
          >
            Wastage
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='Products' className='p-2'>
          <WarehouseProducts />
        </Tabs.Panel>

        <Tabs.Panel value='Stockmovement' className='p-2'>
          <WarehouseStockmovement />
        </Tabs.Panel>

        <Tabs.Panel value='Wastage' className='p-2'>
          <WarehouseWastage />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
