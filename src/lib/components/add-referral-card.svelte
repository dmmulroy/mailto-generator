<script lang="ts">
  import Card from "./card.svelte";
  import { store } from "$lib/referral-store.svelte";
</script>

<Card>
  <div class="flex flex-col space-y-1.5">
    <h3
      class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight"
    >
      Add Referrals
    </h3>
    <p class="text-sm text-muted-foreground">
      Enter the names and emails of your referrals.
    </p>
  </div>
  <div>
    <div class="pt-4">
      <div class="grid gap-4 pb-4">
        <div class="grid grid-cols-3 gap-4">
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="referral_first_name">First Name</label
            ><input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="referral_first_name"
              placeholder="John"
              bind:value={store.referral.name.first}
            />
          </div>
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="lastName-0">Last Name</label
            ><input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="lastName-0"
              placeholder="Doe"
              bind:value={store.referral.name.last}
            />
          </div>
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="email-0">Email (optional)</label
            ><input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="email-0"
              placeholder="john@example.com"
              type="email"
              bind:value={store.referral.email}
            />
          </div>
        </div>
        <button
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          onclick={() => store.addReferral()}>Add Referral</button
        >
      </div>
    </div>
  </div>
</Card>
