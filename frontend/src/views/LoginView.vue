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
                
              <div class="captcha-row">

                <div class="captcha-display bg-white border-round-md shadow-2">

                  <canvas
                  ref="captchaCanvas"
                  width="180"
                  height="55"
                ></canvas>

                </div>

                <Button
                  type="button"
                  icon="pi pi-refresh"
                  severity="secondary"
                  text
                  rounded
                  class="captcha-btn"
                  @click="recargarCaptcha"
                />

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
import { reactive, ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore()
import axios from 'axios'
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
const captchaCode = ref('')
const captchaCanvas =
  ref<HTMLCanvasElement | null>(null)

const generarCaptcha = () => {

  const caracteres =
    'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'  //para el captcha mejorado

  captchaCode.value = ''

  for (let i = 0; i < 5; i++) {

    captchaCode.value +=
      caracteres.charAt(
        Math.floor(
          Math.random() * caracteres.length
        )
      )

  }
  nextTick(() => {

  dibujarCaptcha()

})

}


const dibujarCaptcha = () => {

  if (!captchaCanvas.value) return

  const canvas = captchaCanvas.value

  const ctx = canvas.getContext('2d')

  if (!ctx) return

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  )

  ctx.fillStyle = '#fcf6df'

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  )

  // Líneas de ruido

  for (let i = 0; i < 5; i++) {

    ctx.beginPath()

    ctx.moveTo(
      Math.random() * canvas.width,
      Math.random() * canvas.height
    )

    ctx.lineTo(
      Math.random() * canvas.width,
      Math.random() * canvas.height
    )

    ctx.strokeStyle = '#999'

    ctx.stroke()

  }

  // Letras

  ctx.font = 'bold 28px Courier New'

  for (
    let i = 0;
    i < captchaCode.value.length;
    i++
  ) {

    const letra =
      captchaCode.value.charAt(i)
    const x =
      15 + i * 22

    const y =
      28

    const angulo =
      (Math.random() - 0.5) * 0.4

    ctx.save()

    ctx.translate(x, y)

    ctx.rotate(angulo)

    ctx.fillStyle =
      '#1e3a8a'

    ctx.fillText(
      letra,
      0,
      0
    )

    ctx.restore()

  }

  // Puntos aleatorios

  for (let i = 0; i < 50; i++) {

    ctx.fillStyle =
      '#555'

    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      1,
      1
    )

  }

}

const recargarCaptcha = () => {

  generarCaptcha()

  loginForm.captcha = ''

  errors.captcha = ''

  loginError.value = ''

}

const handleLogin = async () => {
  errors.username = ''
  errors.password = ''
  errors.captcha = ''
  loginError.value = ''

  if (!loginForm.username) errors.username = 'El usuario es requerido.'
  if (!loginForm.password) errors.password = 'La contraseña es requerida.'
  if (!loginForm.captcha) errors.captcha = 'El CAPTCHA es requerido.'

  if (errors.username || errors.password || errors.captcha) return

  // Simulación temporal de acceso directo ya remplazado
  try {

 if (
      loginForm.captcha.toUpperCase() !==
      captchaCode.value
    ) {

      loginError.value =
        'CAPTCHA incorrecto'

      generarCaptcha()

      loginForm.captcha = ''

      return

  }

  const response = await axios.post(
    'http://localhost:3000/auth/login',
    {
      username: loginForm.username,
      password: loginForm.password
    }
  )

  if (response.data.success) {    // para los logs de acceso 

  await axios.post(
    'http://localhost:3000/access-logs',
    {
      usuario:
        response.data.user.username,

      ip:
        '127.0.0.1',

      evento:
        'INGRESO',

      browser:
        navigator.userAgent
    }
  )

  authStore.setUser(
    response.data.user
  )

  router.push('/app/dashboard')

} else {

    loginError.value =
      response.data.message

  }

} catch (error) {

  loginError.value =
    'Error al conectar con el servidor'

}
}
onMounted(() => {

  generarCaptcha()

})
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
  width: 180px;
  height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #fcf6df;

  margin: 0; /* quitar auto */
}
.captcha-wrapper canvas {
  display: block;
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
.captcha-refresh {
  display: flex;
  justify-content: center;
}
.captcha-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.captcha-btn {
  color: white !important;
}

.captcha-btn:hover {
  background: rgba(255,255,255,0.12) !important;
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