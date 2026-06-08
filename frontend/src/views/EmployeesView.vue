<template>
  <div>
    <div class="header">
      <h1>Gestión de Empleados</h1>

      <button @click="showForm = true">
        Nuevo Empleado
      </button>
    </div>

    <table>
      <thead>
        <tr>
          <th>CI</th>
          <th>Nombre</th>
          <th>Cargo</th>
          <th>Departamento</th>
          <th>Salario</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="emp in employees" :key="emp.id">
          <td>{{ emp.ci }}</td>
          <td>{{ emp.nombre }}</td>
          <td>{{ emp.cargo }}</td>
          <td>{{ emp.departamento }}</td>
          <td>Bs. {{ emp.salario }}</td>

          <td>
            <button @click="editarEmpleado(emp)">
            Editar
            </button>
            <button @click="eliminarEmpleado(emp.id)">
            Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showForm" class="modal">
      <div class="modal-content">

        <h2>Nuevo Empleado</h2>

        <input
          v-model="nuevoEmpleado.ci"
          placeholder="CI"
        />

        <input
          v-model="nuevoEmpleado.nombre"
          placeholder="Nombre Completo"
        />

        <input
          v-model="nuevoEmpleado.cargo"
          placeholder="Cargo"
        />

        <input
          v-model="nuevoEmpleado.departamento"
          placeholder="Departamento"
        />

        <input
          v-model="nuevoEmpleado.salario"
          placeholder="Salario"
        />

        <div class="buttons">
          <button @click="guardarEmpleado">
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

const editingId = ref<number | null>(null)


const employees = ref([
  {
    id: 1,
    ci: '1234567 LP',
    nombre: 'Juan Pérez',
    cargo: 'Analista',
    departamento: 'RRHH',
    salario: 5000
  },
  {
    id: 2,
    ci: '9876543 CB',
    nombre: 'María López',
    cargo: 'Contadora',
    departamento: 'Finanzas',
    salario: 6500
  }
])

const nuevoEmpleado = ref({
  ci: '',
  nombre: '',
  cargo: '',
  departamento: '',
  salario: 0
})

const guardarEmpleado = () => {

  if (
    !nuevoEmpleado.value.ci ||
    !nuevoEmpleado.value.nombre ||
    !nuevoEmpleado.value.cargo
  ) {
    alert('Complete todos los campos obligatorios')
    return
  }

 if (editingId.value !== null) {

  const index = employees.value.findIndex(
    emp => emp.id === editingId.value
  )

  employees.value[index] = {
    id: editingId.value,
    ci: nuevoEmpleado.value.ci,
    nombre: nuevoEmpleado.value.nombre,
    cargo: nuevoEmpleado.value.cargo,
    departamento: nuevoEmpleado.value.departamento,
    salario: Number(nuevoEmpleado.value.salario)
  }

} else {

  employees.value.push({
    id: Date.now(),
    ci: nuevoEmpleado.value.ci,
    nombre: nuevoEmpleado.value.nombre,
    cargo: nuevoEmpleado.value.cargo,
    departamento: nuevoEmpleado.value.departamento,
    salario: Number(nuevoEmpleado.value.salario)
  })

}

  nuevoEmpleado.value = {
    ci: '',
    nombre: '',
    cargo: '',
    departamento: '',
    salario: 0
  }
  editingId.value = null
  showForm.value = false
}

const eliminarEmpleado = (id: number) => {
  employees.value = employees.value.filter(
    emp => emp.id !== id
  )
}

const editarEmpleado = (emp: any) => {

  editingId.value = emp.id

  nuevoEmpleado.value = {
    ci: emp.ci,
    nombre: emp.nombre,
    cargo: emp.cargo,
    departamento: emp.departamento,
    salario: emp.salario
  }

  showForm.value = true
}

</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

table {
  width: 100%;
  background: white;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  color: black;
}

th {
  background: #1f2937;
  color: white;
}

button {
  padding: 8px 12px;
  margin: 2px;
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: rgba(0,0,0,.5);

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  width: 400px;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

.buttons {
  display: flex;
  justify-content: end;
  gap: 10px;
}
</style>