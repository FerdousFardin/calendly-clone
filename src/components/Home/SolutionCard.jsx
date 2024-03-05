import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    useColorModeValue,
  } from '@chakra-ui/react';
  export default function SolutionCard({heading,text}) {
    return (
      <Center py={8}>
        <Box
          maxW={'445px'}
          cursor={'pointer'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          p={6}
          overflow={'hidden'}>
          <Stack spacing={7} pb={6}>
            <Text
              color={'blue.500'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'2em'}
              letterSpacing={1.1}>
            </Text>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'2xl'}
              fontFamily={'body'}>
              {heading}
            </Heading>
            <Text color={'gray.500'} fontSize={'xl'} textAlign={"justify"} pr={"10px"}>
            {text}
            </Text>
          </Stack>
        </Box>
      </Center>
    );
  }