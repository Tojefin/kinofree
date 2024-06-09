<script>
	export let title = '';
	export let desc = '';
</script>

<section>
	<div class="error">
		{#if $$slots.icon}
			<div class="visual">
				<slot name="icon" />
			</div>
		{/if}
		{#if $$slots.content}
			<slot name="content" />
		{/if}
		{#if title || desc}
			<div class="text">
				<p>{title}</p>
				<span>{desc}</span>
			</div>
		{/if}
		<slot name="action" />
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		max-width: 1920px;
		padding: 20px 40px;
		flex-direction: column;
		align-items: flex-start;
		gap: 32px;
		flex: 1 0 0;
		align-self: stretch;

		@media (max-width: 768px) {
			padding: 16px 16px 40px 16px;
		}
	}

	.error {
		display: flex;
		flex-direction: column;
		gap: 32px;
		justify-content: center;
		align-items: center;
		flex: 1 0 0;
		align-self: stretch;

		@media (max-width: 768px) {
			flex: 2 0 auto;
			align-items: center;
		}

		.visual {
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1px solid rgba(255, 255, 255, 0.04);
			border-radius: 16px;
			width: 80px;
			height: 80px;
			box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
			background: rgba(255, 255, 255, 0.02);

			:global(svg path) {
				stroke: var(--white, #fff);
			}
		}

		.text {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 16px;
		}

		p {
			font-weight: 700;
			font-size: 24px;
			line-height: 117%;
			color: var(--white);
		}

		span {
			max-width: 320px;
			font-weight: 400;
			font-size: 16px;
			line-height: 125%;
			text-align: center;
			color: var(--gray);
		}
	}
</style>
