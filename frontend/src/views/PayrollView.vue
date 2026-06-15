<template>
  <div>

    <div class="header">
      <h1>Planilla de Sueldos</h1>

      <button @click="abrirNuevaPlanilla">
        Nueva Planilla
      </button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Empleado</th>
          <th>Total Ganado</th>
          <th>AFP</th>
          <th>Líquido Pagable</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>

        <tr v-for="planilla in payrolls" :key="planilla.id">

            <td> {{ planilla.employee?.nombre }}</td>
            <td>
            Bs. {{ planilla.total }}
            </td>

            <td>
            Bs. {{ planilla.descuento }}
            </td>

            <td>
            Bs.
            {{
                Number(planilla.total) -
                Number(planilla.descuento)
            }}
            </td>

          <td>
            <button @click="editarPlanilla(planilla)">
              Editar
            </button>

            <button @click="eliminarPlanilla(planilla.id)">
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
          {{ editando ? 'Editar Planilla' : 'Nueva Planilla' }}
        </h2>

        <select
  v-model="nuevaPlanilla.employee_id"
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
        v-model="nuevaPlanilla.salario_base"
        placeholder="Salario Base"
        />

        <input
        type="number"
        v-model="nuevaPlanilla.bono"
        placeholder="Bono"
        />

        <input
        type="number"
        v-model="nuevaPlanilla.descuento"
        placeholder="Descuento"
        />

        <input
        type="date"
        v-model="nuevaPlanilla.fecha_pago"
        />

        <div class="resumen">

        <p>
            Total:
            <strong>
            Bs.
            {{
                Number(nuevaPlanilla.salario_base) +
                Number(nuevaPlanilla.bono) -
                Number(nuevaPlanilla.descuento)
            }}
            </strong>
        </p>

        </div>

        <div class="buttons">

          <button @click="guardarPlanilla">
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
import { ref, onMounted } from 'vue'
import axios from 'axios'



const showForm = ref(false)
const editando = ref(false)
const planillaEditandoId = ref<number | null>(null)
const cargarPlanillas = async () => {

  try {

    const response =
      await axios.get(
        'http://localhost:3000/payroll'
      )

    payrolls.value =
      response.data

  } catch (error) {

    console.error(
      'Error cargando planillas',
      error
    )

  }

}

const payrolls = ref<any[]>([])
const employees = ref<any[]>([])
const cargarEmpleados = async () => {

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
const nuevaPlanilla = ref({
  employee_id: '',
  salario_base: 0,
  bono: 0,
  descuento: 0,
  fecha_pago: ''
})

const calcularTotal = () => {
  return (
    Number(nuevaPlanilla.value.salario_base) +
    Number(nuevaPlanilla.value.bono) -
    Number(nuevaPlanilla.value.descuento)
  )
}

const calcularAFP = () => {
  return calcularTotal() * 0.1271
}

const calcularLiquido = () => {
  return calcularTotal() - calcularAFP()
}

const abrirNuevaPlanilla = () => {

  editando.value = false
const abrirNuevaPlanilla = () => {

  editando.value = false

  nuevaPlanilla.value = {
    employee_id: '',
    salario_base: 0,
    bono: 0,
    descuento: 0,
    fecha_pago: ''
  }

  showForm.value = true
}

  showForm.value = true
}

const guardarPlanilla = async () => {

  if (!nuevaPlanilla.value.employee_id) {

    alert('Seleccione un empleado')

    return
  }

  try {

    if (editando.value) {

      await axios.patch(

        `http://localhost:3000/payroll/${planillaEditandoId.value}`,

        {
          employee_id: Number(
            nuevaPlanilla.value.employee_id
          ),

          salario_base: Number(
            nuevaPlanilla.value.salario_base
          ),

          bono: Number(
            nuevaPlanilla.value.bono
          ),

          descuento: Number(
            nuevaPlanilla.value.descuento
          ),

          fecha_pago:
            nuevaPlanilla.value.fecha_pago
        }

      )

    } else {

      await axios.post(

        'http://localhost:3000/payroll',

        {
          employee_id: Number(
            nuevaPlanilla.value.employee_id
          ),

          salario_base: Number(
            nuevaPlanilla.value.salario_base
          ),

          bono: Number(
            nuevaPlanilla.value.bono
          ),

          descuento: Number(
            nuevaPlanilla.value.descuento
          ),

          fecha_pago:
            nuevaPlanilla.value.fecha_pago
        }

      )

    }

    await cargarPlanillas()

    nuevaPlanilla.value = {
      employee_id: '',
      salario_base: 0,
      bono: 0,
      descuento: 0,
      fecha_pago: ''
    }

    showForm.value = false

    editando.value = false

  } catch (error) {

    console.error(
      'Error guardando planilla',
      error
    )

  }

}

const editarPlanilla = (planilla: any) => {

  editando.value = true

  planillaEditandoId.value =
    planilla.id

  nuevaPlanilla.value = {

    employee_id:
      planilla.employee?.id || '',

    salario_base:
      Number(planilla.salario_base),

    bono:
      Number(planilla.bono),

    descuento:
      Number(planilla.descuento),

    fecha_pago:
      planilla.fecha_pago

  }

  showForm.value = true

}

const eliminarPlanilla = async (id: number) => {

  try {

    await axios.delete(
      `http://localhost:3000/payroll/${id}`
    )

    await cargarPlanillas()

  } catch (error) {

    console.error(
      'Error eliminando planilla',
      error
    )

  }

}
onMounted(() => {

  cargarPlanillas()

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

th,td{
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

.resumen{
  background:#eff6ff;
  padding:15px;
  border-radius:8px;
}

.buttons{
  display:flex;
  justify-content:end;
  gap:10px;
}
</style>