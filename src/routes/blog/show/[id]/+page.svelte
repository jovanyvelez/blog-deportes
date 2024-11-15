<script>
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';
	let { data } = $props();
	let { tema } = data;

	let sanitizeContent = $state('');

	$effect(() => {
		(async () => {
			if (tema) {
				sanitizeContent = DOMPurify.sanitize(await marked(tema.noticia));
			}
		})();
	});
</script>

<div class="max-w-4xl mx-auto px-4 py-8">

    <a
        href="/articulos"
        class="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8 group"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
            />
        </svg>
        <span class="font-medium">Regresar a Artículos</span>
    </a>

    <article class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        {#if tema}
            <h1 class="text-3xl font-bold text-gray-800 mb-6">
                {tema.titulo}
            </h1>


            <div class="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
                <div class="flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <span>{tema.fecha || 'Fecha no disponible'}</span>
                </div>
            </div>
        {/if}


        <div
            class="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600
                   prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                   prose-img:rounded-lg prose-hr:border-gray-100"
        >
            {@html sanitizeContent}
        </div>
    </article>


    <div class="mt-8 pt-6 border-t border-gray-100">
        <div class="flex justify-between items-center">
            <a
                href="/articulos"
                class="text-gray-500 hover:text-blue-600 transition-colors"
            >
                Ver más artículos
            </a>

            <button
                class="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Compartir artículo"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                </svg>
            </button>
        </div>
    </div>
</div>
