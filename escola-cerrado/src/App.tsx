import Header from "./components/header";
import AboutUs from "./components/about-us";
import OurWork from "./components/our-work";
import Team from "./components/team";
import Contact from "./components/contact";
import Footer from "./components/footer";
import "./index.css";
function App() {
  return (
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
  );
}

export default App;
