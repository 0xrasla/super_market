import { Avatar, Input, Menu } from "@mantine/core";
import { useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export function Topbar() {
  const activelink = useLocation().pathname.split("/").pop();
  const navigate = useNavigate();

  return (
    <div className='flex gap-2 justify-between p-1 py-0 items-center w-full bg-gray-100'>
      <h2 className='capitalize m-4 font-bold text-2xl'>{activelink}</h2>
      <Input
        variant='filled'
        placeholder='Search Anything'
        size='md'
        className='w-72'
        leftSection={
          <Icon
            icon='material-symbols:search'
            className='w-7 h-7 transition duration-75'
            color='#00B207'
          />
        }
      />

      <div className='flex items-center justify-around gap-6'>
        <Icon
          icon='lets-icons:bell-pin'
          className='w-6 h-6 cursor-pointer transition duration-75 text-orange-500 hover:text-orange-600'
        />

        <Menu>
          <Menu.Target>
            <div className='cursor-pointer flex items-center'>
              <Avatar
                data-name='Robert Gouth'
                src='/images/topbar-adminimage.svg'
              />

              <div className='flex flex-col'>
                <div className='flex items-center'>
                  <span className='ml-2'>Robert Gouth</span>

                  <Icon
                    icon='material-symbols:keyboard-arrow-down'
                    className='w-5 h-5 transition duration-75'
                  />
                </div>

                <span className='ml-2 text-sm text-gray-500'>Admin</span>
              </div>
            </div>
          </Menu.Target>

          <Menu.Dropdown className='cursor-pointer'>
            <Menu.Item leftSection={<Icon icon='iconamoon:profile-fill' />}>
              Profile
            </Menu.Item>
            <Menu.Item
              leftSection={<Icon icon='material-symbols:logout' />}
              onClick={() => {
                console.log("Logout");
                navigate("/");
              }}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
}
