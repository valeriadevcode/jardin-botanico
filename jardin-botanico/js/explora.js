function mostrarInfo(titulo, texto) {
  document.getElementById("infoTitulo").innerText = titulo;
  document.getElementById("infoTexto").innerText = texto;
  document.getElementById("infoModal").style.display = "block";
}

function cerrarInfo() {
  document.getElementById("infoModal").style.display = "none";
}
