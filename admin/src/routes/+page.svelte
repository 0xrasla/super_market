<script>
	import { goto } from '$app/navigation';
	import { Input, Button, Helper } from 'flowbite-svelte';
	import { EnvelopeOpenOutline, LockOpenOutline } from 'flowbite-svelte-icons';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	let schema = yup.object().shape({
		email: yup.string().required().email('Email must be a valid email address'),
		password: yup.string().required()
	});

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: schema,
		onSubmit: (values) => {
			if (values.email === 'admin@gmail.com' && values.password === 'admin') {
				goto('/dashboard');
			}
		}
	});
</script>

<svelte:head>
	<title>Supermarket - Admin Dashboard</title>
</svelte:head>

<div class="w-screen h-screen flex flex-col justify-center items-center">
	<div class="shadow-2xl p-8 rounded-lg border-2 border-gray-200 border-solid w-[20%]">
		<div class="flex flex-col items-center">
			<img class="w-16 h-16 rounded-full" src="/icons/adminlogo.svg" alt="logo" />

			<h1 class="text-4xl font-bold mb-4 text-center">Admin Login</h1>
		</div>
		<form on:submit={handleSubmit}>
			<div class="grid gap-4 sm:grid-cols-2 sm:gap-6 p-4 text-center">
				<div class="sm:col-span-2">
					<Input
						type="text"
						id="email"
						placeholder="Email"
						name="email"
						bind:value={$form.email}
						on:change={handleChange}
					>
						<EnvelopeOpenOutline slot="left" class="w-4 h-4" />
					</Input>

					{#if $errors.email}
						<Helper class="mt-2" color="red">
							<span class="font-medium">Oh, snapp!</span>
							{$errors.email}
						</Helper>
					{/if}
				</div>
				<div class="sm:col-span-2">
					<Input
						type="password"
						id="password"
						placeholder="Password"
						name="password"
						bind:value={$form.password}
						on:change={handleChange}
					>
						<LockOpenOutline slot="left" class="w-4 h-4" />
					</Input>

					{#if $errors.password}
						<Helper class="mt-2" color="red">
							<span class="font-medium">Oh, snapp!</span>
							{$errors.password}
						</Helper>
					{/if}
				</div>

				<Button type="submit" class="w-32 bg-admin-dominant">Login</Button>
			</div>
		</form>
	</div>
</div>
