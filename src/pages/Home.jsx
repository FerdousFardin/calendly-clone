import React from "react";
import { BrandSlider } from "../components/Home/BrandSlider";
import { DoMore } from "../components/Home/DoMore";
import Hero from "../components/Home/Hero";
import { Meeting } from "../components/Home/Meeting";
import { MobileBar } from "../components/Home/MobileBar";
import { OnDemand } from "../components/Home/OnDemand";
import { Reminder } from "../components/Home/Reminder";
import { RulesCard } from "../components/Home/RulesCard";
import { Solution } from "../components/Home/Solution";
import ScheduledEvents from "../components/User Dashboard/ScheduledEvents";
import { Box, Divider, Heading } from "@chakra-ui/react";

export const Home = ({ log }) => {
  return (
    <>
      {log === false && <Hero />}
      <BrandSlider />
      {log && (
        <Box>
          <Heading color={"blue.900"} size="2xl" mt={10} mb="4rem">
            Your Scheduled Events
          </Heading>
          <ScheduledEvents isVisible={false} />
        </Box>
      )}
      <Divider />
      <RulesCard />
      <Meeting />
      <Solution />
      <DoMore />
      <Reminder />
      <OnDemand />
      <MobileBar />
    </>
  );
};
