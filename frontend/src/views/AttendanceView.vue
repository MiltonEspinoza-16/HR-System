<template>
  <div>

    <div class="header">
      <h1>Control de Asistencias</h1>

      <button
            @click="abrirNuevaAsistencia"
            >
            Nueva Asistencia
     </button>
    </div>

    <table>

      <thead>
        <tr>
          <th>Empleado</th>
          <th>Fecha</th>
          <th>Entrada</th>
          <th>Salida</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>

                <tr
            v-for="attendance in attendances"
            :key="attendance.id"
            >

            <td>
                {{ attendance.employee?.nombre }}
            </td>

            <td>
                {{ attendance.fecha }}
            </td>

            <td>
                {{ attendance.hora_entrada }}
            </td>

            <td>
                {{ attendance.hora_salida }}
            </td>

            <td>
                {{ attendance.estado }}
            </td>
            <td>

            <button
                @click="editarAsistencia(attendance)"
            >
                Editar
            </button>

            <button
                @click="eliminarAsistencia(attendance.id)"
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
        ? 'Editar Asistencia'
        : 'Nueva Asistencia'
      }}
    </h2>

    <select
      v-model="nuevaAsistencia.employee_id"
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
      type="date"
      v-model="nuevaAsistencia.fecha"
    />

    <input
      type="time"
      v-model="nuevaAsistencia.hora_entrada"
    />

    <input
      type="time"
      v-model="nuevaAsistencia.hora_salida"
    />

    <div class="buttons">

      <button
        @click="guardarAsistencia"
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
import { ref, onMounted } from 'vue'
import axios from 'axios'
const showForm = ref(false)

const editando = ref(false)

const asistenciaEditandoId = ref<number | null>(null)

const attendances = ref<any[]>([])

const employees = ref<any[]>([])
const nuevaAsistencia = ref({
  employee_id: 0,
  fecha: '',
  hora_entrada: '',
  hora_salida: '',
  estado: 'PRESENTE'
})
const cargarEmpleados = async () => {

  try {

    const response =
      await axios.get(
        'http://localhost:3000/employees'
      )

    employees.value =
      response.data

  } catch (error) {

    console.error(error)

  }

}
const cargarAsistencias = async () => {

  try {

    const response =
      await axios.get(
        'http://localhost:3000/attendances'
      )

    attendances.value =
      response.data

  } catch (error) {

    console.error(error)

  }

}
const abrirNuevaAsistencia = () => {

  editando.value = false

  nuevaAsistencia.value = {

    employee_id: 0,

    fecha: '',

    hora_entrada: '',

    hora_salida: '',

    estado: 'PRESENTE'

  }

  showForm.value = true

}
const guardarAsistencia = async () => {

  if (
    !nuevaAsistencia.value.employee_id ||
    !nuevaAsistencia.value.fecha ||
    !nuevaAsistencia.value.hora_entrada
  ) {

    alert(
      'Complete todos los campos'
    )

    return

  }

  let estado = 'PRESENTE'

  if (
    nuevaAsistencia.value.hora_entrada >
    '08:00'
  ) {

    estado = 'TARDE'

  }

 if (editando.value) {

  await axios.patch(
    `http://localhost:3000/attendances/${asistenciaEditandoId.value}`,
    {
      employee_id:
        Number(
          nuevaAsistencia.value.employee_id
        ),

      fecha:
        nuevaAsistencia.value.fecha,

      hora_entrada:
        nuevaAsistencia.value.hora_entrada,

      hora_salida:
        nuevaAsistencia.value.hora_salida,

      estado
    }
  )

} else {

  await axios.post(
    'http://localhost:3000/attendances',
    {
      employee_id:
        Number(
          nuevaAsistencia.value.employee_id
        ),

      fecha:
        nuevaAsistencia.value.fecha,

      hora_entrada:
        nuevaAsistencia.value.hora_entrada,

      hora_salida:
        nuevaAsistencia.value.hora_salida,

      estado
    }
  )

}
  

  await cargarAsistencias()

  showForm.value = false

}
const eliminarAsistencia = async (
  id: number
) => {

  await axios.delete(
    `http://localhost:3000/attendances/${id}`
  )

  await cargarAsistencias()

}
const editarAsistencia = (
  attendance: any
) => {

  editando.value = true

  asistenciaEditandoId.value =
    attendance.id

  nuevaAsistencia.value = {

    employee_id:
      attendance.employee_id,

    fecha:
      attendance.fecha,

    hora_entrada:
      attendance.hora_entrada,

    hora_salida:
      attendance.hora_salida,

    estado:
      attendance.estado

  }

  showForm.value = true

}
onMounted(() => {

  cargarEmpleados()

  cargarAsistencias()

})


</script>
<style scoped>

.header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 20px;

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
    0 2px 8px rgba(0,0,0,.1);

}

thead {

  background: #f3f4f6;

}

th,
td {

  padding: 12px;

  text-align: left;

  border-bottom: 1px solid #e5e7eb;

}

tr:hover {

  background: #f9fafb;

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

  padding: 25px;

  border-radius: 12px;

  width: 400px;

  display: flex;

  flex-direction: column;

  gap: 12px;

}

.buttons {

  display: flex;

  gap: 10px;

}
</style>