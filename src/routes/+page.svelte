<script lang="ts">
  type Referral = Readonly<{
    id: number;
    name: string;
    email?: string;
  }>;
  let nextId = 0;

  let subject = "Hello, [name]";
  let cc: undefined | string = undefined;

  let bodyTemplate =
    "Hi [name], I wanted to introduce you to our financial services...";

  let referrals: Array<Referral> = [{ id: nextId++, name: "" }];
  let referralsWithMailtoLinks: Array<Referral & { link: string }> = [];

  function addReferral() {
    referrals = referrals.concat({ id: nextId++, name: "" });
  }

  function removeReferral(referralId: number) {
    referrals = referrals.filter((referral) => referral.id === referralId);
  }

  function replaceName(template: string, name: string) {
    return template.replaceAll("[name]", name);
  }

  function generateMailtoLinks() {
    referralsWithMailtoLinks = referrals.map((referral) => ({
      ...referral,
      link: encodeURI(
        `mailto:${referral.email}?subject=${replaceName(subject, referral.name)}&cc=${cc}&body=${replaceName(bodyTemplate, referral.name)}`,
      ),
    }));
  }
</script>

<main class="w-full flex justify-center pt-12">
  <div
    class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md"
    data-v0-t="card"
  >
    <div class="flex flex-col space-y-1.5 p-6">
      <h3
        class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight"
      >
        Referral Form
      </h3>
      <p class="text-sm text-muted-foreground">
        Enter the names and emails of your referrals. We'll generate a
        pre-filled email for you to send.
      </p>
    </div>
    <div class="p-6">
      <div class="grid gap-4">
        <div class="space-y-2">
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="subject">Subject</label
          ><input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="subject"
            placeholder="Hello, [name]"
            bind:value={subject}
            type="text"
          />
        </div>
        <div class="space-y-2" data-id="12">
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="cc">CC</label
          ><input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="cc"
            placeholder="cc@example.com"
            type="email"
            bind:value={cc}
          />
        </div>
        <div class="space-y-2">
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="message"
          >
            Email Template
          </label>
          <textarea
            class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[150px]"
            id="message"
            bind:value={bodyTemplate}
            placeholder="Hi [name], I wanted to introduce you to our financial services..."
          ></textarea>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Use [name] to insert the referral's name.
          </p>
        </div>
        <div class="grid gap-4">
          {#each referrals as referral, index}
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for={`name-${referral.id}`}
                >
                  Name
                </label>
                <input
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id={`name-${referral.id}`}
                  placeholder="John Doe"
                  bind:value={referral.name}
                />
              </div>
              <div class="space-y-2">
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for={`email-${referral.id}`}
                >
                  Email
                </label>
                <input
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  id={`email-${referral.id}`}
                  placeholder="john@example.com"
                  bind:value={referral.email}
                />
              </div>
              {#if index !== 0}
                <button
                  class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                  on:click={() => removeReferral(referral.id)}>Remove</button
                >{/if}
            </div>
          {/each}
          <button
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            on:click={addReferral}
          >
            Add Referral
          </button>
        </div>
        <button
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          on:click={generateMailtoLinks}
        >
          Generate Emails
        </button>
      </div>
      {#each referralsWithMailtoLinks as referralWithMailtoLink}
        <div class="flex items-center p-6">
          <div class="grid gap-2">
            <a
              class="text-blue-500 hover:underline"
              href={referralWithMailtoLink.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {referralWithMailtoLink.name}
              {referralWithMailtoLink.email
                ? referralWithMailtoLink.email
                : "no email provided"}
            </a>
          </div>
        </div>
      {/each}
    </div>
  </div>
</main>
