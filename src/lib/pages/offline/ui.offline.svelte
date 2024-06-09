<script>
	import { Button } from '$lib/elements/button';
	import { ErrorTemplate } from '$lib/elements/error';
	import { WifiProblemIcon, RefreshIcon } from '$lib/shared/icons';
</script>

<ErrorTemplate title={`Нет интернета`} desc={`Проверьте подключение и обновите страницу`}>
	<WifiProblemIcon slot="icon" />
	<a href="/" slot="action">
		<Button>
			Обновить страницу <RefreshIcon />
		</Button>
	</a>
</ErrorTemplate>
