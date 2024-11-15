<script lang="ts">
	import type { ActionData } from "./$types";
	let { form }: { form:ActionData } = $props();
</script>

<div class="grid">
	<form action="?/register" method="post">
		<h1>Registro</h1>

		<div>
			<label for="email">Escribe tu email</label>
			<input id="email" name="email" type="email" required />
		</div>

		<div>
			<label for="password">Escribe tu Password</label>
			<input id="password" name="password" type="password" required />
		</div>

		<div>
			<label for="password1">Confirma Password</label>
			<input id="password1" name="password1" type="password" required />
		</div>

		{#if form?.user}
			<p class="error">{form.user}</p>
		{/if}

		{#if form?.mensaje}
		    <p class="error">{form.mensaje}</p>
        {/if}

		<button type="submit">Registrarse</button>
	</form>
</div>

<style>
	.grid {
		display: grid;
		place-items: center;
		min-height: 100vh;
	}

	h1 {
		color: #d3d3d3; /* Color de texto gris claro */
		margin-bottom: 1rem; /* Espaciado inferior */
		font-size: 2rem;
		text-align: center;
	}

	form {
		background-color: #3a3a3a; /* Un tono ligeramente más claro para el formulario */
		padding: 20px; /* Espaciado interno */
		border-radius: 8px; /* Bordes redondeados */
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para el formulario */
	}

	input {
		background-color: #4a4a4a; /* Un tono gris oscuro para el fondo del input */
		color: #d3d3d3; /* Color de texto gris claro */
		border: 1px solid #5a5a5a; /* Borde gris oscuro */
		padding: 10px; /* Espaciado interno */
		border-radius: 4px; /* Bordes redondeados */
		width: 100%; /* Ancho completo */
		box-sizing: border-box; /* Incluir padding y borde en el ancho total */
		margin-bottom: 1rem; /* Espaciado inferior */
	}

	input:focus {
		outline: none; /* Sin borde de enfoque */
		border-color: #6a6a6a; /* Borde más claro al enfocar */
	}

	button {
		background-color: #5a5a5a; /* Un tono gris oscuro para el fondo del botón */
		color: #d3d3d3; /* Color de texto gris claro */
		border: none; /* Sin borde */
		padding: 10px 20px; /* Espaciado interno */
		border-radius: 4px; /* Bordes redondeados */
		cursor: pointer; /* Cambiar el cursor al pasar sobre el botón */
		font-size: 1em; /* Tamaño de fuente */
		margin: 10px auto; /* Centrar el botón horizontalmente */
		display: block; /* Hacer que el botón sea un bloque para centrarlo */
	}

	button:hover {
		background-color: #6a6a6a; /* Un tono más claro al pasar el cursor */
	}

	/*   .error {
    color: #ff6b6b; /* Color rojo para mensajes de error
  }
*/
</style>
