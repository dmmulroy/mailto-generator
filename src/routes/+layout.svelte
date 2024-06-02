<script lang="ts">
  import "../app.css";
  import { type Snippet } from 'svelte'
  let { children } : { children: Snippet} = $props();
</script>

<main class="w-screen flex justify-center h-screem">
  {@render children()}
</main>
