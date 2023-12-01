<script>
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { Input } from 'flowbite-svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';

	// dropdown
	import { Button, Dropdown, DropdownItem, DropdownHeader, Avatar, Tooltip } from 'flowbite-svelte';
	import { ChevronDownSolid } from 'flowbite-svelte-icons';

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
			<Button color="none" class="focus-within:ring-0">
				Eng (IND)
				<ChevronDownSolid
					role="da"
					class="w-3 h-3 ml-2 text-admin-textdominant dark:text-white"
				/></Button
			>
			<Dropdown>
				<DropdownItem>Tam (IND)</DropdownItem>
			</Dropdown>
		</div>
		<div class="flex items-center gap-6">
			<Icon
				icon="lets-icons:bell-pin"
				class="w-6 h-6 cursor-pointer transition duration-75 text-orange-500 hover:text-orange-600"
			/>

			<div class="flex items-center">
				<Avatar data-name="Robert Gouth" rounded src="/images/topbar-adminimage.svg" />
				<Button color="none" class="focus-within:ring-0 text-start">
					<div>
						<div class="flex items-center">
							<span>
								Ansel Joshy <br />
							</span>
							<ChevronDownSolid
								role="da"
								class="w-3 h-3 ml-2 text-admin-textdominant dark:text-white"
							/>
						</div>
						<span class="text-xs text-admin-textdominant"> Admin </span>
					</div>
				</Button>
				<Dropdown>
					<DropdownItem>Dashboard</DropdownItem>
					<DropdownItem>Sign Out</DropdownItem>
				</Dropdown>
			</div>
		</div>
	</div>
</div>
