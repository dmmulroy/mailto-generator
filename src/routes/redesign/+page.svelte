<script lang="ts">
  import EmailTemplateCard from "$lib/components/email-template-card.svelte";
  import AddReferralCard from "$lib/components/add-referral-card.svelte";
  import ReferralsCard from "$lib/components/referrals.svelte";
  import { getStore } from "$lib/referral-store.svelte"

  let store = getStore();
  $inspect(store.subject);
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 md:p-8">
  <EmailTemplateCard />
  <div class="grid grid-cols-1 gap-4">
    <AddReferralCard />
    <ReferralsCard />
  </div>
</div>
