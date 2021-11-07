import React from 'react';

import { Flex, Box, Heading, Spacer } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Flex align="center" p={25} boxShadow="0px 1px 7px gray">
      <Heading size="md">Next Starter Template</Heading>
      <Spacer />
      <Box>
        <Button colorScheme="teal" mr="4">
          Sign In
        </Button>
      </Box>
    </Flex>
  );
};

export default Navbar;
