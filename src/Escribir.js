import { useState } from "react";
import { Link } from "react-router-dom";
import "./Escribe.css";
import edit from "./assets/editar.webp";
import edit2 from "./assets/editar2.webp";

function Escribe() {
    const [secciones, setSecciones] = useState([
        {
          id: 1,
          titulo: "Introducción",
          ideas: [{ id: 1, text: "Título del capítulo" }],
        },
        {
          id: 2,
          titulo: "Desarrollo",
          ideas: [{ id: 2, text: "Título del capítulo" }],
        },
        {
          id: 3,
          titulo: "Clímax",
          ideas: [{ id: 3, text: "Título del capítulo" }],
        },
        {
          id: 4,
          titulo: "Desenlace",
          ideas: [{ id: 4, text: "Título del capítulo" }],
        },
      ]);

  /* ======================
     DRAG CAPS
  ====================== */
  const [dragIdea, setDragIdea] = useState({
    seccionId: null,
    ideaIndex: null,
  });

  /* ======================
     DRAG SECCIONES
  ====================== */
  const [dragSeccionIndex, setDragSeccionIndex] = useState(null);

  /* ======================
     AGREGAR
  ====================== */
  const agregarSeccion = () => {
    setSecciones([
      ...secciones,
      {
        id: Date.now(),
        titulo: "Nueva sección",
        ideas: [{ id: Date.now(), text: "Título del capítulo" }],
      },
    ]);
  };

  const agregarIdea = (seccionId) => {
    setSecciones(
      secciones.map((seccion) =>
        seccion.id === seccionId
          ? {
              ...seccion,
              ideas: [
                ...seccion.ideas,
                { id: Date.now(), text: "Título del capítulo" },
              ],
            }
          : seccion
      )
    );
  };

  /* ======================
     ELIMINAR
  ====================== */
  const eliminarSeccion = (seccionId) => {
    setSecciones(secciones.filter((s) => s.id !== seccionId));
  };

  const eliminarIdea = (seccionId, ideaId) => {
    setSecciones(
      secciones.map((seccion) =>
        seccion.id === seccionId
          ? {
              ...seccion,
              ideas: seccion.ideas.filter((i) => i.id !== ideaId),
            }
          : seccion
      )
    );
  };

  /* ======================
     DRAG CAPS
  ====================== */
  const onIdeaDragStart = (seccionId, index) => {
    setDragIdea({ seccionId, ideaIndex: index });
  };

  const onIdeaDrop = (seccionId, dropIndex) => {
    if (dragIdea.seccionId !== seccionId) return;

    setSecciones((prev) =>
      prev.map((seccion) => {
        if (seccion.id !== seccionId) return seccion;

        const nuevasIdeas = [...seccion.ideas];
        const [ideaMovida] = nuevasIdeas.splice(dragIdea.ideaIndex, 1);
        nuevasIdeas.splice(dropIndex, 0, ideaMovida);

        return { ...seccion, ideas: nuevasIdeas };
      })
    );

    setDragIdea({ seccionId: null, ideaIndex: null });
  };

  /* ======================
     DRAG SECCIONES
  ====================== */
  const onSeccionDragStart = (index) => {
    setDragSeccionIndex(index);
  };

  const onSeccionDrop = (dropIndex) => {
    if (dragSeccionIndex === null) return;

    setSecciones((prev) => {
      const nuevas = [...prev];
      const [movida] = nuevas.splice(dragSeccionIndex, 1);
      nuevas.splice(dropIndex, 0, movida);
      return nuevas;
    });

    setDragSeccionIndex(null);
  };

  return (
    <>
      <h5 className="tituloEscribe">Escribe</h5>

      <section className="Escribir">
        <div className="seccionescaps">
          {secciones.map((seccion, seccionIndex) => (

            /*-- Introducción--*/
            <div
              className="panelcaps"
              key={seccion.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onSeccionDrop(seccionIndex)}
            >
              {/* ENCABEZADO SECCIÓN */}
              <div className="panelencabezadoescrib">
                <span
                  className="moverseccioncap"
                  draggable
                  onDragStart={() => onSeccionDragStart(seccionIndex)}
                >
                  ≡
                </span>

                <h6
                  contentEditable
                  suppressContentEditableWarning
                  className="editableescribir"
                >
                  {seccion.titulo}
                </h6>

                <span
                  className="eliminaresc seccion"
                  onClick={() => eliminarSeccion(seccion.id)}
                >
                  ✕
                </span>
              </div>

              {/* IDEAS */}
              {/* IDEAS */}
<div className="listacaps">
  {seccion.ideas.map((idea, ideaIndex) => (
    <div
      className="caps"
      key={idea.id}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onIdeaDrop(seccion.id, ideaIndex)}
    >
      <div className="accionescaps">
        <span
          className="movercaps"
          draggable
          onDragStart={() =>
            onIdeaDragStart(seccion.id, ideaIndex)
          }
        >
          ≡
        </span>

        <p
          contentEditable
          suppressContentEditableWarning
          className="editableescribir"
        >
          {idea.text}
        </p>

        <Link to={`/capitulo`} className="editarcaps">
          <img src={edit} width="35" alt="editar" className="edit1"/>
          <img src={edit2} width="35" alt="editar2" className="edit2"/>
        </Link>

        <span
          className="eliminarcaps"
          onClick={() =>
            eliminarIdea(seccion.id, idea.id)
          }
        >
          ✕
        </span>
      </div>
    </div>
  ))}
</div>

              {/* BOTÓN AGREGAR CAP */}
              <button
                className="añadirescrib escsecc"
                onClick={() => agregarIdea(seccion.id)}
              >
                +
              </button>
            </div>
          ))}
        </div>

        {/* BOTÓN AGREGAR SECCIÓN */}
        <button className="añadirescrib caps" onClick={agregarSeccion}>
          +
        </button>
      </section>

      <br></br>   <br></br>   <br></br>   <br></br>       
  
    </>
  );
}

export default Escribe;
