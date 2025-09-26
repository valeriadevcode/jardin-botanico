function mostrarDetalle(fecha, texto) {
  document.getElementById("modalFecha").innerText = fecha;
  document.getElementById("modalTexto").innerText = texto;
  document.getElementById("detalleModal").style.display = "block";
}

function cerrarDetalle() {
  document.getElementById("detalleModal").style.display = "none";
}
