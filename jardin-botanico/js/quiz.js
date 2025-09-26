const preguntas = [
  {
    pregunta: "¿En qué año se trasladó el Jardín Botánico a la carretera Cotoca?",
    opciones: ["1983", "1990", "1985"],
    respuesta: "1983"
  },
  {
    pregunta: "¿En qué kilómetro de la carretera a Cotoca se encuentra el Jardín Botánico?",
    opciones: ["Km 5.5", "Km 8.5", "Km 10"],
    respuesta: "Km 8.5"
  },
  {
    pregunta: "¿Quién creó el Jardín Botánico Municipal de Santa Cruz?",
    opciones: ["Noel Kempff Mercado", "Simón Patiño", "Hernando Siles"],
    respuesta: "Noel Kempff Mercado"
  },
  {
    pregunta: "¿En qué fecha fue creado el Jardín Botánico?",
    opciones: ["25 de septiembre de 1985", "6 de agosto de 1980", "1 de mayo de 1990"],
    respuesta: "25 de septiembre de 1985"
  },
  {
    pregunta: "¿Qué significa la palabra botánica en griego?",
    opciones: ["Árbol", "Hierba o planta", "Flor"],
    respuesta: "Hierba o planta"
  },
  {
    pregunta: "¿Cuál de estas es una planta muy famosa en el Jardín Botánico?",
    opciones: ["Orquídeas", "Bambú gigante", "Cactus del Sahara"],
    respuesta: "Orquídeas"
  },
  {
    pregunta: "¿Qué árbol del Jardín también se conoce como árbol de gallito?",
    opciones: ["Ceibo", "Toborochi", "Tajibo"],
    respuesta: "Ceibo"
  },
  {
    pregunta: "¿Qué animales se pueden encontrar en el Jardín Botánico?",
    opciones: ["Perezosos, tortugas e iguanas", "Leones y tigres", "Pandas y koalas"],
    respuesta: "Perezosos, tortugas e iguanas"
  },
  {
    pregunta: "¿En qué mes se celebra el Festival de Orquídeas?",
    opciones: ["Marzo", "Mayo", "Agosto"],
    respuesta: "Marzo"
  },
  {
    pregunta: "¿Qué atractivo turístico se encuentra dentro del Jardín Botánico?",
    opciones: ["Laguna Natural", "Parque de diversiones mecánicas", "Museo del tren"],
    respuesta: "Laguna Natural"
  }
];


let preguntaActual = 0;

function mostrarPregunta() {
  const q = preguntas[preguntaActual];
  document.getElementById("pregunta").innerText = q.pregunta;
  const opcionesDiv = document.getElementById("opciones");
  opcionesDiv.innerHTML = "";

  q.opciones.forEach(opcion => {
    const btn = document.createElement("button");
    btn.innerText = opcion;
    btn.onclick = () => verificarRespuesta(opcion);
    opcionesDiv.appendChild(btn);
  });
}

function verificarRespuesta(opcion) {
  const q = preguntas[preguntaActual];
  const resultado = document.getElementById("resultado");

  if (opcion === q.respuesta) {
    resultado.innerText = "✅ ¡Correcto!";
    resultado.style.color = "green";
  } else {
    resultado.innerText = "❌ Incorrecto. La respuesta correcta es: " + q.respuesta;
    resultado.style.color = "red";
  }

  setTimeout(() => {
    preguntaActual++;
    if (preguntaActual < preguntas.length) {
      resultado.innerText = "";
      mostrarPregunta();
    } else {
      resultado.innerText = "🎉 ¡Has completado el quiz!";
    }
  }, 1500);
}

mostrarPregunta();
