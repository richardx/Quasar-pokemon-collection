<template>
  <q-page class="flex flex-col items-center justify-start bg-white dark:bg-gray-900 p-4">
    <h1 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Kamera</h1>

    <!-- Knapper til at åbne og lukke kameraet -->
    <div class="mb-4 flex">
      <button
        @click="startCamera"
        :disabled="isCameraActive"
        class="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Åbn Kamera
      </button>
      <button
        @click="stopCamera"
        :disabled="!isCameraActive"
        class="bg-red-500 text-white px-4 py-2 rounded"
      >
        Luk Kamera
      </button>
    </div>

    <!-- Kamera Preview Container -->
    <div class="relative w-full h-64 mb-4">
      <!-- Kamera Preview vil blive indlejret her -->
      <div id="cameraPreview" class="absolute inset-0"></div>
    </div>

    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
  </q-page>
</template>

<script>
import { onUnmounted, ref, nextTick } from 'vue'
import { CameraPreview } from '@capacitor-community/camera-preview'

export default {
  name: 'ScanView',
  setup() {
    const error = ref('')
    const isCameraActive = ref(false)

    const startCamera = async () => {
      try {
        await nextTick() // Sikrer, at DOM'en er opdateret
        const cameraPreviewElement = document.getElementById('cameraPreview')
        const rect = cameraPreviewElement.getBoundingClientRect()

        await CameraPreview.start({
          position: 'rear',
          toBack: false,
          x: Math.round(rect.left),
          y: Math.round(rect.top),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        })
        isCameraActive.value = true
      } catch (err) {
        error.value = 'Kan ikke starte kameraet. Tjek dine tilladelser.'
        console.error(err)
      }
    }

    const stopCamera = async () => {
      if (!isCameraActive.value) return
      try {
        await CameraPreview.stop()
        isCameraActive.value = false
      } catch (err) {
        console.error('Error stopping camera:', err)
      }
    }

    onUnmounted(() => {
      stopCamera()
    })

    return {
      error,
      isCameraActive,
      startCamera,
      stopCamera,
    }
  },
}
</script>
