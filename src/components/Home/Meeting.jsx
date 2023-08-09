import React from 'react'
import {
    Box,
    Heading,
    Text,
    Image,
  } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react'
export const Meeting = () => {
  return (
    <Box bg={"#F8F8F8"} py={{ base: "55px", md: "80px" }}>
        <Heading  color={"blue.900"} fontSize={{base:"2xl",md:"6xl"}}>
            <Text textAlign={"center"}>
            Scheduling for any meeting type
            </Text>
        </Heading>
        <Grid templateRows='repeat(2, 1fr)'templateColumns='repeat(2, 1fr)'gap={2} px={"10%"} pt={{ base: "55px", md: "70px" }}>
            <GridItem cursor={'context-menu'} colSpan={{base:'2',md:'1'}} rowSpan={{base:'4',md:'2'}}  borderRadius={"7px"} _hover={{boxShadow:"box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",backgroundColor:"white"}}>
                <Box display={'flex'} flexDirection={'column'} gap={4} pl='30px' pr='18' pt='30px' pb='45px'>
                    <Image src='https://www.nojitter.com/sites/default/files/AdobeStock_337426409.jpg' h="340px" alt='one'/>
                    <Text  fontSize='xl' fontWeight={'bold'} >One-on-One</Text>
                    <Text fontSize='xl'color={'gray.700'}>Let your clients and colleagues select open meeting types from your schedule</Text>
                </Box>
            </GridItem>
            <GridItem cursor={'context-menu'} colSpan={{base:'2',md:'1'}} rowSpan={{base:'4',md:'2'}}  borderRadius={"7px"} _hover={{boxShadow:"box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",backgroundColor:"white"}}>
                <Box display={'flex'} flexDirection={'column'} gap={4} pl='20px' pr='18' pt='20px' pb='45px'>
                    <Image src='https://img.freepik.com/free-photo/group-diverse-people-having-business-meeting_53876-25060.jpg' h="340px" alt='one'/>
                    <Text  fontSize='xl' fontWeight={'bold'}>Group</Text>
                    <Text fontSize='xl'color={'gray.700'}>Book events for multiple attendees such as webinars and training sessions</Text>
                </Box>
            </GridItem>
            <GridItem cursor={'context-menu'} colSpan={{base:'2',md:'1'}} rowSpan={{base:'4',md:'2'}}  borderRadius={"7px"} _hover={{boxShadow:"box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",backgroundColor:"white"}}>
                <Box display={'flex'} flexDirection={'column'} gap={4} pl='20px' pr='18' pt='20px' pb='45px'>
                    <Image src='https://dailymedia.case.edu/wp-content/uploads/2017/10/02122658/calendar.jpg'  alt='one'/>
                    <Text fontSize='xl' fontWeight={'bold'}>Collective</Text>
                    <Text fontSize='xl'color={'gray.700'}>Schedule across your team’s calendars for events you co-host with others</Text>
                </Box>
            </GridItem>
            <GridItem cursor={'context-menu'} colSpan={{base:'2',md:'1'}} rowSpan={{base:'4',md:'2'}}  borderRadius={"7px"} _hover={{boxShadow:"box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",backgroundColor:"white"}}>
                <Box display={'flex'} flexDirection={'column'} gap={4} pl='20px' pr='18' pt='20px' pb='45px'>
                    <Image src='https://www.workflowmax.com/hubfs/9_Tips_For_Hosting_Awesomely_Effective_Meetings.png'  alt='one'/>
                    <Text  fontSize='xl' fontWeight={'bold'}>Round robin</Text>
                    <Text fontSize='xl'color={'gray.700'}>Balance hosting responsibilities for your team automatically</Text>
                </Box>
            </GridItem>
        </Grid>
    </Box>
  )
}
