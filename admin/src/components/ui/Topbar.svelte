<script>
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { Input } from 'flowbite-svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';

	$: heading = $page.url.pathname.split('/').pop(); // return last part of url
</script>

<div class="w-full grid grid-cols-4 items-center p-3 justify-items-start">
	<div>
		<h1 class="text-2xl capitalize font-bold mb-4 text-center">{heading}</h1>
	</div>

	<div class="w-80">
		<Input type="text" id="search" placeholder="Search Here..." name="search">
			<SearchOutline slot="left" class="w-4 h-4 text-admin-dominant" />
		</Input>
	</div>

	<div class="flex items-center gap-6 col-span-2 justify-self-end">
		<div>
			<img src="/images/topbar-language.svg" alt="topbar languages" />
		</div>

		<div class="flex items-center gap-6">
			<Icon icon="lets-icons:bell-pin" class="w-6 h-6 transition duration-75 text-orange-500" />

			<div class="flex items-center gap-4">
				<img src="/images/topbar-adminimage.svg" alt="topbar admin profile" />

				<img src="/images/topbar-adminoptions.svg" alt="topbar admin options" />
			</div>
		</div>
	</div>
</div>
