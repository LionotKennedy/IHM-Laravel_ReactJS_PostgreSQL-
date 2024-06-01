import React from "react";
import Index from "../chartJS/Index";
// import React,{useEffect, useState} from "react";
// import IndexCard from "../chartJS/IndexCard";
import CardHome from "../CardHome/CardHome";
import SectionCard from "../CardHome/SectionCard";
import { motion } from "framer-motion";

const Home = () => {

  return (
    <>
      {/* <h1>Home page</h1> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}

        // initial={{ width: 0 }}
        // animate={{ width: "100%" }}
        // exit={{ X: window.innerWidth }}
      >
        <SectionCard />
        <Index />
        {/* <IndexCard /> */}
        <CardHome />
      </motion.div>
    </>
  )
}

export default Home;;