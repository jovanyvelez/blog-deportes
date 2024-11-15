<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import { page } from '$app/stores';
	import Menu from '$lib/components/Menu.svelte';

	let estado = $state('');
	let admin = $state(false);

	if (!$page.data.user) {
		estado = 'ingreso';
	} else {
		estado = 'salida';
		if($page.data.user.rol === "admin") admin = true;
	}

</script>

<Menu {estado} {admin} />

{@render children()}
