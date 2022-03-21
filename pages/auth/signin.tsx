import React, { useState } from 'react';

import {
  Box,
  Button,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';
import Router from 'next/router';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (res.url) {
      Router.push(res.url);
    }
  };

  return (
    <>
      <Stack
        minHeight="100vh"
        align="center"
        justify={{ md: 'center' }}
        mt={{ base: '50', md: '0' }}
      >
        <Box
          p={5}
          width="full"
          maxWidth={{ base: 350, sm: 400, md: 500 }}
          textAlign="center"
          borderWidth={1}
          borderRadius={4}
          borderColor="lightgray"
          boxShadow="lg"
        >
          <Heading mb={3} fontSize="x-large">
            Sign In
          </Heading>
          <FormLabel>Username</FormLabel>
          <Input mb={3} onChange={(e) => setUsername(e.target.value)} />
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            width="full"
            mt={7}
            bg="gray.500"
            color="white"
            _hover={{ bg: 'gray.400' }}
            _active={{ bg: 'gray.500' }}
            _focus={{ border: 'none' }}
            onClick={login}
          >
            Sign In
          </Button>
        </Box>
      </Stack>
      ;
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      props: {},
      redirect: { destination: '/' },
    };
  }

  return {
    props: {},
  };
};
