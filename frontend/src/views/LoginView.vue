<template>
  <div class="flex align-items-center justify-content-center min-h-screen login-page">
    
    <div class="grid w-full h-full m-0 p-3 max-w-7xl">
      
      <div class="col-12 md:col-6 flex flex-column align-items-center justify-content-center p-4">
        <div class="text-center section-logo-container">
          <img 
            src="/src/assets/images/logo.png" 
            alt="PuntoMaq Sistema de RRHH" 
            class="w-full max-w-full logo-main select-none"
          />
        </div>
      </div>
      
      <div class="col-12 md:col-6 flex align-items-center justify-content-center p-4">
        
        <Card class="w-full max-w-30rem shadow-8 login-card">
          <template #title>
            <div class="text-center mb-2 mt-2">
              <div class="avatar-container mb-3">
                <i class="pi pi-user text-white text-3xl"></i>
              </div>
              <h2 class="text-white text-3xl font-light tracking-wider m-0 uppercase">Inicio de Sesión</h2>
              <p class="text-white-alpha-60 text-xs font-medium tracking-widest mt-1 mb-0 uppercase">— Sistema de RRHH —</p>
            </div>
          </template>

          <template #content>
            <form @submit.prevent="handleLogin" class="flex flex-column gap-3 mt-4">
              
              <div class="flex flex-column gap-1">
                <label for="username" class="text-white-alpha-80 text-xs font-semibold tracking-wider uppercase pl-1">Usuario</label>
                <div class="p-input-icon-left w-full">
                  <i class="pi pi-user text-white-alpha-40 left-icon" />
                  <InputText 
                    id="username" 
                    v-model="loginForm.username" 
                    placeholder="Ingrese su usuario" 
                    class="w-full custom-input" 
                    :class="{ 'p-invalid': errors.username }"
                  />
                </div>
                <small v-if="errors.username" class="p-error pl-1">{{ errors.username }}</small>
              </div>

              <div class="flex flex-column gap-1">
                <label for="password" class="text-white-alpha-80 text-xs font-semibold tracking-wider uppercase pl-1">Contraseña</label>
                <div class="p-input-icon-left w-full">
                  <i class="pi pi-lock text-white-alpha-40 left-icon" />
                  <Password 
                    id="password"
                    v-model="loginForm.password" 
                    placeholder="Ingrese su contraseña" 
                    :feedback="false" 
                    toggleMask 
                    class="w-full"
                    inputClass="w-full custom-input"
                    :class="{ 'p-invalid': errors.password }"
                  />
                </div>
                <small v-if="errors.password" class="p-error pl-1">{{ errors.password }}</small>
              </div>

              <div class="captcha-wrapper p-3 border-round-xl flex flex-column gap-2 mt-2">
                <label class="text-white-alpha-70 text-center text-xs font-bold uppercase tracking-wider block m-0">Validación de Seguridad</label>
                
                <div class="flex align-items-center justify-content-center gap-2">
                  <div class="captcha-display flex align-items-center justify-content-center bg-white border-round-md shadow-2">
                    <span class="captcha-text select-none">PM4Q</span>
                  </div>
                  <Button type="button" icon="pi pi-refresh" severity="secondary" text rounded class="text-white-alpha-80 hover:bg-white-alpha-10" @click="recargarCaptcha" />
                </div>

                <InputText 
                  v-model="loginForm.captcha" 
                  placeholder="Escriba el código de arriba" 
                  class="w-full text-center custom-input font-bold tracking-widest text-lg uppercase"
                  :class="{ 'p-invalid': errors.captcha }"
                />
                <small v-if="errors.captcha" class="p-error text-center block">{{ errors.captcha }}</small>
              </div>

              <Button type="submit" label="INICIAR SESIÓN" class="w-full mt-3 font-bold custom-btn" size="large" />

              <Message v-if="loginError" severity="error" size="small" variant="simple" class="justify-content-center text-white font-medium mt-2">
                {{ loginError }}
              </Message>

              <div class="text-center mt-2">
                <a href="#" class="text-white-alpha-50 text-xs no-underline hover:text-white transition-colors duration-200">¿Olvidaste tu contraseña?</a>
              </div>

            </form>
          </template>
        </Card>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'

const router = useRouter()

const loginForm = reactive({
  username: '',
  password: '',
  captcha: ''
})

const errors = reactive({
  username: '',
  password: '',
  captcha: ''
})

const loginError = ref('')

const recargarCaptcha = () => {
  loginForm.captcha = ''
  errors.captcha = ''
  loginError.value = ''
}

const handleLogin = () => {
  errors.username = ''
  errors.password = ''
  errors.captcha = ''
  loginError.value = ''

  if (!loginForm.username) errors.username = 'El usuario es requerido.'
  if (!loginForm.password) errors.password = 'La contraseña es requerida.'
  if (!loginForm.captcha) errors.captcha = 'El CAPTCHA es requerido.'

  if (errors.username || errors.password || errors.captcha) return

  // Simulación temporal de acceso directo
  if (loginForm.username === 'admin' && loginForm.password === '123456' && loginForm.captcha.toUpperCase() === 'PM4Q') {
    router.push('/app/dashboard')
  } else {
    loginError.value = 'Credenciales o CAPTCHA inválidos. (Pruebe con admin / 123456 / PM4Q)'
  }
}
</script>

<style scoped>
/* CONFIGURACIÓN VISUAL EXACTA A TU CAPTURA */

.login-page {
  /* Fondo principal usando tu imagen de la ciudad */
  background-image: linear-gradient(rgba(0, 31, 107, 0.4), rgba(0, 15, 55, 0.75)), url('/src/assets/images/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Efecto translúcido de cristal esmerilado para la tarjeta */
.login-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px !important;
}

/* Contenedor circular del icono superior de la tarjeta */
.avatar-container {
  width: 64px;
  height: 64px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.05);
}

/* Inputs personalizados transparentes con borde sutil */
:deep(.custom-input) {
  background-color: rgba(0, 0, 0, 0.25) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: #ffffff !important;
  border-radius: 10px !important;
  padding-top: 0.75rem !important;
  padding-bottom: 0.75rem !important;
  transition: all 0.2s ease;
}

:deep(.custom-input::placeholder) {
  color: rgba(255, 255, 255, 0.4) !important;
}

:deep(.custom-input:focus) {
  border-color: #ffffff !important;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1) !important;
}

/* Alineación manual para los iconos de PrimeIcons dentro de los inputs */
.p-input-icon-left {
  position: relative;
}

.left-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 14px;
  z-index: 5;
}

:deep(.p-inputtext) {
  padding-left: 2.5rem !important;
}

/* Bloque contenedor del Captcha */
.captcha-wrapper {
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.captcha-display {
  width: 140px;
  height: 42px;
  overflow: hidden;
  background-color: #fcf6df !important; /* Tono crema clásico de seguridad */
}

.captcha-text {
  font-family: 'Courier New', monospace;
  font-weight: 900;
  font-size: 1.4rem;
  letter-spacing: 6px;
  color: #1e3a8a;
  transform: rotate(-2deg);
}

/* Botón Blanco de Iniciar Sesión */
.custom-btn {
  background-color: #ffffff !important;
  color: #001F6B !important; /* Texto en el azul corporativo */
  border: none !important;
  border-radius: 10px !important;
  padding: 0.85rem !important;
  letter-spacing: 1px;
  transition: background-color 0.2s ease;
}

.custom-btn:hover {
  background-color: rgba(255, 255, 255, 0.9) !important;
}

/* Animación de entrada suave y tamaño del logo izquierdo */
.logo-main {
  width: 110%; /* Lo aumentamos un poco más allá de su tamaño base */
  max-width: 550px; /* Le damos un tope máximo para que no tape el formulario en pantallas gigantes */
  filter: drop-shadow(0px 10px 25px rgba(0,0,0,0.4)); /* Sombra un poco más profunda */
}
</style>