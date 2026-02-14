import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./HomeHome";
import MisIdeas from "./MisIdeas";
import Escribe from "./Escribir";
import Cap from "./Capitulo";
import Pjs from "./MisPersonajes";
import Lineas from "./Lineasdeltiempo";
import Mundo from "./Mimundo";
import Historia from "./MiHistoria";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/mis-ideas" element={<MisIdeas />} />
          <Route path="/escribir" element={<Escribe/>}/>
          <Route path="/capitulo" element={<Cap/>}/>
          <Route path="/mispersonajes" element={<Pjs/>}/>
          <Route path="/lineasdeltiempo" element={<Lineas/>}/>
          <Route path="/mimundo" element={<Mundo/>}/>
          <Route path="/mihistoria" element={<Historia/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}