<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();
</script>

<div
  class="p-6 h-full rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-3xl"
>
  {@render children()}
</div>
