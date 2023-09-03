import Install from './components/Install';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Generator from './components/Generator';
import About from './components/About';
import Header from './components/Header'
import Members from './components/Members';
import Home from './components/Home';
import Minted from './components/Minted';

export default function App() {
  return (
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Install />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Generate" element={<Generator />} />
        <Route path="/Minted" element={<Minted />} />
        <Route path="/Members" element={<Members />} />
        <Route path="/About" element={<About />} />
      </Routes>
      </BrowserRouter>
  );
}