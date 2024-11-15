<script lang="ts">
	let miArticulo = $state('');
</script>

<div class="mx-auto my-5 flex w-max flex-col">
	<form action="/noticias/editar?/nada" method="post" class="prose w-max bg-red-600">
		<textarea class="textarea textarea-primary textarea-lg w-max" bind:value={miArticulo}
		name= "noticia"
		></textarea>
		<input type="hidden" name="id" value=8 />
	</form>
	<button type="submit" class="btn btn-primary btn-outline my-3">Modificar</button>
</div>
