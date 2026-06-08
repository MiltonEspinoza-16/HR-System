<template>
  <div class="layout">

    <aside class="sidebar">

      <div class="logo">
        <h2>PuntoMaq</h2>
        <span>RRHH</span>
      </div>
      <div class="user-role">
        Rol:
        {{ authStore.user.role }}
    </div>
        
      <nav>

        <router-link to="/app/dashboard">
          📊 Dashboard
                <select @change="cambiarRol">

                    <option value="ADMIN">
                        ADMIN
                    </option>

                    <option value="RRHH">
                        RRHH
                    </option>

                    <option value="JEFE">
                        JEFE
                    </option>

                    <option value="EMPLEADO">
                        EMPLEADO
                    </option>

                    </select>
        </router-link>

        <router-link to="/app/employees">
          👥 Empleados
        </router-link>

        <router-link to="/app/vacations">
          🌴 Vacaciones
        </router-link>

        <router-link
            v-if="
                authStore.user.role === 'ADMIN' ||
                authStore.user.role === 'RRHH' ||
                authStore.user.role === 'JEFE'
            "
            to="/app/reports"
            >
            📄 Reportes
        </router-link>

        <router-link
            v-if="authStore.user.role === 'ADMIN'"
            to="/app/users"
            >
            🔐 Usuarios
        </router-link>

      </nav>

      <div class="logout">
        <router-link to="/">
          🚪 Cerrar sesión
        </router-link>
      </div>

    </aside>

    <main class="content">

      <header class="topbar">
        Sistema de Gestión de Recursos Humanos
      </header>

      <div class="page-content">
        <router-view />
      </div>

    </main>

  </div>
</template>

<script setup lang="ts">
import useAuthStore from '../stores/auth'

const authStore = useAuthStore()

const cambiarRol = (event: Event) => {

  const target = event.target as HTMLSelectElement

  authStore.setRole(
    target.value
  )
}
</script>


<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 260px;
  background: #111827;
  color: white;

  display: flex;
  flex-direction: column;
}

.logo {
  padding: 25px;
  border-bottom: 1px solid #374151;
}

.logo h2 {
  margin: 0;
}

.logo span {
  color: #60a5fa;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  padding: 15px;
}

.sidebar nav a {
  color: white;
  text-decoration: none;

  padding: 12px;
  border-radius: 8px;
  margin-bottom: 5px;
}

.sidebar nav a:hover {
  background: #1f2937;
}

.router-link-active {
  background: #2563eb;
}

.logout {
  margin-top: auto;
  padding: 15px;
}

.logout a {
  color: white;
  text-decoration: none;
}

.content {
  flex: 1;
  background: #f3f4f6;
}

.topbar {
  background: white;
  padding: 20px;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

.page-content {
  padding: 25px;
}
</style>