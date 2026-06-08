<template>
  <div>

    <div class="header">
      <h1>Gestión de Vacaciones</h1>

      <button @click="abrirNuevaVacacion">
        Nueva Solicitud
      </button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Empleado</th>
          <th>Antigüedad</th>
          <th>Días Disponibles</th>
          <th>Fecha Inicio</th>
          <th>Fecha Fin</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>

        <tr v-for="vac in vacations" :key="vac.id">
          <td>{{ vac.empleado }}</td>
          <td>{{ vac.antiguedad }} años</td>
          <td>{{ vac.diasDisponibles }}</td>
          <td>{{ vac.fechaInicio }}</td>
          <td>{{ vac.fechaFin }}</td>
          <td>{{ vac.estado }}</td>

          <td>
            <button @click="editarVacacion(vac)">
              Editar
            </button>

            <button @click="eliminarVacacion(vac.id)">
              Eliminar
            </button>
          </td>
        </tr>

      </tbody>
    </table>

    <!-- Modal -->

    <div v-if="showForm" class="modal">

      <div class="modal-content">

        <h2>
          {{ editando ? 'Editar Vacación' : 'Nueva Vacación' }}
        </h2>

        <input
          v-model="nuevaVacacion.empleado"
          placeholder="Nombre del empleado"
        />

        <input
          type="number"
          v-model="nuevaVacacion.antiguedad"
          placeholder="Antigüedad en años"
        />

        <input
          type="date"
          v-model="nuevaVacacion.fechaInicio"
        />

        <input
          type="date"
          v-model="nuevaVacacion.fechaFin"
        />

        <div class="info">
          Días disponibles:
          <strong>{{ calcularDias(nuevaVacacion.antiguedad) }}</strong>
        </div>

        <div class="buttons">

          <button @click="guardarVacacion">
            Guardar
          </button>

          <button @click="showForm = false">
            Cancelar
          </button>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showForm = ref(false)
const editando = ref(false)
const vacacionEditandoId = ref<number | null>(null)

const vacations = ref([
  {
    id: 1,
    empleado: 'Juan Pérez',
    antiguedad: 3,
    diasDisponibles: 15,
    fechaInicio: '2026-06-10',
    fechaFin: '2026-06-25',
    estado: 'Aprobado'
  }
])

const nuevaVacacion = ref({
  empleado: '',
  antiguedad: 1,
  fechaInicio: '',
  fechaFin: ''
})

const calcularDias = (antiguedad: number) => {

  if (antiguedad < 5) {
    return 15
  }

  if (antiguedad < 10) {
    return 20
  }

  return 30
}

const abrirNuevaVacacion = () => {

  editando.value = false

  nuevaVacacion.value = {
    empleado: '',
    antiguedad: 1,
    fechaInicio: '',
    fechaFin: ''
  }

  showForm.value = true
}

const guardarVacacion = () => {

  if (
    !nuevaVacacion.value.empleado ||
    !nuevaVacacion.value.fechaInicio ||
    !nuevaVacacion.value.fechaFin
  ) {
    alert('Complete todos los campos')
    return
  }

  if (editando.value) {

    vacations.value = vacations.value.map(v => {

      if (v.id === vacacionEditandoId.value) {

        return {
          ...v,
          empleado: nuevaVacacion.value.empleado,
          antiguedad: Number(nuevaVacacion.value.antiguedad),
          diasDisponibles: calcularDias(
            Number(nuevaVacacion.value.antiguedad)
          ),
          fechaInicio: nuevaVacacion.value.fechaInicio,
          fechaFin: nuevaVacacion.value.fechaFin
        }
      }

      return v
    })

  } else {

    vacations.value.push({
      id: Date.now(),
      empleado: nuevaVacacion.value.empleado,
      antiguedad: Number(nuevaVacacion.value.antiguedad),
      diasDisponibles: calcularDias(
        Number(nuevaVacacion.value.antiguedad)
      ),
      fechaInicio: nuevaVacacion.value.fechaInicio,
      fechaFin: nuevaVacacion.value.fechaFin,
      estado: 'Pendiente'
    })

  }

  showForm.value = false
}

const editarVacacion = (vac: any) => {

  editando.value = true
  vacacionEditandoId.value = vac.id

  nuevaVacacion.value = {
    empleado: vac.empleado,
    antiguedad: vac.antiguedad,
    fechaInicio: vac.fechaInicio,
    fechaFin: vac.fechaFin
  }

  showForm.value = true
}

const eliminarVacacion = (id: number) => {

  vacations.value = vacations.value.filter(
    vac => vac.id !== id
  )
}
</script>

<style scoped>
.header{
  display:flex;
  justify-content:space-between;
  margin-bottom:20px;
}

table{
  width:100%;
  background:white;
  border-collapse:collapse;
}

th,
td{
  border:1px solid #ddd;
  padding:10px;
  color:black;
}

th{
  background:#1f2937;
  color:white;
}

button{
  padding:8px 12px;
  cursor:pointer;
}

.modal{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;

  background:rgba(0,0,0,.5);

  display:flex;
  justify-content:center;
  align-items:center;
}

.modal-content{
  background:white;
  width:450px;
  padding:20px;

  display:flex;
  flex-direction:column;
  gap:10px;
}

.buttons{
  display:flex;
  justify-content:end;
  gap:10px;
}

.info{
  padding:10px;
  background:#eff6ff;
  border-radius:8px;
}
</style>