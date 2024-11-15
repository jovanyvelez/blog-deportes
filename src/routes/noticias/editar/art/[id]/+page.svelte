<script lang="ts">
	import type { User } from '$lib/server/database/schema.js';
	import DOMPurify from 'dompurify';
	import { marked } from 'marked';

	let { data }: { data: { user: User; articulo?: { id: number; noticia: string } } } = $props();
	let miArticulo = $state(data.articulo?.noticia || '');
	let miHtml = $derived(marked(miArticulo));
	let sanitizeContent = $state('');

	$effect(() => {
		(async () => {
			sanitizeContent = DOMPurify.sanitize(await miHtml);
		})();
	});
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-4xl mx-auto">
		<!-- Editor Section -->
		<div class="bg-white rounded-lg shadow-sm p-6 mb-8">
			<h2 class="text-2xl font-bold text-gray-900 mb-6">Editor de Noticias</h2>

			<form action="?/update" method="post" class="space-y-6">
				<div class="space-y-2">
					<label for="editor" class="block text-sm font-medium text-gray-700">
						Contenido de la noticia
					</label>
					<textarea
						id="editor"
						bind:value={miArticulo}
						name="noticia"
						class="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y shadow-sm text-gray-900 bg-red-50"
						placeholder="Escribe tu noticia aquí..."
					></textarea>
				</div>

				<input type="hidden" name="id" value={data.articulo?.id} />

				<button
					type="submit"
					class="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
				>
					Guardar cambios
				</button>
			</form>
		</div>

		<!-- Preview Section -->
		<div class="bg-white rounded-lg shadow-sm p-6">
			<h2 class="text-2xl font-bold text-gray-900 mb-6">Vista previa</h2>
			<div class="prose max-w-none">
				{@html sanitizeContent}
			</div>
		</div>
	</div>
</div>

<style>
	/* Estilos adicionales para el contenido del artículo renderizado */
	:global(.prose) {
		@apply text-gray-800;
	}
	:global(.prose h1) {
		@apply text-3xl font-bold mb-4 text-gray-900;
	}
	:global(.prose h2) {
		@apply text-2xl font-bold mb-3 text-gray-900;
	}
	:global(.prose p) {
		@apply mb-4 leading-relaxed;
	}
	:global(.prose ul) {
		@apply list-disc list-inside mb-4;
	}
	:global(.prose ol) {
		@apply list-decimal list-inside mb-4;
	}
	:global(.prose a) {
		@apply text-indigo-600 hover:text-indigo-800 underline;
	}
</style>
