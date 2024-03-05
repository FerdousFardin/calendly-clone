import {
    Box,
    chakra,
    Container,
    Heading,
    Link,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
  } from '@chakra-ui/react';
  import { FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';
  
  
  const ListHeader = ({ children }) => {
    return (
      <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
        {children}
      </Text>
    );
  };
  
  const SocialButton = ({
      children,
      label,
      href,
    }) => {
      return (
        <chakra.button
          bg={useColorModeValue('white', 'whiteAlpha.100')}
          rounded={'full'}
          w={8}
          h={8}
          cursor={'pointer'}
          as={'a'}
          href={href}
          display={'inline-flex'}
          alignItems={'center'}
          justifyContent={'center'}
          transition={'background 0.3s ease'}
          _hover={{
            color: useColorModeValue('blackAlpha.500', 'whiteAlpha.200'),
          }}>
          <VisuallyHidden>{label}</VisuallyHidden>
          {children}
        </chakra.button>
      );
    };
  
  export default function Footer() {
    return (
      <Box
        bg={useColorModeValue('white', 'white')}
        color={useColorModeValue('gray.700', 'gray.200')}
        >
        <Container as={Stack} 
        maxW={'7xl'} 
        py={10}
        margin={"auto"}
        marginTop={"70px"}>
          <SimpleGrid
            templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
            spacing={8}
            marginLeft={"30px"}>
            <Stack spacing={6} gap={10}>
              <Box textAlign={"left"} marginBottom={"10px"}>
                <Heading>Easy</Heading>
                <Heading color={"blue.500"}>ahead</Heading>
                <Text fontSize={{base:"lg",sm:"md"}} marginTop={"20px"} width={{base:"130%",sm:"70%"}}>
                We take the work out of connecting with others so you can accomplish more.
                </Text>
              </Box>
              

              <Stack direction={'row'} spacing={6} marginBottom={"10px"}>
                <SocialButton label={'Twitter'} href={'https://twitter.com/?lang=en'}>
                  <FaTwitter />
                </SocialButton>
                <SocialButton label={'YouTube'} href={'https://www.youtube.com/'}>
                  <FaYoutube />
                </SocialButton>
                <SocialButton label={'Instagram'} href={'#'}>
                  <FaInstagram />
                </SocialButton>
                <SocialButton label={'Linkedin'} href={'#'}>
                  <FaLinkedinIn />
                </SocialButton>
              </Stack>
            </Stack>
            <SimpleGrid
             width={700} 
             marginLeft = {150}
             columns={{ base: 1, sm: 2, md: 3 }}
             spacing={"16"}
             >
            <Stack align={'flex-start'} gap={3}>
              <ListHeader><Heading size={"md"} fontFamily={"revert-layer"}>About</Heading></ListHeader>
              <Link href={'#'}>About Scheduler</Link>
              <Link href={'#'}>Contact us</Link>
            </Stack>
            <Stack align={'flex-start'} gap={3}>
              <ListHeader><Heading size={"md"}>Solutions</Heading></ListHeader>
              <Link href={'#'}>Customer Support</Link>
              <Link href={'#'}>Customer Reviews</Link>
            </Stack>
            
            <Stack align={'flex-start'} gap={3}>
              <ListHeader><Heading size={"md"}>Support</Heading></ListHeader>
              <Link href={'#'}>Help Center</Link>
              <Link href={'#'}>Video Tutorials</Link>
            </Stack>
            <Stack align={'flex-start'} gap={3}>
              <ListHeader><Heading size={"md"}>Add-Ons</Heading></ListHeader>
              <Link href={'#'}>Download for Chrome</Link>
              <Link href={'#'}>Download for FireFox</Link>
            </Stack>
            </SimpleGrid>
          </SimpleGrid>
        </Container>
      </Box>
    );
  }