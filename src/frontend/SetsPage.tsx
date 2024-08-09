import React from "react";
import Topbar from "./components/Topbar.tsx";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Sets from "./components/Sets.tsx";

const SetsPage: React.FC = () => {

  return (
    <>
      <Topbar />
      <Navbar />
      <Sets />
      <Footer />
    </>
  )

}

export default SetsPage;