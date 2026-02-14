import { useState } from "react";
import "./MiHistoria.css";

/* ======================
   BLOQUES BASE
====================== */
const bloquesIniciales = [
  { id: "conflicto", titulo: "Conflicto principal" },
  { id: "meta", titulo: "Meta del protagonista" },
  { id: "moraleja", titulo: "Moraleja" },
  { id: "giros", titulo: "Giros de trama" },
];

const crearBloqueExtra = () => ({
  id: Date.now() + Math.random(),
  titulo: "Otro",
});

function MiHistoria() {
  const [bloques, setBloques] = useState(bloquesIniciales);
  const [dragId, setDragId] = useState(null);

  /* ======================
     AGREGAR BLOQUE
  ====================== */
  const agregarBloque = () => {
    setBloques((prev) => [...prev, crearBloqueExtra()]);
  };

  /* ======================
     ELIMINAR BLOQUE
  ====================== */
  const eliminarBloque = (bloqueId) => {
    setBloques((prev) => prev.filter((b) => b.id !== bloqueId));
  };

  /* ======================
     DRAG & DROP
  ====================== */
  const onDragStart = (id) => {
    setDragId(id);
  };

  const onDrop = (idDestino) => {
    if (dragId === idDestino) return;

    setBloques((prev) => {
      const copia = [...prev];
      const origen = copia.findIndex((b) => b.id === dragId);
      const destino = copia.findIndex((b) => b.id === idDestino);

      const [movido] = copia.splice(origen, 1);
      copia.splice(destino, 0, movido);

      return copia;
    });

    setDragId(null);
  };

  return (
    <>
      <h5 className="titulohist">Mi historia</h5>

      <section className="mundo-contenedor">

        {/* ================= SINOPSIS ================= */}
        <div className="bloque descripcion">
          <h6>Sinopsis general</h6>
          <div
            className="campohist"
            contentEditable
            suppressContentEditableWarning
          />
        </div>

        {/* ================= ESTRUCTURA NARRATIVA ================= */}
        <div className="estructura-narrativa">
          <h6 className="titulo-estructura">Breve descripción</h6>

          <div className="estructura-grid">
            <div className="estructura-bloque">
              <h6>Introducción</h6>
              <div contentEditable className="campohist" />
            </div>

            <div className="estructura-bloque">
              <h6>Desarrollo</h6>
              <div contentEditable className="campohist" />
            </div>

            <div className="estructura-bloque">
              <h6>Clímax</h6>
              <div contentEditable className="campohist" />
            </div>

            <div className="estructura-bloque">
              <h6>Desenlace</h6>
              <div contentEditable className="campohist" />
            </div>
          </div>
        </div>

        {/* ================= BLOQUES DINÁMICOS ================= */}
        <div className="fila">
          {bloques.map((bloque) => (
            <div
              key={bloque.id}
              className="bloque bloque-con-x"
              draggable
              onDragStart={() => onDragStart(bloque.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(bloque.id)}
            >
              <div className="encabezadocat">
                <span
                  className="drag-handle"
                  contentEditable={false}
                  title="Mover bloque"
                >
                  ≡
                </span>

                <h6 contentEditable suppressContentEditableWarning>
                  {bloque.titulo}
                </h6>

                <button
                  className="btn-eliminar-bloque"
                  onClick={() => eliminarBloque(bloque.id)}
                  contentEditable={false}
                >
                  ✕
                </button>
              </div>

              <div
                className="campohist"
                contentEditable
                suppressContentEditableWarning
              />
            </div>
          ))}
        </div>

        {/* ================= BOTÓN NUEVO BLOQUE ================= */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="btn-agregar-bloque"
            onClick={agregarBloque}
          >
            +
          </button>
        </div>

      </section>
    </>
  );
}

export default MiHistoria;