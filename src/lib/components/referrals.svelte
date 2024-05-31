<script lang="ts">
  import { Name } from "$lib/referral.svelte";
  import { store } from "$lib/referral-store.svelte";
  import Card from "./card.svelte";

  $inspect(store.referrals)
</script>

<Card>
  <div class="flex flex-col space-y-1.5">
    <h3
      class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight"
    >
      Referrals
    </h3>
    <p class="text-sm text-muted-foreground">
      List of referrals and their status.
    </p>
  </div>
  <div class="pt-4">
    <div class="grid gap-4">
      <table class="w-full">
        <thead
          ><tr
            ><th class="text-left">Name</th><th class="text-left">Email</th><th
              class="text-left">Referrer</th
            ><th class="text-left">Link</th><th class="text-left">Sent</th><th
            ></th></tr
          ></thead
        ><tbody>
          {#each store.referrals as referral}
            <tr
              ><td>{Name.getFullName(referral.name)}</td><td
                >{referral.email ?? "n/a"}</td
              ><td>{Name.getFullName(referral.referrer)}</td><td
                ><a
                  class="text-blue-500 hover:underline"
                  href={referral.mailtoLink}
                  target="_blank"
                  rel="noopener noreferrer">Link</a
                ></td
              ><td
                ><input
                  type="checkbox"
                  bind:checked={referral.sent}
                  class="h-4 w-4 ml-4"
                  onchange={() => store.toggleReferralSent(referral.id)}
                /></td
              ><td class="text-center"
                ><button
                  class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-gray-100 text-gray-900 rounded-md px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors w-fit"
                  onclick={async () =>
                    navigator.clipboard.writeText(referral.mailtoLink)}
                  ><span>Copy link</span></button
                ></td
              ></tr
            >{/each}</tbody
        >
      </table>
    </div>
  </div>
</Card>
