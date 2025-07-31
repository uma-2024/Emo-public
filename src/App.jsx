import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import PreSale from "./components/PreSale/PreSale";
import Tokenomics from "./components/Tokenomics/Tokenomics";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import AnnouncementSection from "./components/AnnouncementSection/AnnouncementSection";

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pre-sale" element={<PreSale />} />
        <Route path="/tokenomics" element={<Tokenomics />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/announcement" element={<AnnouncementSection />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
