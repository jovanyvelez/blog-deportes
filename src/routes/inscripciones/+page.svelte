<script>
  import { goto } from '$app/navigation';
  export let mensaje = "Pendiente por implementar";
  export let descripcion = "Esta sección se encuentra actualmente en desarrollo";
</script>

<div class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
  <div class="bg-white rounded-xl shadow-2xl p-8 md:p-12 max-w-2xl w-full mx-auto transform transition-all hover:scale-[1.02]">
    <div class="flex flex-col items-center space-y-6">
      <span class="text-7xl md:text-8xl animate-pulse">🚧</span>
      <div class="text-center space-y-3">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800">
          {mensaje}
        </h2>
        <p class="text-gray-500 text-lg md:text-xl">
          {descripcion}
        </p>
        <div class="pt-6">
          <button onclick={()=>goto("/")} class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
