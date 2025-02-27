import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import AboutUs from "./components/about-us";
import OurWork from "./components/our-work";
import Team from "./components/team";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Login from "./components/login"; // Importando a página de login
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header />
              <main>
                <AboutUs />
                <OurWork />
                <Team />
                <Contact />
              </main>
              <Footer />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
