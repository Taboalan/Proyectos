let dragged;

document.querySelectorAll('.draggable').forEach(img => {
  img.addEventListener('dragstart', e => {
    dragged = e.target;
  });
});

document.querySelectorAll('.dropzone').forEach(zone => {
  zone.addEventListener('dragover', e => e.preventDefault());

  zone.addEventListener('dragenter', function () {
    this.classList.add('hovered');
  });

  zone.addEventListener('dragleave', function () {
    this.classList.remove('hovered');
  });

  zone.addEventListener('drop', function () {
    this.classList.remove('hovered');

    const expected = this.dataset.animal;
    const actual = dragged.id;

    if (expected === actual) {
      this.innerHTML = '';
      this.appendChild(dragged);
      this.classList.add('correct');
      checkWin();
    } else {
      this.classList.add('incorrect');
      setTimeout(() => this.classList.remove('incorrect'), 800);
    }
  });
});

function checkWin() {
  const allZones = document.querySelectorAll('.dropzone');
  const allCorrect = Array.from(allZones).every(zone =>
    zone.querySelector('img') && zone.dataset.animal === zone.querySelector('img').id
  );

  if (allCorrect) {
    document.getElementById('mensaje').textContent = '🎉 ¡Correcto! Todas las imágenes están en su lugar.';
  }
}
document.getElementById('reiniciar').addEventListener('click', () => {
  const contenedorOriginal = document.getElementById('contenedor-imagenes'); 
  const imagenes = document.querySelectorAll('.draggable');
  const zonas = document.querySelectorAll('.dropzone');

  zonas.forEach(zona => {
   zona.querySelectorAll('img').forEach(img => img.remove());
    zona.classList.remove('correct', 'incorrect');
  });

  // Devolver imágenes al contenedor original
  imagenes.forEach(img => {
    contenedorOriginal.appendChild(img);
  
  });

  // Resetear mensaje si hay
  const mensaje = document.getElementById('mensaje');
  if (mensaje) mensaje.innerHTML = '';
});
