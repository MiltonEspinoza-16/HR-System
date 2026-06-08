<template>
  <div>
    <div class="welcome">
      <h1>Dashboard RRHH</h1>
      <p>Bienvenido al Sistema de Gestión de Recursos Humanos de PuntoMaq</p>
    </div>

    <div class="cards">

      <div class="card">
        <h2>25</h2>
        <p>Empleados Activos</p>
      </div>

      <div class="card">
        <h2>4</h2>
        <p>Vacaciones Pendientes</p>
      </div>

      <div class="card">
        <h2>12</h2>
        <p>Planillas Generadas</p>
      </div>

      <div class="card">
        <h2>3</h2>
        <p>Usuarios Activos</p>
      </div>

    </div>

    <div class="chart-card">
      <h2>Empleados por Departamento</h2>
            <canvas
        ref="chartCanvas"
        style="height:400px;"
        ></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const chartCanvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (!chartCanvas.value) return

  new Chart(chartCanvas.value, {
    type: 'bar',
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

.cards{
  display:flex;
  flex-wrap:wrap;
  gap:20px;
  margin-top:25px;
}

.card{
  background:white;
  padding:20px;
  min-width:220px;
  border-radius:12px;
  box-shadow:0 2px 8px rgba(0,0,0,.1);
}

.card h2{
  margin:0;
  color:#2563eb;
}

.card p{
  margin-top:10px;
  color:#374151;
}

.chart-card{
  margin-top:30px;
  background:white;
  padding:25px;
  border-radius:12px;
  box-shadow:0 2px 8px rgba(0,0,0,.1);
}

.chart-card h2{
  color:#111827;
  margin-bottom:20px;
}
.chart-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-top: 30px;
  min-height: 500px;
}
</style>