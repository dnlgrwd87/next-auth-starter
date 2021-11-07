import { Button } from '@chakra-ui/button';
import { Flex, Box, Heading, Spacer } from '@chakra-ui/layout';
import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <Flex align="center" p={25} boxShadow="0px 1px 7px gray">
      <Heading size="md">Next Starter Template</Heading>
      <Spacer />
      <Box>
        {!!session?.user ? (
          <Button colorScheme="teal" mr="4" onClick={() => signOut()}>
            Sign Out
          </Button>
        ) : (
          <Button colorScheme="teal" mr="4" onClick={() => signIn()}>
            Sign In
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
