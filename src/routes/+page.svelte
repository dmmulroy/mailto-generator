<script lang="ts">
  import { MailPlusIcon, Plus, Trash2Icon } from "lucide-svelte";
  import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
  } from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { store } from "./store.svelte";
  import { onMount } from "svelte";
  import { Contact } from "./contact.svelte";

  onMount(() => {
    store.hydrate();

    $effect(() => store.persist());
  });

  function sendEmail() {
    const data = new ClipboardItem({
      "text/html": new Blob([store.nominatorEmailBody], {
        type: "text/html",
      }),
    });

    navigator.clipboard
      .write([data])
      .then(() => console.log("copied"))
      .catch((error) => console.error(error));
  }
</script>

<Card
  class="w-full rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
>
  <CardHeader>
    <CardTitle class="text-2xl font-bold">Propsecting Tool</CardTitle>
  </CardHeader>
  <CardContent>
    <div class="grid grid-cols-3 gap-4">
      <div class="space-y-2">
        <label
          class="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="advisor_first_name">Advisor First Name</label
        ><input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="advisor_first_name"
          placeholder="Ryan"
          bind:value={store.advisor.first}
        />
      </div>
      <div class="space-y-2">
        <label
          class="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="advisor_last_name">Advisor Last Name</label
        ><input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="advisor_last_name"
          placeholder="Winchester"
          bind:value={store.advisor.last}
        />
      </div>
      <div class="space-y-2">
        <label
          class="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="advisor_email">Advisor Email</label
        ><input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="advisor_email"
          placeholder="ryan@example.com"
          type="email"
          bind:value={store.advisor.email}
        />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div class="space-y-2">
        <label
          class="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="nominator_first_name">Nominator First Name</label
        ><input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="nominator_first_name"
          placeholder="John"
          bind:value={store.nominator.first}
        />
      </div>
      <div class="space-y-2">
        <label
          class="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="nominator_last_name">Nominator Last Name</label
        ><input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="nominator_last_name"
          placeholder="Deer"
          bind:value={store.nominator.last}
        />
      </div>
      <div class="space-y-2">
        <label
          class="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="advisor_email">Nominator Email</label
        ><input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="advisor_email"
          placeholder="john@example.com"
          type="email"
          bind:value={store.nominator.email}
        />
      </div>
    </div>
    <div class="space-y-2">
      <label
        class="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
        class="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        for="message">Email Template</label
      ><textarea
        class="flex h-60 min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        id="message"
        placeholder={"Enter your desired email intro language here"}
        bind:value={store.template}
      ></textarea>

      <p class="flex flex-col pt-2 text-sm text-gray-500 dark:text-gray-400">
        <span class="mb-1">Available Template Parameters</span>
        <span>- [advisor_first_name], [advisor_last_name], [advisor_name]</span>
        <span
          >- [nominator_first_name], [nominator_last_name], [nominator_name]</span
        >
        <span
          >- [referral_first_name], [referral_last_name], [referral_name]</span
        >
      </p>
    </div>
    {#each store.referrals as referral, idx (referral.id)}
      <div class="flex flex-row gap-4 mt-4 w-full">
        <div class="space-y-2 grow">
          <label
            class="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="nominator_first_name">Referral First Name</label
          ><input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="nominator_first_name"
            placeholder="Jane"
            bind:value={store.referrals[idx].first}
          />
        </div>
        <div class="space-y-2 grow">
          <label
            class="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="nominator_last_name">Referral Last Name</label
          ><input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="nominator_last_name"
            placeholder="Doe"
            bind:value={store.referrals[idx].last}
          />
        </div>
        <div class="space-y-2 grow">
          <label
            class="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="advisor_email">Referral Email</label
          ><input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="advisor_email"
            placeholder="jane@example.com"
            type="email"
            bind:value={store.referrals[idx].email}
          />
        </div>
        <div class="space-y-2 flex flex-col justify-end pb-1 items-start">
          <Button
            class="gap-2"
            variant="ghost"
            onclick={() => store.deleteReferral(referral)}
          >
            <Trash2Icon color="red" />
          </Button>
        </div>
      </div>
    {/each}
    <div class="flex mt-8 flex-col justify-center gap-4 items-center">
      <Button
        class="w-[90%] gap-2"
        onclick={() => store.addReferral(Contact.default())}
      >
        <Plus />
        Add Another Referral</Button
      >
      <Button
        class="w-[90%] gap-2"
        href={store.nominatorMailToLink}
        onclick={sendEmail}
      >
        <MailPlusIcon />
        Send Email</Button
      >
    </div>
  </CardContent>
</Card>
