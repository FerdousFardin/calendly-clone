import {Box,Heading,Image} from "@chakra-ui/react";
import React from "react";
import styles from "../styles/indivduals.module.css";


const Indiviuals = () => {
  return (
    <Box mt={104.5}>
      <Box className={styles.div1}>
        <Box className={styles.div2}>
          <Heading size='3xl'className={styles.h1size}>
            The genius way to <br />
            work <span className={styles.em}> better </span>
          </Heading>

          <Box className={styles.p1}>
            <p>
              Scheduler makes it easy to work smarter
              <br /> when you’re working solo. Meetings,
              <br /> sessions, and appointments become <br />
              more efficient ways to achieve success
              <br /> and accomplish goals.
            </p>
          </Box>
        </Box>

        <Box className={styles.div3}>
          <Image
            src="https://images.ctfassets.net/k0lk9kiuza3o/2kiAGfjL7zawukKEtUekPZ/e9808f922920947d64e0ffe4fbf18a45/Calendly-Individuals-Hero.png?w=1080&h=904&q=50&fm=webp"
            alt=""
            className={styles.Image1}
          />
        </Box>
      </Box>
 

      <Box className={styles.div1}>
        <Box className={styles.div3}>
          <Image
            src="https://images.ctfassets.net/k0lk9kiuza3o/5vhSCmOfTG8ByGSTZiggcw/7c024b62e0421989e268bee66315ae2c/Calendly-Stay-in-Context.png?w=1140&h=940&q=50&fm=webp"
            alt=""
            className={styles.Image1}
          />
        </Box>

        <Box className={styles.box2div2}>
          <h1 className={styles.box2h1}>AN USEFUL CALENDAR</h1>
          <Heading className={styles.box2h1size}>For Tracking The Schedule</Heading>

          <Box className={styles.p1}>
            <p>
              When invitees select a meeting slot from your schedule,
              they only see the times you’re available, and only the
              length and type of meeting you want to have. Your
              schedule fills up efficiently, and everyone avoids excess
              email exchanges.
            </p>
          </Box>

        </Box>
      </Box>

      <Box className={styles.div1}>
        <Box className={styles.div2}>
          <h1 className={styles.box2h1}>SCHEDULING AT TIME</h1>
          <Heading className={styles.box2h1size}>Get more clients</Heading>

          <Box className={styles.p1}>
            <p>
              Happy clients are long-term clients. With Scheduler,
              everyone can schedule with you instantly so no one slips
              through the cracks, and everything about your interaction
              is personal, professional, and respectful of their time.
            </p>
          </Box>

        </Box>

        <Box className={styles.div3}>
          <Image
            src="https://images.ctfassets.net/k0lk9kiuza3o/7dAOGwsgnRjDgfFvLzJTgj/851a9a4c76d6416db169143b46b9d656/Calendly-clients__1_.png?w=1140&h=930&q=50&fm=webp"
            alt=""
            className={styles.Image1}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Indiviuals;