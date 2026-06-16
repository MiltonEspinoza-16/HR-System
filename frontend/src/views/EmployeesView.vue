<template>

  <div class="employees-container">

    <!-- CABECERA -->

    <div class="header">

      <div>

        <h1>👥 Gestión de Empleados</h1>

        <p class="subtitle">
          Administración de empleados activos e inactivos
        </p>

      </div>

      <button class="btn-primary" @click="showForm = true">
        + Nuevo Empleado
      </button>

    </div>

    <!-- ESTADÍSTICAS -->

    <div class="stats">

      <div class="stat-card">

        <div class="icon">
          👥
        </div>

        <div>

          <h3>
            {{ employees.length }}
          </h3>

          <span>
            Empleados Activos
          </span>

        </div>

      </div>

      <div class="stat-card inactive-stat">

        <div class="icon">
          🚫
        </div>

        <div>

          <h3>
            {{ inactiveEmployees.length }}
          </h3>

          <span>
            Empleados Inactivos
          </span>

        </div>

      </div>

    </div>

    <!-- BUSCADOR + BOTÓN -->

    <div class="toolbar">

      <input v-model="search" class="search-input" placeholder="🔍 Buscar empleado..." />

      <button class="btn-secondary" @click="showInactiveModal = true">
        👤 Empleados Inactivos
        ({{ inactiveEmployees.length }})
      </button>

    </div>

    <!-- TARJETAS EMPLEADOS -->

    <div class="employee-grid">

      <div v-for="emp in filteredEmployees" :key="emp.id" class="employee-card">

        <div class="avatar">

          {{
            emp.nombre
              ? emp.nombre.charAt(0)
              : '?'
          }}

        </div>

        <div class="employee-info">

          <h3>
            {{ emp.nombre }}
          </h3>

          <span class="employee-code">
            {{ emp.codigo }}
          </span>

          <p>
            {{ emp.cargo }}
          </p>

          <p>
            {{ emp.departamento }}
          </p>

          <p class="employee-contact">
            📧 {{ emp.correo }}
          </p>

          <p class="employee-contact">
            📱 {{ emp.telefono }}
          </p>

          <span class="badge active">
            ● Activo
          </span>

        </div>

        <div class="card-actions">

          <button class="btn-edit" @click="editarEmpleado(emp)">
            Editar
          </button>

          <button class="btn-delete" @click="eliminarEmpleado(emp.id)">
            Desactivar
          </button>

        </div>

      </div>

    </div>

    <!-- MODAL EMPLEADOS INACTIVOS -->

    <div v-if="showInactiveModal" class="modal">

      <div class="modal-content inactive-modal">

        <div class="modal-header">
          <div>

            <h2>
              {{ editingId
                ? 'Editar Empleado'
                : 'Nuevo Empleado'
              }}
            </h2>

            <p>
              Registro y administración
              de personal
            </p>

          </div>
          <h2>
            Empleados Inactivos
          </h2>

          <button class="btn-close" @click="showInactiveModal = false">
            ✖
          </button>

        </div>

        <div v-if="
          inactiveEmployees.length === 0
        " class="empty-state">

          No existen empleados inactivos

        </div>

        <div v-for="emp in inactiveEmployees" :key="emp.id" class="inactive-card">

          <div>

            <strong>
              {{ emp.codigo }}
            </strong>

            <p>
              {{ emp.nombre }}
            </p>

            <small>
              {{ emp.cargo }}
            </small>

          </div>

          <button class="btn-restore" @click="
            restaurarEmpleado(
              emp.id
            )
            ">
            Restaurar
          </button>

        </div>

      </div>

    </div>


    <!-- MODAL NUEVO EMPLEADO -->
    <div v-if="showForm" class="modal">

      <div class="modal-content employee-form">



        <!-- DATOS PERSONALES -->

        <div class="section-card">

          <div class="employee-photo">

            <div class="photo-circle">
              👤
            </div>

            <button class="upload-btn">
              📷 Subir Foto
            </button>

          </div>

          <h3>
            Datos Personales
          </h3>

          <div class="form-grid">

            <!-- CI -->

            <div class="field">

              <label>
                CI
              </label>

              <div class="input-wrapper">

                <input v-model="nuevoEmpleado.ci" @input="validarCampo('ci')" />

                <span v-if="
                  nuevoEmpleado.ci &&
                  !errors.ci
                " class="input-icon success-icon">
                  ✅
                </span>

                <span v-if="errors.ci" class="input-icon error-icon">
                  ❌
                </span>

              </div>

              <small v-if="errors.ci" class="error">
                {{ errors.ci }}
              </small>

            </div>

            <!-- NOMBRE -->

            <div class="field">

              <label>
                Nombre Completo
              </label>

              <div class="input-wrapper">

                <input v-model="nuevoEmpleado.nombre" @input="validarCampo('nombre')" />

                <span v-if="
                  nuevoEmpleado.nombre &&
                  !errors.nombre
                " class="input-icon success-icon">
                  ✅
                </span>

                <span v-if="errors.nombre" class="input-icon error-icon">
                  ❌
                </span>

              </div>

              <small v-if="errors.nombre" class="error">
                {{ errors.nombre }}
              </small>

            </div>

            <!-- TELEFONO -->

            <div class="field">

              <label>
                Teléfono
              </label>

              <div class="input-wrapper">

                <input v-model="nuevoEmpleado.telefono" @input="validarCampo('telefono')" />

                <span v-if="
                  nuevoEmpleado.telefono &&
                  !errors.telefono
                " class="input-icon success-icon">
                  ✅
                </span>

                <span v-if="errors.telefono" class="input-icon error-icon">
                  ❌
                </span>

              </div>

              <small v-if="errors.telefono" class="error">
                {{ errors.telefono }}
              </small>

            </div>

            <!-- CORREO -->

            <div class="field">

              <label>
                Correo Electrónico
              </label>

              <div class="input-wrapper">

                <input type="email" v-model="nuevoEmpleado.correo" @input="validarCampo('correo')" />

                <span v-if="
                  nuevoEmpleado.correo &&
                  !errors.correo
                " class="input-icon success-icon">
                  ✅
                </span>

                <span v-if="errors.correo" class="input-icon error-icon">
                  ❌
                </span>

              </div>

              <small v-if="errors.correo" class="error">
                {{ errors.correo }}
              </small>

            </div>

            <!-- DIRECCION -->

            <div class="field">

              <label>
                Dirección
              </label>

              <div class="input-wrapper">

                <input v-model="nuevoEmpleado.direccion" @input="validarCampo('direccion')" />

                <span v-if="
                  nuevoEmpleado.direccion &&
                  !errors.direccion
                " class="input-icon success-icon">
                  ✅
                </span>

                <span v-if="errors.direccion" class="input-icon error-icon">
                  ❌
                </span>

              </div>

              <small v-if="errors.direccion" class="error">
                {{ errors.direccion }}
              </small>

            </div>

            <!-- FECHA NACIMIENTO -->

            <div class="field">

              <label>
                Fecha de Nacimiento
              </label>

              <div class="input-wrapper">

                <input type="date" v-model="nuevoEmpleado.fecha_nacimiento
                  " @change="
                validarCampo(
                  'fecha_nacimiento'
                )
                " />

                <span v-if="
                  nuevoEmpleado.fecha_nacimiento &&
                  !errors.fecha_nacimiento
                " class="input-icon success-icon">
                  ✅
                </span>

                <span v-if="
                  errors.fecha_nacimiento
                " class="input-icon error-icon">
                  ❌
                </span>

              </div>

              <small v-if="
                errors.fecha_nacimiento
              " class="error">
                {{
                  errors.fecha_nacimiento
                }}
              </small>

            </div>

          </div>

        </div>

        <!-- DATOS LABORALES -->

        <div class="section-card">

          <h3>
            Datos Laborales
          </h3>

          <div class="form-grid">

            <!-- CARGO -->

            <div class="field">

              <label>
                Cargo
              </label>

              <input v-model="nuevoEmpleado.cargo" @input="validarCampo('cargo')"
                placeholder="Ej: Analista de Sistemas" />

              <span v-if="
                nuevoEmpleado.cargo &&
                !errors.cargo
              " class="success">
                ✅ Correcto
              </span>

              <small v-if="errors.cargo" class="error">
                ❌ {{ errors.cargo }}
              </small>

            </div>

            <!-- DEPARTAMENTO -->

            <div class="field">

              <label>
                Departamento
              </label>

              <input v-model="nuevoEmpleado.departamento" @input="validarCampo('departamento')"
                placeholder="Ej: Recursos Humanos" />

              <span v-if="
                nuevoEmpleado.departamento &&
                !errors.departamento
              " class="success">
                ✅ Correcto
              </span>

              <small v-if="errors.departamento" class="error">
                ❌ {{ errors.departamento }}
              </small>

            </div>

            <!-- FECHA INGRESO -->

            <div class="field">

              <label>
                Fecha de Ingreso
              </label>

              <input type="date" v-model="nuevoEmpleado.fecha_contratacion
                " @change="
              validarCampo(
                'fecha_contratacion'
              )
              " />

              <span v-if="
                nuevoEmpleado.fecha_contratacion &&
                !errors.fecha_contratacion
              " class="success">
                ✅ Correcto
              </span>

              <small v-if="
                errors.fecha_contratacion
              " class="error">
                ❌
                {{
                  errors.fecha_contratacion
                }}
              </small>

            </div>

            <!-- CONTRATO -->

            <div class="field">

              <label>
                Tipo de Contrato
              </label>

              <select v-model="nuevoEmpleado.tipo_contrato
                " @change="
              validarCampo(
                'tipo_contrato'
              )
              ">

                <option value="">
                  Seleccione...
                </option>

                <option value="Indefinido">
                  Indefinido
                </option>

                <option value="Plazo Fijo">
                  Plazo Fijo
                </option>

                <option value="Consultor">
                  Consultor
                </option>

              </select>

              <span v-if="
                nuevoEmpleado.tipo_contrato &&
                !errors.tipo_contrato
              " class="success">
                ✅ Correcto
              </span>

              <small v-if="
                errors.tipo_contrato
              " class="error">
                ❌
                {{
                  errors.tipo_contrato
                }}
              </small>

            </div>

            <!-- SALARIO -->

            <div class="field">

              <label>
                Salario (Bs.)
              </label>

              <input type="number" v-model="nuevoEmpleado.salario" @input="
                validarCampo(
                  'salario'
                )
                " placeholder="Ej: 5000" />

              <span v-if="
                nuevoEmpleado.salario > 0 &&
                !errors.salario
              " class="success">
                ✅ Correcto
              </span>

              <small v-if="errors.salario" class="error">
                ❌ {{ errors.salario }}
              </small>

            </div>

          </div>

        </div>

        <!-- CÓDIGO EMPLEADO -->

        <div class="codigo-box">

          <label>
            Código de Trabajador
          </label>

          <span>

            {{
              editingId
                ? nuevoEmpleado.codigo
                : 'Se generará automáticamente'
            }}

          </span>

        </div>
        <!-- BOTONES -->

        <div class="buttons">

          <button class="btn-primary" @click="guardarEmpleado">
            Guardar
          </button>

          <button class="btn-cancel" @click="showForm = false">
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
import {
  computed
} from 'vue'


const showForm = ref(false)
const showInactiveModal =
  ref(false)

const search =
  ref('')
//para validaciones 
const errors = ref({

  ci: '',

  nombre: '',

  telefono: '',

  correo: '',

  direccion: '',

  fecha_nacimiento: '',

  cargo: '',

  departamento: '',

  fecha_contratacion: '',

  tipo_contrato: '',

  salario: ''

})


const editingId = ref<number | null>(null)
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
const cargarInactivos = async () => {

  try {

    const response =
      await axios.get(
        'http://localhost:3000/employees/inactive'
      )

    inactiveEmployees.value =
      response.data

  } catch (error) {

    console.error(
      'Error cargando empleados inactivos',
      error
    )

  }

}


const employees = ref<any[]>([])
const inactiveEmployees = ref<any[]>([])
const filteredEmployees =
  computed(() => {

    return employees.value.filter(
      emp =>

        emp.nombre
          .toLowerCase()
          .includes(
            search.value.toLowerCase()
          )

        ||

        emp.codigo
          .toLowerCase()
          .includes(
            search.value.toLowerCase()
          )

    )

  })

const nuevoEmpleado = ref({
  codigo: '',

  ci: '',

  nombre: '',

  telefono: '',

  correo: '',

  direccion: '',

  fecha_nacimiento: '',

  cargo: '',

  departamento: '',

  fecha_contratacion: '',

  tipo_contrato: '',

  salario: 0

})

const validarFormulario = () => {

  let valido = true

  errors.value = {

    ci: '',

    nombre: '',

    telefono: '',

    correo: '',

    direccion: '',

    fecha_nacimiento: '',

    cargo: '',

    departamento: '',

    fecha_contratacion: '',

    tipo_contrato: '',

    salario: ''

  }

  // =========================
  // CI
  // =========================

  if (
    !nuevoEmpleado.value.ci ||
    nuevoEmpleado.value.ci.length < 5
  ) {

    errors.value.ci =
      'Ingrese un CI válido'

    valido = false

  }

  // =========================
  // Nombre
  // =========================

  if (
    !/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/
      .test(
        nuevoEmpleado.value.nombre
      )
  ) {

    errors.value.nombre =
      'El nombre solo puede contener letras'

    valido = false

  }

  // =========================
  // Teléfono
  // =========================

  if (
    !/^[0-9]+$/
      .test(
        nuevoEmpleado.value.telefono
      )
  ) {

    errors.value.telefono =
      'El teléfono solo puede contener números'

    valido = false

  }

  // =========================
  // Correo
  // =========================

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (
    !emailRegex.test(
      nuevoEmpleado.value.correo
    )
  ) {

    errors.value.correo =
      'Correo electrónico inválido'

    valido = false

  }

  // =========================
  // Dirección
  // =========================

  if (
    !nuevoEmpleado.value.direccion
  ) {

    errors.value.direccion =
      'La dirección es obligatoria'

    valido = false

  }

  // =========================
  // Fecha nacimiento
  // =========================

  if (
    !nuevoEmpleado.value.fecha_nacimiento
  ) {

    errors.value.fecha_nacimiento =
      'Seleccione una fecha'

    valido = false

  } else {

    const nacimiento =
      new Date(
        nuevoEmpleado.value.fecha_nacimiento
      )

    const hoy =
      new Date()

    let edad =
      hoy.getFullYear() -
      nacimiento.getFullYear()

    const mes =
      hoy.getMonth() -
      nacimiento.getMonth()

    if (
      mes < 0 ||
      (
        mes === 0 &&
        hoy.getDate() <
        nacimiento.getDate()
      )
    ) {

      edad--

    }

    if (edad < 18) {

      errors.value.fecha_nacimiento =
        'El empleado debe ser mayor de edad'

      valido = false

    }

  }

  // =========================
  // Cargo
  // =========================

  if (
    !/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/
      .test(
        nuevoEmpleado.value.cargo
      )
  ) {

    errors.value.cargo =
      'El cargo solo puede contener letras'

    valido = false

  }

  // =========================
  // Departamento
  // =========================

  if (
    !/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/
      .test(
        nuevoEmpleado.value.departamento
      )
  ) {

    errors.value.departamento =
      'El departamento solo puede contener letras'

    valido = false

  }

  // =========================
  // Fecha contratación
  // =========================

  // Fecha contratación

  if (
    !nuevoEmpleado.value.fecha_contratacion
  ) {

    errors.value.fecha_contratacion =
      'Seleccione una fecha'

    valido = false

  } else {

    const hoy =
      new Date()
        .toISOString()
        .substring(0, 10)

    if (
      nuevoEmpleado.value.fecha_contratacion >
      hoy
    ) {

      errors.value.fecha_contratacion =
        'La fecha no puede ser futura'

      valido = false

    }

  }

  // =========================
  // Tipo contrato
  // =========================

  if (
    !nuevoEmpleado.value.tipo_contrato
  ) {

    errors.value.tipo_contrato =
      'Seleccione un tipo de contrato'

    valido = false

  }

  // =========================
  // Salario
  // =========================

  if (
    Number(
      nuevoEmpleado.value.salario
    ) <= 0
  ) {

    errors.value.salario =
      'El salario debe ser mayor a 0'

    valido = false

  }

  if (
    Number(
      nuevoEmpleado.value.salario
    ) > 100000
  ) {

    errors.value.salario =
      'Salario fuera de rango'

    valido = false

  }

  return valido

}
const validarCampo = (
  campo: string
) => {

  switch (campo) {

    case 'nombre':

      errors.value.nombre =

        /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/
          .test(
            nuevoEmpleado.value.nombre
          )
          ? ''
          : 'Solo letras permitidas'

      break

    case 'telefono':

      errors.value.telefono =

        /^[0-9]+$/
          .test(
            nuevoEmpleado.value.telefono
          )
          ? ''
          : 'Solo números'

      break

    case 'correo':

      errors.value.correo =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          .test(
            nuevoEmpleado.value.correo
          )
          ? ''
          : 'Correo inválido'

      break

    case 'cargo':

      errors.value.cargo =

        /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/
          .test(
            nuevoEmpleado.value.cargo
          )
          ? ''
          : 'Solo letras'

      break

    case 'departamento':

      errors.value.departamento =

        /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/
          .test(
            nuevoEmpleado.value.departamento
          )
          ? ''
          : 'Solo letras'

      break

  }

}
const guardarEmpleado = async () => {

  if (!validarFormulario()) return

  try {

    if (editingId.value !== null) {

      await axios.patch(
        `http://localhost:3000/employees/${editingId.value}`,
        {
          ci: nuevoEmpleado.value.ci,
          nombre: nuevoEmpleado.value.nombre,
          cargo: nuevoEmpleado.value.cargo,
          departamento: nuevoEmpleado.value.departamento,
          salario: Number(
            nuevoEmpleado.value.salario
          )
        }
      )

      await cargarEmpleados()

    } else {

      console.log(
        'DATOS ENVIADOS:',
        nuevoEmpleado.value
      )

      await axios.post(
        'http://localhost:3000/employees',
        {
          ci: nuevoEmpleado.value.ci,
          nombre: nuevoEmpleado.value.nombre,
          telefono: nuevoEmpleado.value.telefono,
          correo: nuevoEmpleado.value.correo,
          direccion: nuevoEmpleado.value.direccion,
          fecha_nacimiento:
            nuevoEmpleado.value.fecha_nacimiento,
          cargo:
            nuevoEmpleado.value.cargo,
          departamento:
            nuevoEmpleado.value.departamento,
          fecha_contratacion:
            nuevoEmpleado.value.fecha_contratacion,
          tipo_contrato:
            nuevoEmpleado.value.tipo_contrato,
          salario:
            Number(
              nuevoEmpleado.value.salario
            ),

          // TEMPORALMENTE QUITA ESTO
          // estado: true
        }
      )

      await cargarEmpleados()
      await cargarInactivos()

    }

    nuevoEmpleado.value = {

      codigo: '',

      ci: '',

      nombre: '',

      telefono: '',

      correo: '',

      direccion: '',

      fecha_nacimiento: '',

      cargo: '',

      departamento: '',

      fecha_contratacion: '',

      tipo_contrato: '',

      salario: 0

    }

    editingId.value = null
    showForm.value = false

  } catch (error: any) {

    console.error(
      'ERROR COMPLETO:',
      error
    )

    console.error(
      'RESPUESTA BACKEND:',
      error.response?.data
    )

  }

}

const eliminarEmpleado = async (
  id: number
) => {

  const confirmar = confirm(
    '¿Desea eliminar este empleado?'
  )

  if (!confirmar) return

  await axios.delete(
    `http://localhost:3000/employees/${id}`
  )

  await cargarEmpleados()
  await cargarInactivos()

}
const restaurarEmpleado = async (
  id: number
) => {

  await axios.patch(
    `http://localhost:3000/employees/${id}/restore`
  )

  await cargarEmpleados()
  await cargarInactivos()

}

const editarEmpleado = (emp: any) => {

  editingId.value = emp.id

  nuevoEmpleado.value = {
    codigo: emp.codigo,


    ci: emp.ci,

    nombre: emp.nombre,

    telefono: emp.telefono,

    correo: emp.correo,

    direccion: emp.direccion,

    fecha_nacimiento:
      emp.fecha_nacimiento,

    cargo: emp.cargo,

    departamento:
      emp.departamento,

    fecha_contratacion:
      emp.fecha_contratacion,

    tipo_contrato:
      emp.tipo_contrato,

    salario: emp.salario

  }

  showForm.value = true
}


onMounted(() => {

  cargarEmpleados()
  cargarInactivos()

})


</script>

<style scoped>
/* ========================================
   CONTENEDOR GENERAL
======================================== */

.employees-container {
  padding: 30px;
  background: #f5f7fb;
  min-height: 100vh;
}

/* ========================================
   CABECERA
======================================== */

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.header h1 {
  font-size: 40px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.subtitle {
  color: #6b7280;
  margin-top: 5px;
  font-size: 15px;
}

/* ========================================
   BOTONES
======================================== */

.btn-primary {
  background: #2563eb;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: .3s;
}

.btn-primary:hover {
  background: #1d4ed8;
}

.btn-secondary {
  background: #374151;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 10px;
  cursor: pointer;
}

.btn-edit {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}

.btn-delete {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}

.btn-restore {
  background: #10b981;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}

.btn-cancel {
  background: #e5e7eb;
  color: #111827;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
}

/* ========================================
   TARJETAS RESUMEN
======================================== */

.stats {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  width: 240px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, .08);
}

.stat-card .icon {
  font-size: 35px;
}

.stat-card h3 {
  margin: 0;
  font-size: 28px;
  color: #111827;
}

.stat-card span {
  color: #6b7280;
}

.inactive-card {
  border-left: 5px solid #ef4444;
}

/* ========================================
   BUSCADOR
======================================== */

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
}

.search-input {
  width: 350px;
  max-width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background: white;
  outline: none;
  font-size: 14px;
}

.search-input:focus {
  border-color: #2563eb;
}

/* ========================================
   GRID EMPLEADOS
======================================== */

.employee-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

/* ========================================
   TARJETA EMPLEADO
======================================== */

.employee-card {
  background: white;
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, .08);
  transition: .3s;
}

.employee-card:hover {
  transform: translateY(-4px);
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #2563eb;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
}

.employee-info h3 {
  margin: 0;
  font-size: 22px;
  color: #111827;
}

.employee-code {
  display: block;
  margin-top: 4px;
  color: #2563eb;
  font-weight: 700;
}

.employee-info p {
  margin: 4px 0;
}

.employee-contact {
  color: #6b7280;
  font-size: 13px;
}

/* ========================================
   BADGES
======================================== */

.badge {
  display: inline-block;
  margin-top: 8px;
  padding: 6px 12px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 600;
}

.active {
  background: #dcfce7;
  color: #166534;
}

.inactive {
  background: #fee2e2;
  color: #991b1b;
}

/* ========================================
   ACCIONES
======================================== */

.card-actions {
  margin-top: 18px;
  display: flex;
  gap: 10px;
}

/* ========================================
   MODAL
======================================== */

.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {

  width: 950px;
  max-width: 95%;
  max-height: 90vh;
  overflow-y: auto;
  background: #ffffff;
  border-radius: 20px;
  padding: 30px;
  box-shadow:
    0 20px 50px rgba(0, 0, 0, .15);

}

.modal-content h2 {
  margin-top: 0;
  margin-bottom: 20px;
}

/* ========================================
   FORMULARIO
======================================== */

.form-section {
  margin-bottom: 25px;
}

.form-section h3 {
  color: #1f2937;
  margin-bottom: 15px;
}

.form-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

input,
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  outline: none;
}

input:focus,
select:focus {
  border-color: #2563eb;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

/* ========================================
   ERRORES
======================================== */

.error {
  color: #dc2626;
  font-size: 12px;
  margin-top: -8px;
}

/* ========================================
   EMPLEADOS INACTIVOS MODAL
======================================== */

.inactive-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  margin-bottom: 10px;
}

/* ========================================
   RESPONSIVE
======================================== */

@media(max-width:768px) {

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .stats {
    flex-direction: column;
  }

  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input {
    width: 100%;
  }

}

.employee-photo {

  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 10px;

  margin-bottom: 25px;

}

.photo-circle {

  width: 120px;

  height: 120px;

  border-radius: 50%;

  background: #eef4ff;

  border: 3px solid #2563eb;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 50px;

}

.upload-btn {

  background: #2563eb;

  color: white;

  border: none;

  border-radius: 10px;

  padding: 10px 15px;

}

.section-card {

  background: #f8fafc;

  border: 1px solid #e5e7eb;

  border-radius: 16px;

  padding: 25px;

  margin-bottom: 20px;

}

.section-card h3 {

  color: #001F6B;

  font-size: 18px;

  margin-bottom: 20px;

  border-left: 4px solid #2563eb;

  padding-left: 10px;

}

.form-grid {

  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap: 15px;

}

.form-grid input,
.form-grid select {

  padding: 14px;

  border: 1px solid #d1d5db;

  border-radius: 12px;

  font-size: 14px;

  transition: .3s;

}

.form-grid input:focus,
.form-grid select:focus {

  outline: none;

  border-color: #2563eb;

  box-shadow:
    0 0 0 3px rgba(37, 99, 235, .15);

}

.field {

  display: flex;

  flex-direction: column;

  gap: 5px;

}

.field label {

  font-weight: 600;

  color: #374151;

  font-size: 14px;

}

.input-wrapper {

  position: relative;

}

.input-wrapper input {

  width: 100%;

  padding: 12px 40px 12px 12px;

}

.input-icon {

  position: absolute;

  right: 12px;

  top: 50%;

  transform: translateY(-50%);

  font-size: 18px;

}

.success-icon {

  color: #10b981;

}

.error-icon {

  color: #ef4444;

}

.success {

  color: #10b981;

  font-size: 12px;

}

.error {

  color: #ef4444;

  font-size: 12px;

}
</style>