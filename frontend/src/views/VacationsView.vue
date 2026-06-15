<template>

<div class="vacaciones-container">

  <div class="header">

    <div>
      <h1>Gestión de Vacaciones</h1>
      <p class="subtitle">
        Administración y control de solicitudes vacacionales
      </p>
    </div>

    <button
      class="btn-primary"
      @click="abrirNuevaVacacion"
    >
      + Nueva Solicitud
    </button>

  </div>

  <!-- TARJETAS -->

  <div class="cards">

    <div class="card">
      <h3>Total Solicitudes</h3>
      <span>{{ vacations.length }}</span>
    </div>

    <div class="card">
      <h3>Pendientes</h3>
      <span>{{ pendientes }}</span>
    </div>

    <div class="card">
      <h3>Aprobadas</h3>
      <span>{{ aprobadas }}</span>
    </div>

    <div class="card">
      <h3>Rechazadas</h3>
      <span>{{ rechazadas }}</span>
    </div>

  </div>

  <!-- FILTRO -->

  <div class="filters">

    <select v-model="estadoFiltro">

      <option value="">
        Todos los estados
      </option>

      <option value="PENDIENTE">
        Pendientes
      </option>

      <option value="APROBADA">
        Aprobadas
      </option>

      <option value="RECHAZADA">
        Rechazadas
      </option>

    </select>

  </div>

  <!-- TABLA -->

  <div class="table-container">

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

        <tr
          v-for="vac in vacacionesFiltradas"
          :key="vac.id"
        >

          <td>
            {{ vac.employee?.nombre }}
          </td>

          <td>
            {{ nuevaVacacion.antiguedad }} años
          </td>

          <td>
            {{ calcularDias(nuevaVacacion.antiguedad) }}
          </td>

          <td>
            {{ vac.fecha_inicio }}
          </td>

          <td>
            {{ vac.fecha_fin }}
          </td>

          <td>

            <span
              :class="[
                'badge',
                vac.estado.toLowerCase()
              ]"
            >
              {{ vac.estado }}
            </span>

          </td>

          <td>

            <button
              class="btn-edit"
              @click="editarVacacion(vac)"
            >
              Editar
            </button>

            <button
              class="btn-delete"
              @click="eliminarVacacion(vac.id)"
            >
              Eliminar
            </button>

          </td>

        </tr>

      </tbody>

    </table>

  </div>

  <!-- MODAL -->

  <div
    v-if="showForm"
    class="modal"
  >

    <div class="modal-content">

      <h2>

        {{
          editando
            ? 'Editar Vacación'
            : 'Nueva Solicitud'
        }}

      </h2>

      <select
        v-model="nuevaVacacion.employee_id"
      >

        <option value="">
          Seleccione empleado
        </option>

        <option
          v-for="emp in employees"
          :key="emp.id"
          :value="emp.id"
        >
          {{ emp.nombre }}
        </option>

      </select>

      <input
        type="number"
        v-model="nuevaVacacion.antiguedad"
        placeholder="Antigüedad"
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

        <strong>
          {{ calcularDias(nuevaVacacion.antiguedad) }}
        </strong>

      </div>

      <div class="buttons">

        <button
          class="btn-primary"
          @click="guardarVacacion"
        >
          Guardar
        </button>

        <button
          class="btn-secondary"
          @click="showForm = false"
        >
          Cancelar
        </button>

      </div>

    </div>

  </div>

</div>

</template>
<script setup lang="ts">

import {
  ref,
  computed,
  onMounted
} from 'vue'

import axios from 'axios'

const showForm = ref(false)

const editando = ref(false)

const vacacionEditandoId =
  ref<number | null>(null)

const vacations = ref<any[]>([])

const employees = ref<any[]>([])

const estadoFiltro = ref('')

const nuevaVacacion = ref({

  employee_id: '',

  antiguedad: 1,

  fechaInicio: '',

  fechaFin: ''

})

/* ==========================
   ESTADÍSTICAS DASHBOARD
========================== */

const pendientes = computed(() =>

  vacations.value.filter(

    v =>
      v.estado === 'PENDIENTE'

  ).length

)

const aprobadas = computed(() =>

  vacations.value.filter(

    v =>
      v.estado === 'APROBADA'

  ).length

)

const rechazadas = computed(() =>

  vacations.value.filter(

    v =>
      v.estado === 'RECHAZADA'

  ).length

)

/* ==========================
   FILTRO
========================== */

const vacacionesFiltradas =
computed(() => {

  if (!estadoFiltro.value) {

    return vacations.value

  }

  return vacations.value.filter(

    v =>
      v.estado ===
      estadoFiltro.value

  )

})

/* ==========================
   CARGAR VACACIONES
========================== */

const cargarVacaciones =
async () => {

  try {

    const response =
      await axios.get(
        'http://localhost:3000/vacations'
      )

    vacations.value =
      response.data

  } catch (error) {

    console.error(
      'Error cargando vacaciones',
      error
    )

  }

}

/* ==========================
   CARGAR EMPLEADOS
========================== */

const cargarEmpleados =
async () => {

  try {

    const response =
      await axios.get(
        'http://localhost:3000/employees'
      )

    employees.value =
      response.data

  } catch (error) {

    console.error(
      'Error cargando empleados',
      error
    )

  }

}

/* ==========================
   CÁLCULO DE DÍAS
========================== */

const calcularDias =
(
  antiguedad: number
) => {

  if (antiguedad < 5) {

    return 15

  }

  if (antiguedad < 10) {

    return 20

  }

  return 30

}

/* ==========================
   NUEVA VACACIÓN
========================== */

const abrirNuevaVacacion =
() => {

  editando.value = false

  nuevaVacacion.value = {

    employee_id: '',

    antiguedad: 1,

    fechaInicio: '',

    fechaFin: ''

  }

  showForm.value = true

}

/* ==========================
   GUARDAR VACACIÓN
========================== */

const guardarVacacion =
async () => {

  if (

    !nuevaVacacion.value.employee_id ||

    !nuevaVacacion.value.fechaInicio ||

    !nuevaVacacion.value.fechaFin

  ) {

    alert(
      'Complete todos los campos'
    )

    return

  }

  try {

    if (editando.value) {

      await axios.patch(

        `http://localhost:3000/vacations/${vacacionEditandoId.value}`,

        {

          employee_id: Number(
            nuevaVacacion.value.employee_id
          ),

          fecha_inicio:
            nuevaVacacion.value.fechaInicio,

          fecha_fin:
            nuevaVacacion.value.fechaFin

        }

      )

    } else {

      await axios.post(

        'http://localhost:3000/vacations',

        {

          employee_id: Number(
            nuevaVacacion.value.employee_id
          ),

          fecha_inicio:
            nuevaVacacion.value.fechaInicio,

          fecha_fin:
            nuevaVacacion.value.fechaFin,

          estado: 'PENDIENTE'

        }

      )

    }

    await cargarVacaciones()

    showForm.value = false

  } catch (error) {

    console.error(
      'Error guardando vacación',
      error
    )

  }

}

/* ==========================
   EDITAR
========================== */

const editarVacacion =
(vac: any) => {

  editando.value = true

  vacacionEditandoId.value =
    vac.id

  nuevaVacacion.value = {

    employee_id:
      vac.employee_id,

    antiguedad: 1,

    fechaInicio:
      vac.fecha_inicio,

    fechaFin:
      vac.fecha_fin

  }

  showForm.value = true

}

/* ==========================
   ELIMINAR
========================== */

const eliminarVacacion =
async (
  id: number
) => {

  const confirmar =
    confirm(
      '¿Desea eliminar esta solicitud?'
    )

  if (!confirmar) return

  try {

    await axios.delete(

      `http://localhost:3000/vacations/${id}`

    )

    await cargarVacaciones()

  } catch (error) {

    console.error(
      'Error eliminando vacación',
      error
    )

  }

}

/* ==========================
   MOUNT
========================== */

onMounted(() => {

  cargarVacaciones()

  cargarEmpleados()

})

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
.cards{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:15px;
  margin-bottom:20px;
}

.card{
  background:white;
  padding:20px;
  border-radius:12px;
  box-shadow:0 2px 8px rgba(0,0,0,.1);
}

.card h3{
  margin:0;
  font-size:14px;
  color:#6b7280;
}

.card span{
  font-size:30px;
  font-weight:bold;
  color:#111827;
}

.filters{
  margin-bottom:15px;
}

.badge{
  padding:6px 12px;
  border-radius:20px;
  font-size:12px;
  font-weight:bold;
}

.pendiente{
  background:#fef3c7;
  color:#92400e;
}

.aprobada{
  background:#dcfce7;
  color:#166534;
}

.rechazada{
  background:#fee2e2;
  color:#991b1b;
}
</style>