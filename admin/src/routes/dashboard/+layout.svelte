<script>
	import Navebar from '../../components/ui/Navebar.svelte';
	import Topbar from '../../components/ui/Topbar.svelte';
</script>

<div class="w-screen h-screen flex">
	<Navebar />

	<div class="w-full flex flex-col h-full bg-gray-50 dark:bg-gray-800">
		<Topbar />
		<div class="bg-gray-100 dark:bg-gray-800 h-full">
			<slot />
		</div>
	</div>
</div>
