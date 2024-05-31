<script lang="ts">
  import EmailTemplateCard from "$lib/components/email-template-card.svelte";
  import AddReferralCard from "$lib/components/add-referral-card.svelte";
  import ReferralsCard from "$lib/components/referrals.svelte";
</script>

<div class="max-w-7xl m-6 grid grid-cols-1 lg:grid-cols-2 grid-rows-3 gap-4 p-4 md:p-8 rounded-lg border bg-card text-card-foreground shadow-sm">
  <div class="lg:row-span-3">
    <EmailTemplateCard />
  </div>
  <div class="lg:row-span-1">
    <AddReferralCard />
  </div>
  <div class="lg:row-span-2">
    <ReferralsCard />
  </div>
</div>
