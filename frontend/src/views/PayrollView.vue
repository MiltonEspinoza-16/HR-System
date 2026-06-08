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

          <td>{{ planilla.empleado }}</td>
          <td>Bs. {{ planilla.totalGanado.toFixed(2) }}</td>
          <td>Bs. {{ planilla.afp.toFixed(2) }}</td>
          <td>Bs. {{ planilla.liquido.toFixed(2) }}</td>

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

        <input
          v-model="nuevaPlanilla.empleado"
          placeholder="Empleado"
        />

        <input
          type="number"
          v-model="nuevaPlanilla.haberBasico"
          placeholder="Haber Básico"
        />

        <input
          type="number"
          v-model="nuevaPlanilla.bonoAntiguedad"
          placeholder="Bono Antigüedad"
        />

        <input
          type="number"
          v-model="nuevaPlanilla.otrosBonos"
          placeholder="Otros Bonos"
        />

        <div class="resumen">

          <p>
            Total Ganado:
            <strong>
              Bs. {{ calcularTotal().toFixed(2) }}
            </strong>
          </p>

          <p>
            AFP (12.71%):
            <strong>
              Bs. {{ calcularAFP().toFixed(2) }}
            </strong>
          </p>

          <p>
            Líquido:
            <strong>
              Bs. {{ calcularLiquido().toFixed(2) }}
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
import { ref } from 'vue'

const showForm = ref(false)
const editando = ref(false)
const planillaEditandoId = ref<number | null>(null)

const payrolls = ref([
  {
    id: 1,
    empleado: 'Juan Pérez',
    totalGanado: 5500,
    afp: 699.05,
    liquido: 4800.95
  }
])

const nuevaPlanilla = ref({
  empleado: '',
  haberBasico: 0,
  bonoAntiguedad: 0,
  otrosBonos: 0
})

const calcularTotal = () => {
  return (
    Number(nuevaPlanilla.value.haberBasico) +
    Number(nuevaPlanilla.value.bonoAntiguedad) +
    Number(nuevaPlanilla.value.otrosBonos)
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

  nuevaPlanilla.value = {
    empleado: '',
    haberBasico: 0,
    bonoAntiguedad: 0,
    otrosBonos: 0
  }

  showForm.value = true
}

const guardarPlanilla = () => {

  if (!nuevaPlanilla.value.empleado) {
    alert('Ingrese empleado')
    return
  }

  const registro = {
    id: Date.now(),
    empleado: nuevaPlanilla.value.empleado,
    totalGanado: calcularTotal(),
    afp: calcularAFP(),
    liquido: calcularLiquido()
  }

  if (editando.value) {

    payrolls.value = payrolls.value.map(p => {

      if (p.id === planillaEditandoId.value) {
        return registro
      }

      return p
    })

  } else {

    payrolls.value.push(registro)

  }

  showForm.value = false
}

const editarPlanilla = (planilla: any) => {
  alert('La edición avanzada la haremos después')
}

const eliminarPlanilla = (id: number) => {

  payrolls.value = payrolls.value.filter(
    p => p.id !== id
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