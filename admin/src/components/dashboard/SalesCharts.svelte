<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	/**
	 * @type {HTMLCanvasElement}
	 */
	let portfolio;
	const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const data = {
		labels: labels,
		responsive: true,
		datasets: [
			{
				label: 'Store 1',
				data: [65, 59, 80, 81, 6, 55, 80],
				fill: false,
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.4,
				borderJoinStyle: 'round'
			},
			{
				label: 'Store 2',
				data: [65, 59, 80, 81, 60, 55, 80],
				fill: false,
				borderColor: 'rgb(255, 99, 132)',
				tension: 0.4,
				borderJoinStyle: 'round'
			}
		]
	};

	const config = {
		type: 'line',
		data: data
	};
	onMount(() => {
		const ctx = portfolio.getContext('2d');
		// Initialize chart using default config set
		// @ts-ignore
		var myChart = new Chart(ctx, config);
	});
</script>

<section class="bg-white w-[55%] h-[400px] shadow-lg mx-6 my-4 p-3 rounded-xl">
	<canvas bind:this={portfolio} width={1000} height={400} />
</section>
