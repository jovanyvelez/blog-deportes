<script>
	let { data } = $props();
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-4xl mx-auto">

    <h1 class="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">
      Noticias
    </h1>

    <div class="bg-white rounded-lg shadow-sm">
      <ul class="divide-y divide-gray-100">
        {#each data.posts as post (post.id)}
          <li class="transition duration-150 ease-in-out hover:bg-gray-50">
            <a
              href={`/noticias/editar/art/${post.id}`}
              data-sveltekit-reload
              class="block px-6 py-4 text-gray-700 hover:text-indigo-600 text-lg font-medium"
            >
              {post.titulo}
            </a>
          </li>
        {/each}
      </ul>
    </div>

  </div>
</div>
