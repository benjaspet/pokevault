import React from "react";
import Topbar from "./components/Topbar.tsx";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import SetInfo from "./components/SetInfo.tsx";

const SetInfoPage: React.FC = () => {

  return (
    <>
      <Topbar />
      <Navbar />
      <SetInfo />
      <Footer />
    </>
  )

}

export default SetInfoPage;