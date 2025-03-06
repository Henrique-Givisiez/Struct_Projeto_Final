import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import AboutUs from "./components/about-us";
import OurWork from "./components/our-work";
import Team from "./components/team";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Login from "./components/login";
import Colaboradores from "./components/colaboradores";
import Cases from "./components/cases";
import Sidebar from "./components/sidebar";
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

        <Route
          path="/CRUD/funcionarios"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="content">
                <Colaboradores />
              </div>
            </div>
          }
        />
        <Route
          path="/CRUD/cases"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="content">
                <Cases />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
