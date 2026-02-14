import { useState, createContext } from "react";
import { Outlet, Link } from "react-router-dom";
import "./App.css";

import icono from "./assets/iconotema.webp";
import insta from "./assets/1.png";
import face from "./assets/2.png";
import x from "./assets/3.png";
import pint from "./assets/4.png";
import threads from "./assets/5.png";
import mail from "./assets/6.png";
import perfil from "./assets/7.png";
import copy from "./assets/8.png";
import candado from "./assets/9.png";

/* ================= CONTEXTO GLOBAL ================= */
export const AuthContext = createContext();

function Layout() {

  /* ================= MODAL ================= */
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoModal, setTipoModal] = useState("registro");

  /* ================= USUARIO ================= */
  const [usuario, setUsuario] = useState(null);

  /* ================= FORM STATES ================= */
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const abrirRegistro = () => {
    setTipoModal("registro");
    setMostrarModal(true);
  };

  const abrirLogin = () => {
    setTipoModal("login");
    setMostrarModal(true);
  };

  const cerrarModal = () => setMostrarModal(false);

  /* ================= SUBMIT ================= */
  const handleSubmit = () => {

    // simulación login/registro
    const nombreFinal =
      tipoModal === "registro"
        ? nombre
        : nombre || correo;

    if (!nombreFinal) return;

    setUsuario(nombreFinal); // 👈 guarda usuario
    cerrarModal();

    // limpiar inputs
    setNombre("");
    setCorreo("");
    setPassword("");
  };

  return (
    <AuthContext.Provider
      value={{ abrirRegistro, abrirLogin, cerrarModal, usuario }}
    >

      <div className="layout">

        {/* ================= NAV ================= */}
        <nav className="nav">
          <h2>
            <Link to="/">Lunoest</Link>
          </h2>

          <p className="navsesion">
            {usuario ? (
              <span className="usuarioNav">
                {usuario}
              </span>
            ) : (
              <>
                <span className="linkSesion" onClick={abrirRegistro}>
                  Registrarse
                </span>
                {" / "}
                <span className="linkSesion" onClick={abrirLogin}>
                  Iniciar sesión
                </span>
              </>
            )}
          </p>

          <div className="icono">
            <img src={icono} width="30" alt="icono" />
          </div>
        </nav>

        {/* ================= MENU ================= */}
        <ul className="menu">
          <li id="Idea">
            <h4>Idea</h4>
            <ul className="menuidea">
              <li><Link to="/mis-ideas">Mis ideas</Link></li>
              <li><Link to="/mihistoria">Mi historia</Link></li>
              <li><Link to="/mispersonajes">Mis personajes</Link></li>
              <li><Link to="/mimundo">Mi mundo</Link></li>
            </ul>
          </li>

          <li id="Organiza">
            <h4>Organiza</h4>
            <ul className="menuorganiza">
              <li><Link to="/lineasdeltiempo">Líneas del tiempo</Link></li>
              <li>Árboles genealógicos</li>
            </ul>
          </li>

          <li id="Escribe">
            <Link to="/escribir">
              <h4>Escribe</h4>
            </Link>
          </li>
        </ul>

        {/* ================= CONTENIDO ================= */}
        <main className="home-bg">
          <Outlet />
        </main>

        {/* ================= MODAL ================= */}
        {mostrarModal && (
          <div className="modal-overlay" onClick={cerrarModal}>
            <div
              className="modal-registro"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="cerrar-modal" onClick={cerrarModal}>
                ✕
              </button>

              <p className="tituloregistro">Lunoest</p>

              <h3>
                {tipoModal === "registro"
                  ? "Crear cuenta"
                  : "Iniciar sesión"}
              </h3>

              {tipoModal === "registro" ? (
                <>
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />

                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />

                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <input
                    type="password"
                    placeholder="Confirmar contraseña"
                  />

                  <button
                    className="btn-registrar"
                    onClick={handleSubmit}
                  >
                    Registrarse
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Nombre o correo electrónico"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />

                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    className="btn-registrar"
                    onClick={handleSubmit}
                  >
                    Iniciar sesión
                  </button>
                </>
              )}
            </div>
          </div>
        )}

{/* ================= FOOTER ================= */}
<footer className="footer-lunoest">

<div className="footer-top">

  <div className="footer-links">
    <img src={copy} width="20" alt="copyright" />
    <p>Derechos de autor</p>

    <img src={candado} width="20" alt="seguridad" />
    <p>Política de privacidad</p>
  </div>

  <div className="footer-brand">
    <h5>Lunoest</h5>

    <div className="footer-social">
      <img src={insta} width="30" alt="Instagram" />
      <img src={face} width="30" alt="Facebook" />
      <img src={x} width="30" alt="X" />
      <img src={pint} width="30" alt="Pinterest" />
      <img src={threads} width="30" alt="Threads" />
    </div>
  </div>

  <div className="footer-contact">
    <img src={perfil} width="20" alt="Creadora" />
    <p>Sara Linette Tenorio Rojas</p>

    <img src={mail} width="20" alt="Email" />
    <p>saralinettetr@gmail.com</p>
  </div>

</div>

<div className="footer-bottom">
  © 2026 Lunoest · Idea, Organiza, Escribe, Crea
</div>

</footer>

</div>

</AuthContext.Provider>
);
}

export default Layout;