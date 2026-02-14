import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./Layout";
import "./Home.css";

/* Imágenes */
import animregistro from "./assets/registro.webp";
import animregistroStatic from "./assets/regestatic.webp";
import sesionstatic from "./assets/librostatic.webp";
import sesionanim from "./assets/libroanim.webp";

/* Palabras titilando */
const FADE_DURATION = 2000;
const MIN_DISTANCE = 12;

const FORBIDDEN_ZONE = {
  xMin: 35,
  xMax: 65,
  yMin: 30,
  yMax: 55
};

export default function Home() {

  // ✅ acceso al modal global
  const { abrirRegistro, abrirLogin } = useContext(AuthContext);

  const palabras = ["Crea", "Escribe", "Organiza", "Idea"];
  const [positions, setPositions] = useState([]);

  const distance = (a, b) =>
    Math.hypot(a.x - b.x, a.y - b.y);

  const isInsideForbiddenZone = pos =>
    pos.x > FORBIDDEN_ZONE.xMin &&
    pos.x < FORBIDDEN_ZONE.xMax &&
    pos.y > FORBIDDEN_ZONE.yMin &&
    pos.y < FORBIDDEN_ZONE.yMax;

  const randomPositionSafe = (existing = []) => {
    let attempts = 0;

    while (attempts < 50) {
      const candidate = {
        x: 10 + Math.random() * 80,
        y: 15 + Math.random() * 70
      };

      if (isInsideForbiddenZone(candidate)) {
        attempts++;
        continue;
      }

      const tooClose = existing.some(
        p => p && distance(candidate, p) < MIN_DISTANCE
      );

      if (!tooClose) return candidate;

      attempts++;
    }

    return {
      x: 10 + Math.random() * 80,
      y: 15 + Math.random() * 70
    };
  };

  useEffect(() => {
    setPositions(
      palabras.map((_, i, arr) => {
        const pos = randomPositionSafe(arr.slice(0, i));
        return {
          x: pos.x,
          y: pos.y,
          visible: true,
          twinkleDuration: 2 + Math.random() * 3,
          twinkleDelay: Math.random() * 3
        };
      })
    );

    const intervals = palabras.map((_, index) =>
      setInterval(() => {

        setPositions(prev => {
          const nuevas = [...prev];
          nuevas[index] = { ...nuevas[index], visible: false };
          return nuevas;
        });

        setTimeout(() => {
          setPositions(prev => {
            const nuevas = [...prev];

            const pos = randomPositionSafe(
              nuevas.filter((_, i) => i !== index)
            );

            nuevas[index] = {
              ...nuevas[index],
              x: pos.x,
              y: pos.y,
              visible: true
            };

            return nuevas;
          });
        }, FADE_DURATION);
      }, 8000 + Math.random() * 6000)
    );

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <>
      {/* PALABRAS ESTRELLA */}
      <div className="encabezado-grid">
        <h1>Lunoest</h1>

        {palabras.map((palabra, index) => (
          <h3
            key={palabra}
            className="star-word"
            style={{
              top: `${positions[index]?.y}%`,
              left: `${positions[index]?.x}%`,
              opacity: positions[index]?.visible ? 1 : 0,
              animationDuration: `${positions[index]?.twinkleDuration}s`,
              animationDelay: `${positions[index]?.twinkleDelay}s`
            }}
          >
            {palabra}
          </h3>
        ))}
      </div>

      
      <div className="sesion">

       
        <div
  className="comenzar"
  onClick={abrirRegistro}
  style={{ cursor: "pointer" }}
>
          <div className="registro">
            <img
              src={animregistroStatic}
              className="registro-static"
              alt="registro"
            />
            <img
              src={animregistro}
              className="registro-anim"
              alt="registro"
            />
          </div>

          <h4 id="registrarse">
            Registrarse <br /> para comenzar
          </h4>
        </div>

       
        <div
  className="continuar"
  onClick={abrirLogin}
  style={{ cursor: "pointer" }}
>
          <div className="inicio">
            <img
              src={sesionstatic}
              className="inicio-static"
              alt="inicio de sesión"
            />
            <img
              src={sesionanim}
              className="inicio-anim"
              alt="inicio de sesión"
            />
          </div>

          <h4 id="iniciar">
            Iniciar sesión <br /> para continuar
          </h4>
        </div>

      </div>
    </>
  );
}