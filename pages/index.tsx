import React from 'react';

import { Center, Container, Text } from '@chakra-ui/layout';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: session } = useSession();
  const loggedInUser = session?.username;

  return (
    <Container>
      <Center mt={7}>
        {!!loggedInUser ? (
          <Text>Welcome, {loggedInUser}</Text>
        ) : (
          <Text>Log in to see your info</Text>
        )}
      </Center>
    </Container>
  );
};

export default Home;
