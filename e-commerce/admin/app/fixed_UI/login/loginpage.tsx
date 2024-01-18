"use client";
import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import * as yup from "yup";
import React from "react";
import { Controller, Form, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [isVisible, setIsVisible] = React.useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const loginSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const submitData = (data: any) => {
    console.log(data);
    if (data.email === "admin@gmail.com" && data.password === "admin") {
      router.push("/dashboard");
    } else {
    }
  };

  return (
    <>
      <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <Card className='flex flex-col-reverse md:flex-row shadow-lg rounded-2xl p-10 max-w-4xl gap-10'>
          <div className='flex-1 space-y-12'>
            <h1 className='text-4xl font-bold text-center mb-8'>Login</h1>
            <form onSubmit={handleSubmit(submitData)} className='space-y-4'>
              <div>
                <Controller
                  control={control}
                  name='email'
                  render={({ field }) => (
                    <Input
                      {...field}
                      errorMessage={errors.email?.message}
                      type='email'
                      label='Email'
                      className='mb-8'
                      startContent={<Icon icon='mdi:email' />}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name='password'
                  render={({ field }) => (
                    <Input
                      {...field}
                      errorMessage={errors.password?.message}
                      label='Password'
                      type={isVisible ? "text" : "password"}
                      className='mb-8'
                      startContent={<Icon icon='mdi:lock' />}
                      endContent={
                        <button
                          className='focus:outline-none'
                          type='button'
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <Icon
                              icon='mdi:eye'
                              className='text-2xl text-default-400 pointer-events-none'
                            />
                          ) : (
                            <Icon
                              icon='mdi:eye-off'
                              className='text-2xl text-default-400 pointer-events-none'
                            />
                          )}
                        </button>
                      }
                    />
                  )}
                />
              </div>
              <div>
                <Button
                  size='lg'
                  type='submit'
                  className='bg-violet-500 w-full py-3 rounded-lg mt-5 text-white'
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
          <div className='flex-1 mt-5 md:mt-0'>
            <img
              className='object-cover w-full h-full rounded-2xl'
              src='https://unsplash.it/800'
              alt=''
            />
          </div>
        </Card>
      </div>
    </>
  );
}

export default LoginPage;
