import { useState } from "react";
import "./Mimundo.css";

/* ======================
   HELPERS
====================== */
const crearItem = () => ({
  id: Date.now() + Math.random(),
  texto: "",
});

/* ======================
   BLOQUES BASE
====================== */
const bloquesIniciales = [
  { id: "lugares", titulo: "Lugares relevantes", items: [crearItem()] },
  { id: "eventos", titulo: "Eventos históricos", items: [crearItem()] },
  { id: "estructura", titulo: "Estructura social", items: [crearItem()] },
  { id: "costumbres", titulo: "Costumbres y creencias", items: [crearItem()] },
];

const crearBloqueExtra = () => ({
  id: Date.now() + Math.random(),
  titulo: "Otros",
  items: [crearItem()],
});

function Mimundo() {
  const [bloques, setBloques] = useState(bloquesIniciales);
  const [dragId, setDragId] = useState(null);

  /* ======================
     AGREGAR ITEM
  ====================== */
  const agregarItem = (bloqueId) => {
    setBloques((prev) =>
      prev.map((b) =>
        b.id === bloqueId
          ? { ...b, items: [...b.items, crearItem()] }
          : b
      )
    );
  };

  /* ======================
     ELIMINAR ITEM
  ====================== */
  const eliminarItem = (bloqueId, itemId) => {
    setBloques((prev) =>
      prev.map((b) =>
        b.id === bloqueId
          ? {
              ...b,
              items: b.items.filter((item) => item.id !== itemId),
            }
          : b
      )
    );
  };

  /* ======================
     ELIMINAR BLOQUE
  ====================== */
  const eliminarBloque = (bloqueId) => {
    setBloques((prev) => prev.filter((b) => b.id !== bloqueId));
  };

  /* ======================
     AGREGAR BLOQUE
  ====================== */
  const agregarBloque = () => {
    setBloques((prev) => [...prev, crearBloqueExtra()]);
  };

  /* ======================
     DRAG & DROP BLOQUES
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
      <h5 className="titulomundo">Mi mundo</h5>

      <section className="mundo-contenedor">
        {/* DESCRIPCIÓN */}
        <div className="bloque descripcion">
          <h6>Descripción</h6>
          <div
            className="campo"
            contentEditable
            suppressContentEditableWarning
          />
        </div>

        {/* GRID DE BLOQUES */}
        <div className="fila">
          {bloques.map((bloque) => (
            <div
              key={bloque.id}
              className="bloque bloque-con-x"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(bloque.id)}
            >
              {/* ENCABEZADO */}
              <div className="encabezadocat">
                <span
                  className="drag-handle"
                  draggable
                  onDragStart={() => onDragStart(bloque.id)}
                  title="Mover bloque"
                  contentEditable={false}
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

              {/* CAMPOS */}
              {bloque.items.map((item) => (
                <div key={item.id} className="campo campo-con-x">
                  <div
                    className="campo-texto"
                    contentEditable
                    suppressContentEditableWarning
                  />

                  <button
                    className="btn-eliminar"
                    onClick={() =>
                      eliminarItem(bloque.id, item.id)
                    }
                    contentEditable={false}
                    title="Eliminar campo"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                className="btn-agregar"
                onClick={() => agregarItem(bloque.id)}
              >
                +
              </button>
            </div>
          ))}
        </div>

        {/* BOTÓN NUEVO BLOQUE */}
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

export default Mimundo;