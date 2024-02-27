import {
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  Box,
  Icon,
  Flex,
  Grid,
  GridItem,
  Heading,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  FcAbout,
  FcElectroDevices,
  FcGenealogy,
  FcGenericSortingAsc,
  FcNeutralTrading,
} from "react-icons/fc";
import style from "../Resources/Resources.module.css";

export default function Resources() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Menu isOpen={isOpen}>
      <MenuButton
        border={"none"}
        borderRadius={5}
        color={isOpen ? "#006BFF" : "#000000"}
        aria-label="Courses"
        fontWeight="800"
        fontSize={16}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
      >
        More {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </MenuButton>

      <MenuList
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        borderRadius={25}
        width={"40%"}
      >

        <Flex
          width={1000}
          gap={0}
          height={600}
          borderRadius={25}
          background={"#fff"}
          className={style.shadow}
        >
  
          <Box width={"20%"} className={style.bgcolour}>
            <Box textAlign={"left"} marginLeft={15}>
              <Heading marginTop={10}>More</Heading>
              <br />
              <p className={style.topP}>
                More in-depth information about every corner of the Scheduler
                sechduling ecosystem.
              </p>
            </Box>
          </Box>
      
          <Box borderRadius={25} width={"50%"} textAlign={"left"}>
            <Grid
              templateColumns="repeat(2, 1fr)"
              gap={5}
              width={770}
              marginLeft={5}
              marginTop={5}
            >
              <GridItem w="100%" h="180" marginTop={50}>
                <Icon as={FcAbout} fontSize={35} />
                <h1 className={style.gridmargin}>About</h1>
                <p className={style.gridmarginP}>Learn who we are and what this <br/> website is about</p>
              </GridItem>
              <GridItem w="100%" h="170" marginTop={50}>
                <Icon as={FcGenealogy} fontSize={25} />
                <h4 className={style.gridmargin}>Customer Stories</h4>
                <p className={style.gridmarginP}>
                  Hear from our valued customers
                </p>
              </GridItem>

              <GridItem w="100%" h="170">
                <Icon as={FcGenericSortingAsc} fontSize={25} />
                <h4 className={style.gridmargin}>Resource Center</h4>
                <p className={style.gridmarginP}>Explore all of our resources</p>
              </GridItem>
              <GridItem w="100%" h="170">
                <Icon as={FcNeutralTrading} fontSize={25} />
                <h4 className={style.gridmargin}>Help Center</h4>
                <p className={style.gridmarginP}>Explained overview of how to use <br/> Scheduler</p>
              </GridItem>

            </Grid>
          </Box>
        </Flex>
      </MenuList>
    </Menu>
  );
}
