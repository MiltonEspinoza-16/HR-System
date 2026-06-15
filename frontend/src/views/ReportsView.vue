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

      <button @click="generarReporteVacaciones">
        Generar PDF
    </button>
      </div>

      <div class="report-card">
        <h2>💰 Planillas</h2>

        <p>
          Próximamente
        </p>

       <button @click="generarReportePlanillas">
        Generar PDF
        </button>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import axios from 'axios'

const generarReporteEmpleados = async () => {

  try {

    const response =
      await axios.get(
        'http://localhost:3000/employees'
      )

    const empleados =
      response.data

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

      body: empleados.map(
        (emp: any) => [

          emp.ci,

          emp.nombre,

          emp.cargo,

          emp.departamento,

          emp.salario

        ]
      )

    })

    doc.save(
      'reporte-empleados.pdf'
    )

  } catch (error) {

    console.error(
      'Error generando reporte',
      error
    )

  }

}
const generarReporteVacaciones = async () => {

  try {

    const response =
      await axios.get(
        'http://localhost:3000/vacations'
      )

    const vacaciones =
      response.data

    const doc = new jsPDF()

    doc.setFontSize(18)

    doc.text(
      'REPORTE DE VACACIONES - PUNTOMAQ',
      14,
      20
    )

    autoTable(doc, {

      startY: 30,

      head: [[
        'Empleado',
        'Fecha Inicio',
        'Fecha Fin',
        'Estado'
      ]],

      body: vacaciones.map(
        (vac: any) => [

          vac.employee?.nombre,

          vac.fecha_inicio,

          vac.fecha_fin,

          vac.estado

        ]
      )

    })

    doc.save(
      'reporte-vacaciones.pdf'
    )

  } catch (error) {

    console.error(
      'Error generando reporte',
      error
    )

  }

}
const generarReportePlanillas = async () => {

  try {

    const response =
      await axios.get(
        'http://localhost:3000/payroll'
      )

    const planillas =
      response.data

    const doc = new jsPDF()

    doc.setFontSize(18)

    doc.text(
      'REPORTE DE PLANILLAS - PUNTOMAQ',
      14,
      20
    )

    autoTable(doc, {

      startY: 30,

      head: [[
        'Empleado',
        'Salario Base',
        'Bono',
        'Descuento',
        'Total',
        'Fecha Pago'
      ]],

      body: planillas.map(
        (p: any) => [

          p.employee?.nombre,

          p.salario_base,

          p.bono,

          p.descuento,

          p.total,

          p.fecha_pago

        ]
      )

    })

    doc.save(
      'reporte-planillas.pdf'
    )

  } catch (error) {

    console.error(
      'Error generando reporte',
      error
    )

  }

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