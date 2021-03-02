import React from "react";
import ContactForm from "./components/Contact-form";
import { ClippyProvider } from "@react95/clippy";
import Footer from "./components/Footer";
import Countdown from "./components/Countdown";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <ClippyProvider>
        <Header />
        <Countdown
          timeTillDate="03 31 2021, 12:00 pm"
          timeFormat="MM DD YYYY, h:mm a"
        />
        <ContactForm />
      </ClippyProvider>
      <Footer />
    </>
  );
};

export default App;
