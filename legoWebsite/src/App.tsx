import NavBar from "./components/NavBar";
import TopoBackground from "./components/TopoBackground"
import { Route, Routes, Navigate} from "react-router-dom";

import Home from "./pages/homePage";
import LegoPage from "./pages/legoPage";
import OtherCustomsPage from "./pages/customsPage";
 import AboutPage from "./pages/aboutPage";
import ContactPage from "./pages/contactPage"

function App() {
  return (
    <div className="App">
      <TopoBackground />
      <NavBar />
      <Routes>
        <Route path="/homePage" element={<Home />} />
        <Route path="/legoPage" element={<LegoPage />} />
        <Route path="/customsPage" element={<OtherCustomsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/" element={<Home />} />
        
        { /* <Route path="*" element={<Home />} /> */ }
        <Route path="*" element={<Navigate to="/homePage" replace />} />
      </Routes>

      
      
      {/* <footer className="footer"> // TODO make the footer with the copyright and some links with emails
        <p>© 2023 Custom Lego Creations. All rights reserved.</p>
      </footer> */}
    </div>
  );
}

export default App;