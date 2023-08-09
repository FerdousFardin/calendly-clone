import { Heading, VStack, Text, Image } from "@chakra-ui/react";
import React from "react";

export const BrandSlider = () => {
  return (
    <VStack bg={"#F8F8F8"} spacing={14} py={{ base: "55px", md: "120px" }}>
      <Heading>
        <Text>Simplified scheduling for </Text>
        <Text align={"center"}>
          <Text as={"span"} color={"#006BFF"}>
            worldwide
          </Text>{" "}
          users 
        </Text>
      </Heading>
    </VStack>
  );
};
