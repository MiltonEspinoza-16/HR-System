<template>
  <div>

    <div class="header">
      <h1>Usuarios del Sistema</h1>

      <button @click="abrirNuevoUsuario">
        Nuevo Usuario
      </button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Nombre</th>
          <th>Rol</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>

        <tr v-for="user in users" :key="user.id">

          <td>{{ user.username }}</td>
          <td>{{ user.nombre }}</td>
          <td>{{ user.rol }}</td>
          <td>{{ user.estado }}</td>

          <td>
            <button @click="editarUsuario(user)">
              Editar
            </button>

            <button @click="eliminarUsuario(user.id)">
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
          {{ editando ? 'Editar Usuario' : 'Nuevo Usuario' }}
        </h2>

        <input
          v-model="nuevoUsuario.username"
          placeholder="Usuario"
        />

        <input
          v-model="nuevoUsuario.nombre"
          placeholder="Nombre Completo"
        />

        <input
          type="password"
          v-model="nuevoUsuario.password"
          placeholder="Contraseña"
          
        />
        <p class="password-strength">
        Fortaleza:
        <strong>{{ passwordStrength }}</strong>
        </p>

        <select v-model="nuevoUsuario.rol">
          <option value="ADMIN">ADMIN</option>
          <option value="RRHH">RRHH</option>
          <option value="JEFE">JEFE</option>
          <option value="EMPLEADO">EMPLEADO</option>
        </select>

        <div class="buttons">

          <button @click="guardarUsuario">
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

import { ref, computed } from 'vue'

const showForm = ref(false)
const editando = ref(false)
const usuarioEditandoId = ref<number | null>(null)

const users = ref([
  {
    id: 1,
    username: 'admin',
    nombre: 'Administrador',
    rol: 'ADMIN',
    estado: 'Activo'
  },
  {
    id: 2,
    username: 'rrhh',
    nombre: 'Recursos Humanos',
    rol: 'RRHH',
    estado: 'Activo'
  }
])

const nuevoUsuario = ref({
  username: '',
  nombre: '',
  password: '',
  rol: 'EMPLEADO'
})

const passwordStrength = computed(() => {

  const pass = nuevoUsuario.value.password

  if (!pass) {
    return 'Sin definir'
  }

  if (pass.length < 6) {
    return 'Débil'
  }

  const tieneNumero = /\d/.test(pass)
  const tieneMayuscula = /[A-Z]/.test(pass)
  const tieneEspecial = /[^A-Za-z0-9]/.test(pass)

  if (
    pass.length >= 8 &&
    tieneNumero &&
    tieneMayuscula &&
    tieneEspecial
  ) {
    return 'Fuerte'
  }

  return 'Media'
})

const abrirNuevoUsuario = () => {
  editando.value = false

  nuevoUsuario.value = {
    username: '',
    nombre: '',
    password: '',
    rol: 'EMPLEADO'
  }

  showForm.value = true
}

const guardarUsuario = () => {

  if (
    !nuevoUsuario.value.username ||
    !nuevoUsuario.value.nombre
  ) {
    alert('Complete los campos')
    return
  }

  if (editando.value) {

    users.value = users.value.map(user => {

      if (user.id === usuarioEditandoId.value) {
        return {
          ...user,
          username: nuevoUsuario.value.username,
          nombre: nuevoUsuario.value.nombre,
          rol: nuevoUsuario.value.rol
        }
      }

      return user
    })

  } else {

    users.value.push({
      id: Date.now(),
      username: nuevoUsuario.value.username,
      nombre: nuevoUsuario.value.nombre,
      rol: nuevoUsuario.value.rol,
      estado: 'Activo'
    })

  }

  showForm.value = false
}

const editarUsuario = (user: any) => {

  editando.value = true
  usuarioEditandoId.value = user.id

  nuevoUsuario.value = {
    username: user.username,
    nombre: user.nombre,
    password: '',
    rol: user.rol
  }

  showForm.value = true
}

const eliminarUsuario = (id: number) => {

  users.value = users.value.filter(
    user => user.id !== id
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

th, td{
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
  padding:20px;
  width:400px;

  display:flex;
  flex-direction:column;
  gap:10px;
}

.buttons{
  display:flex;
  justify-content:end;
  gap:10px;
}
.password-strength{
  font-size:14px;
  color:#374151;
}
</style>