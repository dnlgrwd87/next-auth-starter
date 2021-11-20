import React from 'react';

import { Box, Button, Heading, Stack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getProviders, getSession, signIn } from 'next-auth/react';

export default function SignIn({ providers }) {
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
          <Heading fontSize="x-large">Sign In</Heading>
          {Object.values(providers).map((provider: any) => (
            <Box p={6} key={provider.name}>
              <Button
                width="full"
                mt={4}
                bg="gray.500"
                color="white"
                _hover={{ bg: 'gray.400' }}
                _active={{ bg: 'gray.500' }}
                _focus={{ border: 'none' }}
                onClick={() => signIn(provider.id)}
              >
                Continue with Google
              </Button>
            </Box>
          ))}
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

  const providers = await getProviders();

  return {
    props: { providers },
  };
};
