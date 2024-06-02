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
                <span class="text-lg font-semibold">{Name.getFullName(referral.name)}</span>
                <div class="flex flex-row justify-center items-center">
                  <input type="checkbox" bind:checked={referral.sent} class="h-4 w-4 ml-4" onchange={()=>
                    store.toggleReferralSent(referral.id)}
                  /> <span class="text-sm font-medium pl-2">Sent</span>
                </div>
              </div>
              <div class="flex flex-row justify-between text-sm text-gray-500 dark:text-gray-400 pt-4">
                <span>Referred by: {Name.getFullName(referral.referrer)}</span>
                <span>Created  {format(referral.timestamp,"EEE, MMM do yyyy")}</span>
              </div>
              <div class="flex flex-row justify-between pt-2 gap-4">
                <button 
                  class="inline-flex grow items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 "
                  onclick={async ()=>
                    navigator.clipboard.writeText(referral.mailtoLink)
                  }

                >

                  Copy Link
                </button>
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



