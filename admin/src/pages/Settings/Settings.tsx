import {
  Box,
  Paper,
  Title,
  Image,
  Text,
  Space,
  Grid,
  TextInput,
  NumberInput,
  Button,
} from "@mantine/core";
import profile from "../../../public/images/profile.png";
import { Icon } from "@iconify/react/dist/iconify.js";

export function Settings() {
  return (
    <>
      <div style={{ padding: " 0  3rem" }}>
        <Paper className='font-poppins h-[87vh]' shadow='sm' radius='md'>
          <Box className='p-7'>
            <Title order={3} className=' font-poppins font-[600]'>
              Admin Account
            </Title>
          </Box>
          <Box style={{ padding: "0px 350px", display: "flex", gap: "40px" }}>
            <Box>
              <Image radius='md' h={200} w='auto' fit='contain' src={profile} />
            </Box>
            <Box>
              <Title className='font-poppins font-[600] mt-9' order={3}>
                Upload Profile
              </Title>
              <Space h='xs' />
              <Text className='font-poppins font-[500]  text-[#4C4C4C] text-[18px]'>
                Your photo should be in PNG or JPG format
              </Text>
              <Space h='md' />
              <div className='flex gap-6'>
                <Icon
                  className='cursor-pointer text-[26px]'
                  icon='clarity:edit-solid'
                />
                <Icon
                  icon='ant-design:delete-filled'
                  className='cursor-pointer text-[26px]'
                />
              </div>
            </Box>
          </Box>
          <Grid justify='center' className='mt-8 '>
            <Grid.Col span={3}>
              <TextInput
                className='w-[300px]'
                label='Name'
                size='md'
                placeholder='Enter name'
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <NumberInput
                className='w-[300px]'
                label='Phone  Number'
                size='md'
                hideControls
                placeholder='8870635766'
              />
            </Grid.Col>
          </Grid>
          <Grid justify='center' className='mt-8 '>
            <Grid.Col span={3}>
              <TextInput
                className='w-[300px]'
                label='Email'
                size='md'
                placeholder='Eg.you@gmail.com'
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <TextInput
                className='w-[300px]'
                label='City'
                size='md'
                placeholder='Enter City'
              />
            </Grid.Col>
          </Grid>

          <div className='mt-20'>
            <Box>
              <Title
                className='font-poppins font-[600] '
                style={{ textIndent: "385px" }}
                order={4}
              >
                Change password
              </Title>
            </Box>
            <Grid justify='center' className='mt-8 '>
              <Grid.Col span={3}>
                <TextInput
                  className='w-[300px]'
                  label='New Password'
                  size='md'
                  placeholder='Eg.you@gmail.com'
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  className='w-[300px]'
                  label='Confirm Password'
                  size='md'
                  placeholder='Enter City'
                />
              </Grid.Col>
            </Grid>
          </div>
          <div className='text-center mt-10'>
            <Button
              size='lg'
              className='w-[600px] bg-[#00B207] font-[20px] text-white p-3'
              style={{ marginLeft: "-60px" }}
            >
              Save Profile
            </Button>
          </div>
        </Paper>
      </div>
    </>
  );
}
