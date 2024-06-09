<script>
	export let id;
	export let label = '';
	export let checked = false;
</script>

<label class="checkbox" on:input>
	<input type="checkbox" {id} {checked}/>
	<span>{label}</span>
</label>

<style lang="scss">
	.checkbox {
		width: max-content;
	}

	.checkbox > input {
		position: absolute;
		z-index: -1;
		opacity: 0;
	}

	.checkbox > span {
		display: inline-flex;
		align-items: center;
		user-select: none;

		font-family: var(--font-family);
		font-weight: 500;
		font-size: 14px;
		line-height: 129%;
		color: var(--white);
		cursor: pointer;
		transition: all 0.25s ease;

		@include hover {
			color: var(--yellow);
		}
	}

	.checkbox > span::before {
		content: '';
		display: inline-block;
		width: 24px;
		height: 24px;
		flex-shrink: 0;
		flex-grow: 0;
		border: 1px solid rgba(255, 255, 255, 0.15);
		box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
		background: #1f2227;
		border-radius: 100%;
		margin-right: 0.5em;
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 50% 50%;
		transition: all 0.25s ease;
	}

	.checkbox > input:not(:disabled):not(:checked) + span:hover::before {
		border: 1px solid rgba(255, 255, 255, 0.548);
		background: #36393d;
		background-image: url('/icons/check_mark.svg');
		background-position: center;
		background-repeat: no-repeat;
		filter: invert(30%);
	}

	.checkbox > input:not(:disabled):active + span::before {
		background-color: #36393d;;
		border-color: #36393d;
	}

	.checkbox > input:focus:not(:checked) + span::before {
		border-color: #36393d;;
	}

	.checkbox > input:checked + span::before {
		border-color: #000;
		background: #000;
		background-image: url('/icons/check_mark.svg');
		background-position: center;
		background-repeat: no-repeat;
		filter: invert(100%);
	}

	.checkbox > input:not(:disabled):checked + span:hover::before {
		border-color: #000000;
		background-color: #000000;
		filter: invert(70%);
	}

	.checkbox > input:disabled + span::before {
		background-color: #36393d;;
	}
</style>
