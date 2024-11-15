<script lang="ts">
	import type { ActionData } from './$types';
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';
	import type { User } from '$lib/server/database/schema.js';

	let {
		data,
		form
	}: { data: { user: User; temas: { id: number; tema: string }[] }; form: ActionData } = $props();
	let valor = $state('');

	let id = $state(0);
	let miHtml = $derived(marked(valor));
	let sanitizeContent = $state('');

	let selectedTema = $state('');

	$effect(() => {
		(async () => {
			sanitizeContent = DOMPurify.sanitize(await miHtml);
		})();
	});

	function handleSelect() {
		const temaSeleccionado = data.temas.find((t) => t.tema === selectedTema);
		if (temaSeleccionado) {
			id = temaSeleccionado.id;
		}
	}

	// Opcional: manejar la tecla Enter
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSelect();
		}
	}
</script>

<div class="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-3xl space-y-8">
		<!-- Formulario de edición -->
		<form action="?/grabar" method="post" class="rounded-lg bg-white p-6 shadow-sm">
			<div class="space-y-6">
				{#if form?.message}
					<p class="text-sm text-red-500">{form.message}</p>
				{/if}
				<input
					list="temas-list"
					bind:value={selectedTema}
					onchange={handleSelect}
					onkeydown={handleKeydown}
					placeholder="Buscar tema..."
					autocomplete="off"
					required
					class="w-full cursor-pointer rounded-md border-none bg-gray-800 px-3 py-2 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-gray-700"
				/>
				<datalist id="temas-list">
					{#each data.temas as tema}
						<option value={tema.tema}></option>
					{/each}
				</datalist>
				<input type="hidden" name="tema" bind:value={id} />
				<input type="hidden" name="codUsuario" bind:value={data.user.id}>
				<!-- Campo del título -->
				<div>
					<label for="title" class="mb-1 block text-sm font-medium text-gray-700">
						Título del artículo
					</label>
					<input
						type="text"
						name="titulo"
						id="title"
						class="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm transition duration-150 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
						placeholder="Titulo del artículo..."
						required
					/>
				</div>

				<!-- Campo del contenido -->
				<div>
					<label for="content" class="mb-1 block text-sm font-medium text-gray-700">
						Contenido
					</label>
					<textarea
						id="content"
						name="texto"
						bind:value={valor}
						class="h-96 w-full resize-y rounded-md border border-gray-300 px-4 py-2 shadow-sm transition duration-150 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
						placeholder="Escribe tu artículo aquí..."
						required
					></textarea>
				</div>

				<!-- Botón de envío -->
				<button
					type="submit"
					class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Guardar artículo
				</button>
			</div>
		</form>

		<!-- Vista previa -->
		{#if valor}
			<div class="rounded-lg bg-white p-6 shadow-sm">
				<h2 class="mb-4 text-lg font-semibold text-gray-900">Vista previa</h2>
				<div class="prose max-w-none">
					{@html sanitizeContent}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	/* Estilos para el contenido markdown renderizado */
	:global(.prose) {
		@apply text-gray-800;
	}
	:global(.prose h1) {
		@apply mb-4 text-3xl font-bold text-gray-900;
	}
	:global(.prose h2) {
		@apply mb-3 text-2xl font-bold text-gray-900;
	}
	:global(.prose h3) {
		@apply mb-2 text-xl font-bold text-gray-900;
	}
	:global(.prose p) {
		@apply mb-4 leading-relaxed;
	}
	:global(.prose ul) {
		@apply mb-4 list-inside list-disc;
	}
	:global(.prose ol) {
		@apply mb-4 list-inside list-decimal;
	}
	:global(.prose a) {
		@apply text-indigo-600 underline hover:text-indigo-800;
	}
	:global(.prose blockquote) {
		@apply my-4 border-l-4 border-gray-200 pl-4 italic;
	}
	:global(.prose code) {
		@apply rounded bg-gray-100 px-1 py-0.5 font-mono text-sm;
	}
	:global(.prose pre) {
		@apply overflow-x-auto rounded-lg bg-gray-100 p-4;
	}
</style>
