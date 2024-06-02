<script lang="ts">
  import { format } from "date-fns";
  import { Name } from "$lib/referral.svelte";
  import { store } from "$lib/referral-store.svelte";
  import Card from "./card.svelte";
</script>

<Card>
  <div class="h-full overflow-y-hidden">
    <div class="flex flex-col space-y-1.5">
      <h3
        class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight"
      >
        Referrals
      </h3>
      <p class="text-sm text-muted-foreground">
        Referrals
      </p>
    </div>
    <div class="mt-4 h-full overflow-y-scroll pb-14">
      <div class="grid gap-4">
        {#if store.referrals.length > 0}
          {#each store.referrals as referral}
            <div class="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm p-4">
              <div class="flex flex-row justify-between">
                <div class="flex flex-col justify-between">
                  <a
                    class="text-blue-500 hover:underline"
                    href={referral.mailtoLink} 
                  >

                    <span class="text-lg font-semibold">{Name.getFullName(referral.name)}</span>
                  </a>
                </div>
                <button
                  class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 rounded-md px-3"
                  onclick={() => store.deleteReferral(referral.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
              <div class="flex flex-row justify-between text-sm text-gray-500 dark:text-gray-400 pt-4">
                <span>Referred by: {Name.getFullName(referral.referrer)}</span>
                <span>Created  {format(referral.timestamp,"EEE, MMM do yyyy")}</span>
              </div>
              <div class="flex flex-row justify-between items-center pt-2 gap-4">
                <a 
                  href={referral.mailtoLink} 
                  class="inline-flex grow items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 "
                  rel="noopener noreferrer"
                >
                  Preview Email</a>
              </div>
            </div>
          {/each}
        {:else}
          <p class="text-center">No referrals have been created</p>
        {/if}
      </div>
    </div>
  </div>
</Card>



