<script>
	import { Button } from '$lib/elements/button';
	import { page } from '$app/stores';
	import { ErrorTemplate } from '$lib/elements/error';
	import { CrossIcon, RefreshIcon } from '$lib/shared/icons';
</script>

<ErrorTemplate title={`Ошибка: ${$page.status}`} desc={$page.error.message}>
	<CrossIcon slot="icon" />
	<a href="/" slot="action">
		<Button>
			Перейти на главную <RefreshIcon />
		</Button>
	</a>
</ErrorTemplate>