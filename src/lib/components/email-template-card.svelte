<script lang="ts">
  import { store } from "$lib/referral-store.svelte";
  import Card from "./card.svelte";
</script>

<Card>
  <div class="flex flex-col space-y-1.5">
    <h1
      class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight"
    >
      Template
    </h1>
  </div>
  <div class="pt-4">
    <div class="grid gap-4">
      <div class="grid grid-cols-3 gap-4">
        <div class="space-y-2">
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="advisor_first_name">Advisor First Name</label
          ><input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="advisor_first_name"
            placeholder="John"
            bind:value={store.advisor.first}
          />
        </div>
        <div class="space-y-2">
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="advisor_last_name">Advisor Last Name</label
          ><input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="advisor_last_name"
            placeholder="Doe"
            bind:value={store.advisor.last}
          />
        </div>
        <div class="space-y-2">
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="advisor_email">Advisor Email</label
          ><input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="advisor_email"
            placeholder="john@example.com"
            type="email"
            bind:value={store.cc}
          />
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div class="space-y-2">
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="referrer_first_name">Referrer First Name</label
          ><input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="referrer_first_name"
            placeholder="John"
            bind:value={store.referrer.first}
          />
        </div>
        <div class="space-y-2">
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="referrer_last_name">Referrer Last Name</label
          ><input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="referrer_last_name"
            placeholder="Doe"
            bind:value={store.referrer.last}
          />
        </div>
      </div>
      <div class="space-y-2">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="subject">Subject Template</label
        ><input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="subject"
          placeholder="Subject line"
          bind:value={store.subject}
        />
      </div>
      <div class="space-y-2">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="message">Email Template</label
        ><textarea
          class="flex w-full h-60 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[150px]"
          id="message"
          placeholder={store.template}
          bind:value={store.template}
        ></textarea>

        <p class="flex flex-col text-sm pt-2 text-gray-500 dark:text-gray-400">
          <span class="mb-1">Available Template Parameters</span>
          <span
            >- [advisor_first_name], [advisor_last_name], [advisor_name]</span
          >
          <span
            >- [referral_first_name], [referral_last_name], [referral_name]</span
          >
          <span
            >- [referrer_first_name], [referrer_last_name], [referrer_name]</span
          >
        </p>
      </div>
    </div>
  </div>
</Card>
