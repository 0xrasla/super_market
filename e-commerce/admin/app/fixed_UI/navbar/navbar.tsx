"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";

import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon } from "@/components/icons";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

import { Logo } from "@/components/icons";
import { Avatar } from "@nextui-org/avatar";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label='Search'
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className='hidden lg:inline-block' keys={["command"]}></Kbd>
      }
      labelPlacement='outside'
      placeholder='Search...'
      startContent={
        <SearchIcon className='text-base text-default-400 pointer-events-none flex-shrink-0' />
      }
      type='search'
    />
  );

  const pathname = usePathname();
  const isActivePath = pathname.split("/").pop();
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const logout = () => {
    console.log("logged out");
    router.push("/");
  };

  return (
    <>
      <div className='flex py-3 px-3 items-center justify-between'>
        <h1 className='text-2xl capitalize text-violet-500'>{isActivePath}</h1>

        <div className='flex items-center gap-6'>
          {searchInput}
          <ThemeSwitch />
          <Icon
            icon='clarity:bell-solid-badged'
            className='text-4xl cursor-pointer text-yellow-400'
          />
          <div>
            <Avatar
              src='https://i.pravatar.cc/150?u=a04258114e29026708c'
              size='md'
            />
          </div>
          <Icon
            icon='carbon:logout'
            className='text-4xl cursor-pointer text-red-500'
            onClick={onOpen}
          />
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: any) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Log Out</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to log out?</p>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button onClick={logout} color='primary'>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
