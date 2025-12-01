// Configuración de la API
// IMPORTANTE: Cambia este puerto si tu backend corre en otro lugar
const API_BASE_URL = 'http://localhost:3000/api';

// Estado de la aplicación
let currentSection = 'plataformas';

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadPlataformas();
    loadJuegos();
    loadEquipos();
});

// --- NAVEGACIÓN ---
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

    // Mostrar la seleccionada
    document.getElementById(sectionId).classList.add('active');
    
    // Actualizar botón activo
    const btnIndex = ['plataformas', 'juegos', 'equipos'].indexOf(sectionId);
    document.querySelectorAll('.nav-btn')[btnIndex].classList.add('active');

    currentSection = sectionId;
    
    // Recargar datos de la sección
    if(sectionId === 'plataformas') loadPlataformas();
    if(sectionId === 'juegos') loadJuegos();
    if(sectionId === 'equipos') loadEquipos();
}

// --- MODALES ---
function openModal(modalId, editData = null) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    
    // Limpiar formulario si es nuevo
    if (!editData) {
        modal.querySelector('form').reset();
        modal.querySelector('input[type="hidden"]').value = '';
        // Resetear título
        const title = modal.querySelector('h3');
        title.textContent = title.textContent.replace('Editar', 'Crear').replace('Crear/Editar', 'Crear');
    } else {
        // Llenar formulario si es edición
        const title = modal.querySelector('h3');
        title.textContent = 'Editar ' + title.textContent.split(' ')[1]; // Hack simple para el título
        
        // Lógica específica por tipo
        if (modalId === 'modal-plataforma') {
            document.getElementById('plat-id').value = editData.id;
            document.getElementById('plat-nombre').value = editData.nombre;
            document.getElementById('plat-marca').value = editData.marca;
        } else if (modalId === 'modal-juego') {
            document.getElementById('juego-id').value = editData.id;
            document.getElementById('juego-nombre').value = editData.nombre;
            document.getElementById('juego-tipo').value = editData.tipo;
            document.getElementById('juego-estudio').value = editData.estudio_dev;
            document.getElementById('juego-plataforma-id').value = editData.PLATAFORMA_id;
        } else if (modalId === 'modal-equipo') {
            document.getElementById('equipo-id').value = editData.id;
            document.getElementById('equipo-nombre').value = editData.nombre;
            document.getElementById('equipo-nivel').value = editData.nivel;
            document.getElementById('equipo-horas').value = editData.horas;
            document.getElementById('equipo-juego-id').value = editData.JUEGO_id;
        }
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// --- API & LOGICA: PLATAFORMAS ---

async function loadPlataformas() {
    try {
        const res = await fetch(`${API_BASE_URL}/plataformas`);
        if (!res.ok) throw new Error('Error al cargar plataformas');
        const data = await res.json();
        
        const tbody = document.getElementById('lista-plataformas');
        tbody.innerHTML = '';
        
        data.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.nombre}</td>
                <td>${item.marca}</td>
                <td>
                    <button class="btn-edit" onclick='editPlataforma(${JSON.stringify(item)})'>Editar</button>
                    <button class="btn-delete" onclick="deleteItem('plataformas', ${item.id})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error(error);
        // No mostrar alerta en carga inicial para no molestar si el backend no está listo
    }
}

function editPlataforma(item) {
    openModal('modal-plataforma', item);
}

document.getElementById('form-plataforma').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('plat-id').value;
    const data = {
        nombre: document.getElementById('plat-nombre').value,
        marca: document.getElementById('plat-marca').value
    };

    try {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_BASE_URL}/plataformas/${id}` : `${API_BASE_URL}/plataformas`;
        
        const res = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            closeModal('modal-plataforma');
            loadPlataformas();
            alert('Operación exitosa');
        } else {
            alert('Error al guardar');
        }
    } catch (error) {
        console.error(error);
        alert('Error de conexión');
    }
});

// --- API & LOGICA: JUEGOS ---

async function loadJuegos() {
    try {
        const res = await fetch(`${API_BASE_URL}/juegos`);
        if (!res.ok) throw new Error('Error al cargar juegos');
        const data = await res.json();
        
        const tbody = document.getElementById('lista-juegos');
        tbody.innerHTML = '';
        
        data.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.nombre}</td>
                <td>${item.tipo}</td>
                <td>${item.estudio_dev}</td>
                <td>${item.PLATAFORMA_id}</td>
                <td>
                    <button class="btn-edit" onclick='editJuego(${JSON.stringify(item)})'>Editar</button>
                    <button class="btn-delete" onclick="deleteItem('juegos', ${item.id})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error(error);
    }
}

function editJuego(item) {
    openModal('modal-juego', item);
}

document.getElementById('form-juego').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('juego-id').value;
    const data = {
        nombre: document.getElementById('juego-nombre').value,
        tipo: document.getElementById('juego-tipo').value,
        estudio_dev: document.getElementById('juego-estudio').value,
        PLATAFORMA_id: document.getElementById('juego-plataforma-id').value
    };

    try {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_BASE_URL}/juegos/${id}` : `${API_BASE_URL}/juegos`;
        
        const res = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            closeModal('modal-juego');
            loadJuegos();
            alert('Operación exitosa');
        } else {
            alert('Error al guardar');
        }
    } catch (error) {
        console.error(error);
        alert('Error de conexión');
    }
});

// --- API & LOGICA: EQUIPOS ---

async function loadEquipos() {
    try {
        const res = await fetch(`${API_BASE_URL}/equipos`);
        if (!res.ok) throw new Error('Error al cargar equipos');
        const data = await res.json();
        
        const tbody = document.getElementById('lista-equipos');
        tbody.innerHTML = '';
        
        data.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.nombre}</td>
                <td>${item.nivel}</td>
                <td>${item.JUEGO_id}</td>
                <td>
                    <button class="btn-edit" onclick='editEquipo(${JSON.stringify(item)})'>Editar</button>
                    <button class="btn-delete" onclick="deleteItem('equipos', ${item.id})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error(error);
    }
}

function editEquipo(item) {
    openModal('modal-equipo', item);
}

document.getElementById('form-equipo').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('equipo-id').value;
    const data = {
        nombre: document.getElementById('equipo-nombre').value,
        nivel: document.getElementById('equipo-nivel').value,
        horas: document.getElementById('equipo-horas').value,
        JUEGO_id: document.getElementById('equipo-juego-id').value
    };

    try {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_BASE_URL}/equipos/${id}` : `${API_BASE_URL}/equipos`;
        
        const res = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            closeModal('modal-equipo');
            loadEquipos();
            alert('Operación exitosa');
        } else {
            alert('Error al guardar');
        }
    } catch (error) {
        console.error(error);
        alert('Error de conexión');
    }
});

// --- ELIMINAR GENÉRICO ---
async function deleteItem(endpoint, id) {
    if (!confirm('¿Estás seguro de eliminar este registro?')) return;

    try {
        const res = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            alert('Eliminado correctamente');
            if(endpoint === 'plataformas') loadPlataformas();
            if(endpoint === 'juegos') loadJuegos();
            if(endpoint === 'equipos') loadEquipos();
        } else {
            alert('Error al eliminar');
        }
    } catch (error) {
        console.error(error);
        alert('Error de conexión');
    }
}
