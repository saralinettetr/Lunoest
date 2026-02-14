import { useState } from "react";
import "./MisIdeas.css";

function MisIdeas() {
  const [secciones, setSecciones] = useState([
    {
      id: 1,
      titulo: "Nueva sección",
      ideas: [{ id: 1, text: "Nueva idea" }],
    },
  ]);

  /* ======================
     DRAG IDEAS
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
        ideas: [{ id: Date.now(), text: "Nueva idea" }],
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
                { id: Date.now(), text: "Nueva idea" },
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
     DRAG IDEAS
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
      <h5 className="tituloMisIdeas">Mis ideas</h5>

      <section className="mis-ideas">
        <div className="secciones">
          {secciones.map((seccion, seccionIndex) => (
            <div
              className="panel1"
              key={seccion.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onSeccionDrop(seccionIndex)}
            >
              {/* ENCABEZADO SECCIÓN */}
              <div className="panelencabezado">
                <span
                  className="moverseccion1"
                  draggable
                  onDragStart={() => onSeccionDragStart(seccionIndex)}
                >
                  ≡
                </span>

                <h6
                  contentEditable
                  suppressContentEditableWarning
                  className="editable"
                >
                  {seccion.titulo}
                </h6>

                <span
                  className="eliminar"
                  onClick={() => eliminarSeccion(seccion.id)}
                >
                  ✕
                </span>
              </div>

              {/* IDEAS */}
              
            <div className="divideas">
              {seccion.ideas.map((idea, ideaIndex) => (
                <div
                  className="idea1"
                  key={idea.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onIdeaDrop(seccion.id, ideaIndex)}
                >
                  

                  <div className="idea-actions">
                    <span
                      className="moverIdea"
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
                    className="editable"
                  >
                    {idea.text}
                  </p>

                    <span
                      className="eliminar"
                      onClick={() =>
                        eliminarIdea(seccion.id, idea.id)
                      }
                    >
                      ✕
                    </span>
                  </div>
                </div>
                
              ))}</div>

              {/* BOTÓN AGREGAR IDEA */}
              <button
                className="btn-add idea"
                onClick={() => agregarIdea(seccion.id)}
              >
                +
              </button>
            </div>
          ))}
        </div>

        {/* BOTÓN AGREGAR SECCIÓN */}
        <button className="btn-add section" onClick={agregarSeccion}>
          +
        </button>
      </section>
      <br></br>   <br></br>     
    </>
  );
}

export default MisIdeas;
