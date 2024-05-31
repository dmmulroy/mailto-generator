<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();
</script>

<div
  class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-3xl"
>
  {@render children()}
</div>
