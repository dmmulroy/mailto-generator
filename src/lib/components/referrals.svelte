<script lang="ts">
    import { getStore } from "$lib/referral-store.svelte";
  import Card from "./card.svelte";
  let store = getStore()
</script>

<Card>
  <div class="flex flex-col space-y-1.5 p-6">
    <h3
      class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight"
    >
      Referrals
    </h3>
    <p class="text-sm text-muted-foreground">
      List of referrals and their status.
    </p>
  </div>
  <div class="p-6">
    <div class="grid gap-4">
      <table class="w-full">
        <thead
          ><tr
            ><th class="text-left">Name</th><th class="text-left">Email</th><th
              class="text-left">Referrer</th
            ><th class="text-left">Sent</th><th></th></tr
          ></thead
        ><tbody
          ><tr
            ><td>{store.subject}</td><td
              ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              ></button></td
            ><td class="text-center"
              ><button
                class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-gray-100 text-gray-900 rounded-md px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors w-fit"
                ><span>Copy link</span></button
              ></td
            ></tr
          ></tbody
        >
      </table>
    </div>
  </div>
</Card>
