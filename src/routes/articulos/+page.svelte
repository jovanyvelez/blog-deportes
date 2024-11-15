<script>
	let { data } = $props();
</script>

<div class="max-w-4xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">
        Artículos Recientes
    </h1>

    <div class="space-y-4">
        {#each data.posts as post (post.id)}
            <a
                href={`/blog/${post.id}`}
                class="block bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6
                       border border-gray-100 hover:border-gray-200"
            >
                <div class="flex items-center justify-between">
                    <h2 class="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors">
                        {post.tema}
                    </h2>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         class="h-5 w-5 text-gray-400"
                         viewBox="0 0 20 20"
                         fill="currentColor">
                        <path fill-rule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clip-rule="evenodd" />
                    </svg>
                </div>
            </a>
        {/each}
    </div>
</div>
