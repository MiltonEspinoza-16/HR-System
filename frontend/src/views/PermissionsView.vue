<template>

  <div>

    <div class="header">

      <h1>Gestión de Permisos</h1>

      <button
        @click="abrirNuevoPermiso"
      >
        Nuevo Permiso
      </button>

    </div>

    <table>

      <thead>

        <tr>

          <th>Empleado</th>

          <th>Motivo</th>

          <th>Fecha Inicio</th>

          <th>Fecha Fin</th>

          <th>Estado</th>

          <th>Acciones</th>

        </tr>

      </thead>

      <tbody>

        <tr
          v-for="permission in permissions"
          :key="permission.id"
        >

          <td>
            {{ permission.employee?.nombre }}
          </td>

          <td>
            {{ permission.motivo }}
          </td>

          <td>
            {{ permission.fecha_inicio }}
          </td>

          <td>
            {{ permission.fecha_fin }}
          </td>

          <td>
            {{ permission.estado }}
          </td>

          <td>

            <button
              @click="editarPermiso(permission)"
            >
              Editar
            </button>

            <button
              @click="eliminarPermiso(permission.id)"
            >
              Eliminar
            </button>

          </td>

        </tr>

      </tbody>

    </table>
    <div
  v-if="showForm"
  class="modal"
>

  <div class="modal-content">

    <h2>
      {{
        editando
        ? 'Editar Permiso'
        : 'Nuevo Permiso'
      }}
    </h2>

    <select
      v-model="nuevoPermiso.employee_id"
    >

      <option :value="0">
        Seleccione empleado
      </option>

      <option
        v-for="employee in employees"
        :key="employee.id"
        :value="employee.id"
      >
        {{ employee.nombre }}
      </option>

    </select>

    <input
      v-model="nuevoPermiso.motivo"
      placeholder="Motivo"
    />

    <input
      type="date"
      v-model="nuevoPermiso.fecha_inicio"
    />

    <input
      type="date"
      v-model="nuevoPermiso.fecha_fin"
    />

    <select
      v-model="nuevoPermiso.estado"
    >

      <option>
        PENDIENTE
      </option>

      <option>
        APROBADO
      </option>

      <option>
        RECHAZADO
      </option>

    </select>

    <div class="buttons">

      <button
        @click="guardarPermiso"
      >
        Guardar
      </button>

      <button
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
  onMounted
} from 'vue'

import axios from 'axios'

const permissions = ref<any[]>([])

const employees = ref<any[]>([])

const showForm = ref(false)

const editando = ref(false)

const permisoEditandoId =
  ref<number | null>(null)

const nuevoPermiso = ref({

  employee_id: 0,

  motivo: '',

  fecha_inicio: '',

  fecha_fin: '',

  estado: 'PENDIENTE'

})
const abrirNuevoPermiso = () => {

  editando.value = false

  nuevoPermiso.value = {

    employee_id: 0,

    motivo: '',

    fecha_inicio: '',

    fecha_fin: '',

    estado: 'PENDIENTE'

  }

  showForm.value = true

}

const cargarPermisos = async () => {

  const response =
    await axios.get(
      'http://localhost:3000/permissions'
    )

  permissions.value =
    response.data

}

const cargarEmpleados = async () => {

  const response =
    await axios.get(
      'http://localhost:3000/employees'
    )

  employees.value =
    response.data

}
const guardarPermiso = async () => {

  if (
    !nuevoPermiso.value.employee_id ||
    !nuevoPermiso.value.motivo
  ) {

    alert('Complete los campos')

    return

  }

  if (editando.value) {

    await axios.patch(

      `http://localhost:3000/permissions/${permisoEditandoId.value}`,

      nuevoPermiso.value

    )

  } else {

    await axios.post(

      'http://localhost:3000/permissions',

      nuevoPermiso.value

    )

  }

  await cargarPermisos()

  showForm.value = false

}
const editarPermiso = (
  permission: any
) => {

  editando.value = true

  permisoEditandoId.value =
    permission.id

  nuevoPermiso.value = {

    employee_id:
      permission.employee_id,

    motivo:
      permission.motivo,

    fecha_inicio:
      permission.fecha_inicio,

    fecha_fin:
      permission.fecha_fin,

    estado:
      permission.estado

  }

  showForm.value = true

}
const eliminarPermiso = async (
  id: number
) => {

  await axios.delete(

    `http://localhost:3000/permissions/${id}`

  )

  await cargarPermisos()

}

onMounted(() => {

  cargarPermisos()

  cargarEmpleados()

})

</script>
<style scoped>

.header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 20px;

}

.header h1 {

  color: #1f2937;

}

.header button {

  background: #2563eb;

  color: white;

  border: none;

  padding: 10px 15px;

  border-radius: 8px;

  cursor: pointer;

}

.header button:hover {

  background: #1d4ed8;

}

table {

  width: 100%;

  border-collapse: collapse;

  background: white;

  border-radius: 12px;

  overflow: hidden;

  box-shadow:
    0 2px 10px rgba(0,0,0,.08);

}

thead {

  background: #f3f4f6;

}

th,
td {

  padding: 12px;

  border-bottom: 1px solid #e5e7eb;

  text-align: left;

}

tbody tr:hover {

  background: #f9fafb;

}

td button {

  margin-right: 5px;

  padding: 6px 10px;

  border: none;

  border-radius: 6px;

  cursor: pointer;

}

td button:first-child {

  background: #f59e0b;

  color: white;

}

td button:last-child {

  background: #dc2626;

  color: white;

}

.modal {

  position: fixed;

  inset: 0;

  background: rgba(
    0,
    0,
    0,
    .5
  );

  display: flex;

  justify-content: center;

  align-items: center;

}

.modal-content {

  background: white;

  width: 450px;

  padding: 25px;

  border-radius: 12px;

  display: flex;

  flex-direction: column;

  gap: 12px;

}

.modal-content input,
.modal-content select {

  padding: 10px;

  border: 1px solid #d1d5db;

  border-radius: 8px;

}

.buttons {

  display: flex;

  gap: 10px;

}

.buttons button {

  flex: 1;

  padding: 10px;

  border: none;

  border-radius: 8px;

  cursor: pointer;

}

.buttons button:first-child {

  background: #16a34a;

  color: white;

}

.buttons button:last-child {

  background: #6b7280;

  color: white;

}

</style>