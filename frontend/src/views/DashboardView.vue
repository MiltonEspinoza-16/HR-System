<template>
  <div>
    <div class="welcome">
      <h1>Dashboard RRHH</h1>
            <p>Bienvenido al Sistema de Gestión de Recursos Humanos de PuntoMaq</p>
            </div>

            <div class="cards">

         <div class="cards">

  <div class="card employees">
    <div class="icon">👥</div>
    <h2>{{ totalEmpleados }}</h2>
    <p>Empleados Activos</p>
  </div>

  <div class="card vacations">
    <div class="icon">🌴</div>
    <h2>{{ vacacionesPendientes }}</h2>
    <p>Vacaciones Pendientes</p>
  </div>

  <div class="card payroll">
    <div class="icon">💰</div>
    <h2>{{ totalPlanillas }}</h2>
    <p>Planillas Generadas</p>
  </div>

  <div class="card users">
    <div class="icon">🔐</div>
    <h2>{{ totalUsuarios }}</h2>
    <p>Usuarios Activos</p>
  </div>

</div>

      

    </div>

    <div class="chart-card">
      <h2>Empleados por Departamento</h2>
          <canvas
        ref="chartCanvas"
        ></canvas>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Chart from 'chart.js/auto'

const chartCanvas = ref<HTMLCanvasElement | null>(null)
const totalEmpleados = ref(0)

const vacacionesPendientes = ref(0)

const totalPlanillas = ref(0)

const totalUsuarios = ref(0)

const cargarDashboard = async () => {

  try {

    const [
      empleados,
      vacaciones,
      planillas,
      usuarios
    ] = await Promise.all([

      axios.get(
        'http://localhost:3000/employees'
      ),

      axios.get(
        'http://localhost:3000/vacations'
      ),

      axios.get(
        'http://localhost:3000/payroll'
      ),

      axios.get(
        'http://localhost:3000/users'
      )

    ])

    totalEmpleados.value =
      empleados.data.length

    totalUsuarios.value =
      usuarios.data.length

    totalPlanillas.value =
      planillas.data.length

    vacacionesPendientes.value =
      vacaciones.data.filter(
        (v: any) =>
          v.estado === 'PENDIENTE'
      ).length

  } catch (error) {

    console.error(
      'Error cargando dashboard',
      error
    )

  }

}

onMounted(() => {
 cargarDashboard()
  if (!chartCanvas.value) return

  new Chart(chartCanvas.value, {
    type: 'doughnut',
    data: {
      labels: [
        'RRHH',
        'Ventas',
        'Finanzas',
        'Logística'
      ],
      datasets: [
        {
          label: 'Cantidad de Empleados',
          data: [8, 12, 5, 7]
        }
      ]
    },
    options: {
      responsive: true
    }
  })
})
</script>

<style scoped>
.welcome h1 {
  color: #111827;
}

.welcome p {
  color: #4b5563;
}

.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 25px;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 25px;

  box-shadow:
    0 4px 12px rgba(0,0,0,.08);

  transition: .3s;
}

.card:hover {
  transform: translateY(-5px);
}

.icon {
  font-size: 30px;
  margin-bottom: 10px;
}

.card h2 {
  font-size: 36px;
  margin: 0;
  font-weight: bold;
}

.card p {
  margin-top: 8px;
  color: #6b7280;
}
.chart-card {

  background: white;

  margin-top: 30px;

  padding: 25px;

  border-radius: 16px;

  box-shadow:
    0 4px 12px rgba(0,0,0,.08);

  height: 450px;
}
.employees {
  border-left: 6px solid #2563eb;
}

.vacations {
  border-left: 6px solid #16a34a;
}

.payroll {
  border-left: 6px solid #f59e0b;
}

.users {
  border-left: 6px solid #7c3aed;
}
</style>