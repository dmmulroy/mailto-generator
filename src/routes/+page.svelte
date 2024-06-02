<script lang="ts">
  import EmailTemplateCard from "$lib/components/email-template-card.svelte";
  import AddReferralCard from "$lib/components/add-referral-card.svelte";
  import ReferralsCard from "$lib/components/referrals.svelte";
  import { store } from "$lib/referral-store.svelte"
  import { onMount } from "svelte";

  onMount(() => {
    store.hydrate();

    $effect(() => {
      store.persist();
    })
  });
</script>

<div class="lg:max-w-7xl lg:w-[80rem] flex flex-col m-6 gap-4 p-4 md:p-8 rounded-lg border bg-card text-card-foreground shadow-sm">
  <div class="hidden lg:flex lg:flex-row gap-4 max-h-[850px]">
    <EmailTemplateCard />
    <ReferralsCard />
  </div>
  <div class="lg:hidden flex flex-col gap-4">
    <div class="max-h-[850px]">
      <EmailTemplateCard />
    </div>
    <div class="max-h-[750px]">
      <AddReferralCard />
    </div>
    <div class="max-h-[750px]">
      <ReferralsCard />
    </div>
  </div>
  <div class="hidden lg:block"><AddReferralCard /></div>
</div>
