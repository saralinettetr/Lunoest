import { useState } from "react";
import "./MisPersonajes.css";

const caracteristicasBase = [
  "Edad",
  "Cualidades",
  "Defectos",
  "Habilidades",
  "Debilidades",
  "Pasatiempos",
  "Gustos",
  "Descripción",
];

const crearPersonaje = () => ({
  id: Date.now() + Math.random(),
  caracteristicas: caracteristicasBase.map((c) => ({
    id: Date.now() + Math.random(),
    pregunta: c,
    respuesta: "",
  })),
});

function MisPersonajes() {
  const [secciones, setSecciones] = useState([
    {
      id: 1,
      titulo: "Personajes principales",
      ideas: [crearPersonaje(), crearPersonaje(), crearPersonaje()],
    },
    {
      id: 2,
      titulo: "Personajes secundarios",
      ideas: [crearPersonaje(), crearPersonaje(), crearPersonaje()],
    },
    {
      id: 3,
      titulo: "Personajes terciarios",
      ideas: [crearPersonaje(), crearPersonaje(), crearPersonaje()],
    },
  ]);

  const [dragIdea, setDragIdea] = useState({
    seccionId: null,
    ideaIndex: null,
  });

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
        ideas: [crearPersonaje()],
      },
    ]);
  };

  const agregarIdea = (seccionId) => {
    setSecciones(
      secciones.map((seccion) =>
        seccion.id === seccionId
          ? { ...seccion, ideas: [...seccion.ideas, crearPersonaje()] }
          : seccion
      )
    );
  };

  const agregarCaracteristica = (seccionId, ideaId) => {
    setSecciones(
      secciones.map((seccion) =>
        seccion.id === seccionId
          ? {
              ...seccion,
              ideas: seccion.ideas.map((idea) =>
                idea.id === ideaId
                  ? {
                      ...idea,
                      caracteristicas: [
                        ...idea.caracteristicas,
                        {
                          id: Date.now() + Math.random(),
                          pregunta: "Nueva característica",
                          respuesta: "",
                        },
                      ],
                    }
                  : idea
              ),
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
     DRAG
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
        const [movida] = nuevasIdeas.splice(dragIdea.ideaIndex, 1);
        nuevasIdeas.splice(dropIndex, 0, movida);

        return { ...seccion, ideas: nuevasIdeas };
      })
    );

    setDragIdea({ seccionId: null, ideaIndex: null });
  };

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
      <h5 className="tituloPersonajes">Mis personajes</h5>

      <section className="TodosPersonajes">
        <div className="seccionespjs">
          {secciones.map((seccion, seccionIndex) => (
            <div
              className="panelpjs"
              key={seccion.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onSeccionDrop(seccionIndex)}
            >
              <div className="tipodepjs">
                <span
                  className="moverseccionpjs"
                  draggable
                  onDragStart={() => onSeccionDragStart(seccionIndex)}
                >
                  ≡
                </span>

                <h6
                  contentEditable
                  suppressContentEditableWarning
                  className="editabletipospjs"
                >
                  {seccion.titulo}
                </h6>

                <span
                  className="eliminarpjs seccion"
                  onClick={() => eliminarSeccion(seccion.id)}
                >
                  ✕
                </span>
              </div>

              <div className="contenedor-tarjetas">
                {seccion.ideas.map((idea, ideaIndex) => (
                  <div
                    className="pjs"
                    key={idea.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => onIdeaDrop(seccion.id, ideaIndex)}
                  >
                    <div className="tarjetapj">
                      <div className="pj-header">

                      <span
                          className="moverpjs"
                          draggable
                          onDragStart={() =>
                            onIdeaDragStart(seccion.id, ideaIndex)
                          }
                        >
                          ≡
                        </span>

                      <div
                          className="personaje-nombre"
                          contentEditable
                          suppressContentEditableWarning
                        >
                          Nombre
                        </div>

                        <span
                          className="eliminarpj"
                          onClick={() =>
                            eliminarIdea(seccion.id, idea.id)
                          }
                        >
                          ✕
                        </span>

                        

                        
                      </div>

                      <div className="caracteristicaspj">
                      {idea.caracteristicas.map((car) => (
                        <div key={car.id} className="fila-caracteristica">
                          <span
                            className="pregunta"
                            contentEditable
                            suppressContentEditableWarning
                          >
                            {car.pregunta}:
                          </span>

                          <span
                            className="respuesta"
                            contentEditable
                            suppressContentEditableWarning
                          />
                        </div>
                        
                      ))}

                      {/* BOTÓN NUEVA CARACTERÍSTICA */}
                      <button
                        className="añadirpj caract"
                        onClick={() =>
                          agregarCaracteristica(seccion.id, idea.id)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  </div>
                ))}
              </div>

              <button
                className="añadirpj escsecc"
                onClick={() => agregarIdea(seccion.id)}
              >
                +
              </button>
            </div>
          ))}

<div class="contenedor-boton-caps">
        <button className="añadirpj caps" onClick={agregarSeccion}>
          +
        </button>
        </div>
        </div>

     
      </section>
      <br></br>   <br></br>  <br></br>   <br></br>  
    </>
  );
}

export default MisPersonajes;
