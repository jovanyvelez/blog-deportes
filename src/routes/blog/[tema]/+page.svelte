<script>
	import { goto } from '$app/navigation';
	let { data } = $props();
	const articulos = data.allArticulos;
</script>

<div class="max-w-4xl mx-auto px-4 py-8">
    {#each articulos as articulo (articulo.id)}
        <article class="mb-6">
            <button
                onclick={() => goto(`/blog/show/${articulo.id}`)}
                class="w-full text-left transform transition-all duration-300 hover:scale-[1.02]"
            >
                <div class="bg-white rounded-xl shadow-md hover:shadow-xl p-6 border border-gray-100">
                    <div class="space-y-4">

                        <h2 class="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                            {articulo.titular}
                        </h2>

                        <div class="flex flex-wrap items-center gap-4 text-gray-600">

                            <div class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                </svg>
                                <span class="text-sm font-medium">
                                    {articulo.usuario.nombre} {articulo.usuario.apellido}
                                </span>
                            </div>


                            <div class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                                </svg>
                                <span class="text-sm">
                                    {articulo.fecha1}
                                </span>
                            </div>
                        </div>


                        <div class="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                </div>
            </button>
        </article>
    {/each}
</div>
