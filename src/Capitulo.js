import { useState } from "react";
import "./Capitulo.css";

function Capitulo() {
  const [secciones] = useState([
    {
      id: 1,
      titulo: "Título del capítulo",
      ideas: [{ id: 1, text: "Escribe aquí el texto" }],
    },
  ]);

  return (
    <>
      {/* TÍTULO EDITABLE */}
      <h5
        className="Titulocap editabletexto"
        contentEditable
        suppressContentEditableWarning
      >
        Título del capítulo
      </h5>

      <section className="cap">
        <div className="capdiv">
          {secciones.map((seccion) => (
            <div className="panelcap" key={seccion.id}>
              {/* TEXTO DEL CAPÍTULO */}
              {seccion.ideas.map((idea) => (
                <p
                  key={idea.id}
                  contentEditable
                  suppressContentEditableWarning
                  className="editabletexto"
                >
                  {idea.text}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Capitulo;
