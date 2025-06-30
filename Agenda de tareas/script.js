const dropzones = document.querySelectorAll('.dropzone');
let draggedItem = null;

// Cargar tareas desde localStorage al inicio
window.onload = function () {
    const savedData = JSON.parse(localStorage.getItem('kanbanData'));
    if (savedData) {
        for (const zoneId in savedData) {
            const zone = document.getElementById(zoneId);
            savedData[zoneId].forEach(taskText => {
                const item = createTaskElement(taskText);
                zone.appendChild(item);
            });
        }
    }
};

// Crear una nueva tarea con eventos
function createTaskElement(text) {
    const div = document.createElement('div');
    div.className = 'item';
    div.textContent = text;
    div.setAttribute('draggable', 'true');

    // Drag and drop
    div.addEventListener('dragstart', dragStart);
    div.addEventListener('dragend', dragEnd);

    // Edición al hacer doble clic
    div.addEventListener('dblclick', () => {
        const newText = prompt('Editar tarea:', div.textContent);
        if (newText !== null && newText.trim() !== '') {
            div.textContent = newText.trim();
            addDeleteButton(div);
            saveState();
        }
    });

    // Botón eliminar
    addDeleteButton(div);

    return div;
}

// Botón de eliminar
function addDeleteButton(taskEl) {
    const btn = document.createElement('button');
    btn.className = 'delete-btn';
    btn.textContent = '✖';
    btn.onclick = (e) => {
        e.stopPropagation();
        taskEl.remove();
        saveState();
    };
    taskEl.appendChild(btn);
}

// Agregar nueva tarea
function addTask() {
    const input = document.getElementById('new-task');
    const text = input.value.trim();
    if (text === '') return;

    const newTask = createTaskElement(text);
    document.getElementById('todo').appendChild(newTask);
    input.value = '';
    saveState();
}

// Drag and drop
function dragStart() {
    draggedItem = this;
    setTimeout(() => this.style.display = 'none', 0);
}

function dragEnd() {
    this.style.display = 'block';
    draggedItem = null;
    saveState();
}

dropzones.forEach(zone => {
    zone.addEventListener('dragover', e => e.preventDefault());
    zone.addEventListener('dragenter', function () {
        this.classList.add('hovered');
    });
    zone.addEventListener('dragleave', function () {
        this.classList.remove('hovered');
    });
    zone.addEventListener('drop', function () {
        this.classList.remove('hovered');
        if (draggedItem) {
            this.appendChild(draggedItem);
            saveState();
        }
    });
});

// Guardar estado
function saveState() {
    const data = {};
    dropzones.forEach(zone => {
        const items = Array.from(zone.querySelectorAll('.item')).map(item => {
            // Evitar guardar texto del botón eliminar
            return item.childNodes[0].nodeValue.trim();
        });
        data[zone.id] = items;
    });
    localStorage.setItem('kanbanData', JSON.stringify(data));
}
function resetBoard(){
    if (confirm('Seguro que deseas borrar todas las tareas')){
        dropzones.forEach(zone => zone.innerHTML = <h3>${zone.querySelector('h3').t}</h3>)
    }
}