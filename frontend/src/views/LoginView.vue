<template>
  <div class="flex align-items-center justify-content-center min-h-screen">
    <div class="surface-card p-5 shadow-3 border-round w-full md:w-4">
      
      <div class="text-center mb-4">
        <h1>PuntoMaq RRHH</h1>
        <p>Sistema de Gestión de Recursos Humanos</p>
      </div>

      <div class="mb-3">
        <label>Usuario</label>
        <input
          type="text"
          class="w-full p-2 mt-2"
          placeholder="Ingrese usuario"
        />
      </div>

      <div class="mb-3">
        <label>Contraseña</label>
        <input
          type="password"
          class="w-full p-2 mt-2"
          placeholder="Ingrese contraseña"
        />
      </div>

      <button
        class="w-full p-2"
        @click="ingresar"
      >
        Ingresar
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const ingresar = () => {
  router.push('/app/dashboard')
}
</script>