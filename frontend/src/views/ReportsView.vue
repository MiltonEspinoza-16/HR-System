<template>
  <div>

    <h1>Centro de Reportes</h1>

    <div class="reports">

      <div class="report-card">
        <h2>📄 Empleados</h2>

        <p>
          Genera un reporte PDF de empleados.
        </p>

        <button @click="generarReporteEmpleados">
          Generar PDF
        </button>
      </div>

      <div class="report-card">
        <h2>🌴 Vacaciones</h2>

        <p>
          Próximamente
        </p>

        <button disabled>
          Generar PDF
        </button>
      </div>

      <div class="report-card">
        <h2>💰 Planillas</h2>

        <p>
          Próximamente
        </p>

        <button disabled>
          Generar PDF
        </button>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const generarReporteEmpleados = () => {

  const doc = new jsPDF()

  doc.setFontSize(18)
  doc.text(
    'REPORTE DE EMPLEADOS - PUNTOMAQ',
    14,
    20
  )

  autoTable(doc, {
    startY: 30,

    head: [[
      'CI',
      'Nombre',
      'Cargo',
      'Departamento',
      'Salario'
    ]],

    body: [
      [
        '1234567 LP',
        'Juan Pérez',
        'Analista',
        'RRHH',
        '5000'
      ],
      [
        '9876543 CB',
        'María López',
        'Contadora',
        'Finanzas',
        '6500'
      ]
    ]
  })

  doc.save('reporte-empleados.pdf')
}
</script>

<style scoped>
h1{
  color:#111827;
  margin-bottom:25px;
}

.reports{
  display:flex;
  gap:20px;
  flex-wrap:wrap;
}

.report-card{
  width:300px;
  background:white;
  padding:20px;
  border-radius:12px;
  box-shadow:0 2px 8px rgba(0,0,0,.1);
}

.report-card h2{
  color:#2563eb;
  margin-bottom:10px;
}

.report-card p{
  color:#4b5563;
  margin-bottom:15px;
}

button{
  padding:10px 15px;
  cursor:pointer;
}

button:disabled{
  cursor:not-allowed;
}
</style>