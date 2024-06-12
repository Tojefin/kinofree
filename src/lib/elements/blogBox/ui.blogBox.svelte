<script>
</script>

<section>
	<div class="header">
		<slot name="title" />
		<slot name="subtitle" />
	</div>
	<div class="content">
		<slot name="content" />
	</div>
	<div class="footer">
		<slot name="footer" />
	</div>
</section>

<style lang="scss">
	section {
		max-width: 768px;
		padding: 10px 20px;

		@media (max-width: 1024px) {
			padding: 10px 40px;
		}
		@media (max-width: 768px) {
			padding: 10px 20px;
		}
	}

	.header {
		padding-bottom: 12px;

		:global(h2) {
			margin-bottom: 4px;
			color: #fff;

			/* H2 — Desktop */
			font-size: 28px;
			font-weight: 700;
			line-height: 32px; /* 114.286% */
		}
		:global(span) {
			color: var(--gray, #c0c0c0);

			/* text-16-long */
			font-size: 16px;
			font-weight: 400;
			line-height: 24px; /* 150% */
		}
	}

	.content {
		overflow-y: scroll;
		padding: 24px 20px 44px 0;
		margin-bottom: -40px;
		&::-webkit-scrollbar {
			width: 8px;
		}

		&::-webkit-scrollbar-track {
			background-color: none;
			border-radius: 100px;
		}

		&::-webkit-scrollbar-thumb {
			cursor: pointer;
			border-radius: 100px;
			background: #4f4c10;

			&:hover {
				background: var(--yellow, #fce802);
			}
		}

		:global(h3) {
			margin-bottom: 10px;
			color: #fff;

			/* H4 — Desktop */
			font-size: 18px;
			font-weight: 700;
			line-height: 24px; /* 133.333% */
		}
		:global(p) {
			color: #fff;

			/* text-16-long */
			font-size: 16px;
			font-weight: 400;
			line-height: 24px; /* 150% */
		}
	}

	.footer {
		padding-top: 12px;

		@media (max-width: 768px) {
			width: 100%;
			:global(button) {
				width: 100%;
				justify-content: space-between;
			}
		}
	}
</style>
