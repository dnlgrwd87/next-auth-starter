import React from 'react';

import { Center, Container } from '@chakra-ui/layout';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Container>
      <Center mt={7}>Welcome to the site!</Center>
    </Container>
  );
};

export default Home;
