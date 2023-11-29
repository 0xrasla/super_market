<script>
	import { page } from '$app/stores';
	import {
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		SidebarDropdownWrapper,
		SidebarBrand
	} from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	//yy

	let site = {
		name: 'Supermarket',
		href: '/',
		img: '/icons/adminlogo.svg'
	};

	let spanClass = 'flex-1 ml-3 p-1 whitespace-nowrap text-admin-textdominant';

	let activeClass =
		'flex items-center p-2 text-base font-bold text-white bg-admin-dominant dark:bg-primary-700 rounded-lg dark:text-white hover:bg-admin-dominant dark:hover:bg-gray-700';

	let nonActiveClass =
		'flex items-center p-2 text-base font-normal text-admin-textdominant rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700';

	$: activeUrl = $page.url.pathname;
</script>

<Sidebar {activeUrl} {activeClass} {nonActiveClass}>
	<SidebarWrapper
		divClass="h-screen overflow-y-auto py-4 px-3 bg-gray-50 dark:bg-gray-800 font-poppins"
	>
		<SidebarGroup ulClass="space-y-6 text-admin-textdominant">
			<SidebarBrand {site} />
			<SidebarItem label="Dashboard" href="/dashboard" {spanClass}>
				<svelte:fragment slot="icon">
					<Icon icon="fluent:data-pie-24-filled" class="w-5 h-5 transition duration-75" />
				</svelte:fragment>
			</SidebarItem>
			<SidebarDropdownWrapper
				label="Master"
				id="master"
				ulClass="space-y-2 p-4 text-admin-textdominant"
			>
				<svelte:fragment slot="icon">
					<Icon
						icon="uis:align-left"
						rotate={3}
						class="w-5 h-5 transition duration-75 text-admin-textdominant"
					/>
				</svelte:fragment>
				<SidebarItem label="Warehouse" href="/dashboard/warehouse" {spanClass}>
					<svelte:fragment slot="icon">
						<Icon icon="mynaui:store" class="w-5 h-5 transition duration-75" />
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem label="Category" href="/dashboard/category" {spanClass}>
					<svelte:fragment slot="icon">
						<Icon icon="iconamoon:category" class="w-5 h-5 transition duration-75" />
					</svelte:fragment>
				</SidebarItem>

				<SidebarItem label="Vendor" href="/dashboard/vendor" {spanClass}>
					<svelte:fragment slot="icon">
						<Icon icon="ion:cube-outline" class="w-5 h-5 transition duration-75" />
					</svelte:fragment>
				</SidebarItem>
			</SidebarDropdownWrapper>
			<SidebarItem label="Products" href="/dashboard/products" {spanClass}>
				<svelte:fragment slot="icon">
					<Icon icon="ion:bag-handle" class="w-5 h-5 transition duration-75" />
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem label="Employees" href="/dashboard/employees" {spanClass}>
				<svelte:fragment slot="icon">
					<Icon icon="mdi:graph-line" class="w-5 h-5 transition duration-75" />
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem label="Customer" href="/dashboard/customer" {spanClass}>
				<svelte:fragment slot="icon">
					<Icon icon="ri:message-2-line" class="w-5 h-5 transition duration-75" />
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem label="Shops" href="/dashboard/shops" {spanClass}>
				<svelte:fragment slot="icon">
					<Icon icon="solar:shop-2-broken" class="w-5 h-5 transition duration-75" />
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem label="Settings" href="/dashboard/settings" {spanClass}>
				<svelte:fragment slot="icon">
					<Icon icon="material-symbols:settings-outline" class="w-5 h-5 transition duration-75" />
				</svelte:fragment>
			</SidebarItem>
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>

<style>
	button > span {
		@apply text-admin-textdominant;
	}
</style>
