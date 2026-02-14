import { useState } from "react";
import "./Lineasdeltiempo.css";

export default function Timeline() {
  const [lineas, setLineas] = useState([
    {
      id: Date.now(),
      titulo: "Línea principal",
      items: [
        { id: 1, title: "Título", desc: "Descripción" },
        { id: 2, title: "Título", desc: "Descripción" },
        { id: 3, title: "Título", desc: "Descripción" },
        { id: 4, title: "Título", desc: "Descripción" },
        { id: 5, title: "Título", desc: "Descripción" },
      ],
    },
  ]);

  const [dragTarjetaIndex, setDragTarjetaIndex] = useState(null);
  const [dragLineaIndex, setDragLineaIndex] = useState(null);
  const [lineaActiva, setLineaActiva] = useState(null);

  /* ===============================
     TARJETAS
  =============================== */

  const addItem = (lineaId) => {
    setLineas((prev) =>
      prev.map((l) =>
        l.id === lineaId
          ? {
              ...l,
              items: [
                ...l.items,
                { id: Date.now(), title: "Título", desc: "Descripción" },
              ],
            }
          : l
      )
    );
  };

  const removeItem = (lineaId, itemId) => {
    setLineas((prev) =>
      prev.map((l) =>
        l.id === lineaId
          ? { ...l, items: l.items.filter((i) => i.id !== itemId) }
          : l
      )
    );
  };

  const updateItem = (lineaId, itemId, field, value) => {
    setLineas((prev) =>
      prev.map((l) =>
        l.id === lineaId
          ? {
              ...l,
              items: l.items.map((i) =>
                i.id === itemId ? { ...i, [field]: value } : i
              ),
            }
          : l
      )
    );
  };

  const handleDropTarjeta = (lineaId, dropIndex) => {
    if (dragTarjetaIndex === null) return;

    setLineas((prev) =>
      prev.map((l) => {
        if (l.id !== lineaId) return l;

        const updated = [...l.items];
        const temp = updated[dragTarjetaIndex];
        updated[dragTarjetaIndex] = updated[dropIndex];
        updated[dropIndex] = temp;

        return { ...l, items: updated };
      })
    );

    setDragTarjetaIndex(null);
    setLineaActiva(null);
  };

  /* ===============================
     LÍNEAS DEL TIEMPO
  =============================== */

  const addLinea = () => {
    setLineas((prev) => [
      ...prev,
      {
        id: Date.now(),
        titulo: "Nueva línea",
        items: [{ id: 1, title: "Título", desc: "Descripción" },
            { id: 2, title: "Título", desc: "Descripción" },
            { id: 3, title: "Título", desc: "Descripción" },
            { id: 4, title: "Título", desc: "Descripción" },
            { id: 5, title: "Título", desc: "Descripción" }],
      },
    ]);
  };

  const removeLinea = (lineaId) => {
    setLineas((prev) => prev.filter((l) => l.id !== lineaId));
  };

  const updateLineaTitulo = (lineaId, value) => {
    setLineas((prev) =>
      prev.map((l) => (l.id === lineaId ? { ...l, titulo: value } : l))
    );
  };

  const handleDropLinea = (dropIndex) => {
    if (dragLineaIndex === null || dragLineaIndex === dropIndex) return;

    setLineas((prev) => {
      const updated = [...prev];
      const temp = updated[dragLineaIndex];
      updated[dragLineaIndex] = updated[dropIndex];
      updated[dropIndex] = temp;
      return updated;
    });

    setDragLineaIndex(null);
  };

  return (
    <>
      <h5 className="tituloLineas">Líneas del tiempo</h5>

      {lineas.map((linea, lineaIndex) => (
        <div
          className="seccionlinea"
          key={linea.id}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDropLinea(lineaIndex)}
        >
          {/* CABECERA */}
          <div className="cabeceralinea">
            <div
              className="arrastrarlinea"
              draggable
              onDragStart={() => setDragLineaIndex(lineaIndex)}
              onDragEnd={() => setDragLineaIndex(null)}
            >
              ☰
            </div>

            <h6
              className="tipodelinea"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                updateLineaTitulo(linea.id, e.target.innerText)
              }
            >
              {linea.titulo}
            </h6>

            <button
              className="eliminarlinea"
              onClick={() => removeLinea(linea.id)}
            >
              ✕
            </button>
          </div>

          {/* LÍNEA */}
          <div className="linea">
            <div className="contenidolinea">
              <div className="lineacentral" />

              {linea.items.map((item, index) => (
                <div
                  key={item.id}
                  className={`tarjeta ${
                    index % 2 === 0 ? "top" : "bottom"
                  }`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDropTarjeta(linea.id, index)}
                >
                  <button
                    className="eliminartarjeta"
                    onClick={() => removeItem(linea.id, item.id)}
                  >
                    ✕
                  </button>

                  <div
                    className="arrastrartarjeta"
                    draggable
                    onDragStart={() => {
                      setDragTarjetaIndex(index);
                      setLineaActiva(linea.id);
                    }}
                    onDragEnd={() => {
                      setDragTarjetaIndex(null);
                      setLineaActiva(null);
                    }}
                  >
                    ☰
                  </div>

                  <h3
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      updateItem(
                        linea.id,
                        item.id,
                        "title",
                        e.target.innerText
                      )
                    }
                  >
                    {item.title}
                  </h3>

                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      updateItem(
                        linea.id,
                        item.id,
                        "desc",
                        e.target.innerText
                      )
                    }
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            </div>
            <button
              className="añadirtarjeta"
              onClick={() => addItem(linea.id)}
            >
              +
            </button>
          </div>
        
      ))}

      {/* BOTÓN NUEVA LÍNEA */}
      <div className="contenedorNuevaLinea">
        <button className="añadirLineaTiempo" onClick={addLinea}>
          + 
        </button>
      </div>
    </>
  );
}
