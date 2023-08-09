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
  Link,
  Heading,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  FcAbout,
  FcTimeline,
  FcNext,
  FcElectroDevices,
  FcGenealogy,
  FcGenericSortingAsc,
  FcNeutralTrading,
} from "react-icons/fc";
import style from "../Product/Product.module.css";

export default function Product() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Menu isOpen={isOpen} margin={"auto"}>
      <MenuButton
        border={"none"}
        borderRadius={5}
        color={isOpen ? "#006BFF" : "#000000"}
        aria-label="Courses"
        fontWeight="700"
        fontSize={16}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
      >
        Product {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </MenuButton>

      <MenuList
        onMouseEnter={onOpen}
        borderRadius={27}
        width={"40%"}
        marginLeft={350}
        onMouseLeave={onClose}
      >
        <Flex
          gap={5}
          height={700}
          borderRadius={25}
          marginTop={"0%"}
          className={style.shadow}
        >
          <Box width={"20%"} className={style.bgcolour}>
            <Box textAlign={"left"} marginTop={10} marginLeft={15}>
              <Heading>Products</Heading>
              <br />
              <p className={style.topP}>
                Get to know why
                <br />
                millions of people using
                <br />
                Scheduler
              </p>
            </Box>
          </Box>

          <Box borderRadius={25} width={"50%"} textAlign={"left"} marginTop={5}>
            <Heading className={style.gridmargin}>Features</Heading>
            <p className={style.topP}>
              Flexible features for every scheduling need
            </p>

            <Grid templateColumns="repeat(2, 1fr)" gap={6} marginTop={10}>
              <GridItem w="100%" h="170" backgroundColor={"none"}>
                <Icon as={FcAbout} fontSize={25} />
                <h4 className={style.gridmargin}>Routing Forms</h4>
                <p className={style.gridmarginP}>
                  Request information from website visitors and
                  based on their responses route them to the right person or
                  resource.
                </p>
              </GridItem>
              <GridItem w="100%" h="170">
                <Icon as={FcGenealogy} fontSize={25} />
                <h4 className={style.gridmargin}>Embeds</h4>
                <p className={style.gridmarginP}>
                  Add scheduler on your website to streamline schedulings.
                </p>
              </GridItem>

              <GridItem w="100%" h="170" marginTop={5}>
                <Icon as={FcGenericSortingAsc} fontSize={25} />
                <h4 className={style.gridmargin}>Team Scheduling</h4>
                <p className={style.gridmarginP}>
                  Customize exactly how and when you want to book.
                </p>
              </GridItem>
              <GridItem w="100%" h="170" marginTop={5}>
                <Icon as={FcNeutralTrading} fontSize={25} />
                <h4 className={style.gridmargin}>Calendar Connections</h4>
                <p className={style.gridmarginP}>
                  Connect up to six calendars per user to check real time
                  availability.
                </p>
              </GridItem>
 
            </Grid>
            <div className={style.flex}>
              <Link to="/" className={style.color1}>
                See all features{" "}
              </Link>
              <FcNext />
            </div>
          </Box>
          <Box
            borderRadius={25}
            width={"30%"}
            textAlign={"left"}
            marginRight={8}
          >
            <Heading className={style.toph4}>Solutions</Heading>
            <p className={style.topP}>
              Explore how peoples are using scheduler
            </p>

            <Box marginTop={35}>
              <h4 className={style.gridmarginlast}>Sales</h4>
              <h4 className={style.gridmarginlast}>Recruiting</h4>
              <h4 className={style.gridmarginlast}>Customer Success</h4>
              <h4 className={style.gridmarginlast}>Information Technology</h4>
              <h4 className={style.gridmarginlast}>Marketing</h4>
              <br />
            </Box>
          </Box>
        </Flex>
      </MenuList>
    </Menu>
  );
}
