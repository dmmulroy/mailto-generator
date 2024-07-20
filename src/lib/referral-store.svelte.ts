import { Contact, Referral } from "./referral.svelte";

type EmailTemplateState = {
	subject: string;
	advisor: Contact;
	referrer: Contact;
	template: string;
};

type AddReferralState = {
	name: Contact;
	email?: string;
};

type ReferralStoreState = {
	emailTemplateState: EmailTemplateState;
	addReferralState: AddReferralState;
	referrals: Array<Referral>;
  version: number
};

const defaultTemplate =
	"Hi [referral_first_name],\n\nI wanted to introduce you to our financial services professional [advisor_name]. We've been working together for a while now and they've helped us change the trajectory of our financial future. No pressure to meet, of course, but I think it would be worthwhile to schedule an intro call.\n\nBest,\n\n[referrer_name]";

const defaultSubject = "Introduction - [advisor_name]";

function compileTemplate(template: string, state: ReferralStoreState) {
	return template
		.replaceAll(
			"[referral_first_name]",
			Contact.getFirstName(state.addReferralState.name),
		)
		.replaceAll(
			"[referral_last_name]",
			Contact.getLastName(state.addReferralState.name),
		)
		.replaceAll(
			"[referral_name]",
			Contact.getFullName(state.addReferralState.name),
		)
		.replaceAll(
			"[referrer_first_name]",
			Contact.getFirstName(state.emailTemplateState.referrer),
		)
		.replaceAll(
			"[referrer_last_name]",
			Contact.getLastName(state.emailTemplateState.referrer),
		)
		.replaceAll(
			"[referrer_name]",
			Contact.getFullName(state.emailTemplateState.referrer),
		)
		.replaceAll(
			"[advisor_first_name]",
			Contact.getFirstName(state.emailTemplateState.advisor),
		)
		.replaceAll(
			"[advisor_last_name]",
			Contact.getLastName(state.emailTemplateState.advisor),
		)
		.replaceAll(
			"[advisor_name]",
			Contact.getFullName(state.emailTemplateState.advisor),
		);
}

const version = 0;

const defaultState = {
  version,
	emailTemplateState: {
		subject: defaultSubject,
		referrer: {
			first: "",
			last: "",
      email: "",
		},
		advisor: {
			first: "",
			last: "",
      email: "",
		},
		template: defaultTemplate,
	},
	addReferralState: {
		name: { first: "", last: "" },
	},
	referrals: [],
};

export class ReferralStore {
	private state: ReferralStoreState = $state(defaultState);

	constructor() {}

	public hydrate = () => {
		const maybeJson = localStorage.getItem("__store__");

		if (maybeJson) {
			const state: ReferralStoreState = JSON.parse(maybeJson);
      const maybeVersion = state?.version


      if (maybeVersion !== version) {
        this.state = defaultState
        return
      }

			this.state = state;
		}
	};

	public persist = () => {
		const snapshot = $state.snapshot(this.state);
		const json = JSON.stringify(snapshot);

		localStorage.setItem("__store__", json);
	};

	public addReferral = (): void => {
		const body = compileTemplate(
			this.state.emailTemplateState.template,
			this.state,
		);

		const subject = compileTemplate(
			this.state.emailTemplateState.subject,
			this.state,
		);

		const mailtoLink = encodeURI(
			`mailto:${
				this.state.addReferralState.email ?? ""
			}?subject=${subject}&body=${body}&cc=${this.state.emailTemplateState.advisor.email}`,
		);

		this.state.referrals.push(
			Referral.make(
				this.state.addReferralState.name,
				$state.snapshot(this.referrer),
				mailtoLink,
				this.state.addReferralState.email,
			),
		);

		this.clearAddReferralState();
	};

	public deleteReferral = (referralId: string) => {
		this.state.referrals = this.referrals.filter(({ id }) => id !== referralId);
	};

	public clearAddReferralState = () => {
		this.state.addReferralState = {
			name: { first: "", last: "" },
		};
	};

	public toggleReferralSent = (referralId: string) => {
		let referral = this.state.referrals.find(({ id }) => id === referralId);

		if (referral !== undefined) {
			referral = Referral.toggleSent(referral);
		}
	};

	public get advisor(): Readonly<Contact> {
		return this.state.emailTemplateState.advisor;
	}

	public set advisor(advisor: Contact) {
		this.state.emailTemplateState.advisor = advisor;
	}

	public get advisorEmail(): Readonly<string | undefined> {
		return this.state.emailTemplateState.advisor.email;
	}

	public set advisorEmail(advisorEmail: string) {
		this.state.emailTemplateState.advisor.email = advisorEmail;
	}

	public get referrer(): Readonly<Contact> {
		return this.state.emailTemplateState.referrer;
	}

	public set referrer(referrer: Contact) {
		this.state.emailTemplateState.referrer = referrer;
	}

	public get referrerEmail(): Readonly<string | undefined> {
		return this.state.emailTemplateState.referrer.email;
	}

	public set referrerEmail(referrerEmail: string) {
		this.state.emailTemplateState.referrer.email = referrerEmail;
	}


	public get template(): Readonly<string> {
		return this.state.emailTemplateState.template;
	}

	public set template(template: string) {
		this.state.emailTemplateState.template = template;
	}

	public get subject(): Readonly<string> {
		return this.state.emailTemplateState.subject;
	}

	public set subject(subject: string) {
		this.state.emailTemplateState.subject = subject;
	}

	public get referrals(): Array<Referral> {
		return this.state.referrals;
	}

	public get referral(): Readonly<AddReferralState> {
		return this.state.addReferralState;
	}

	public set referral(referral: AddReferralState) {
		this.state.addReferralState = referral;
	}

	public get version(): Readonly<number> {
		return this.state.version;
	}
}

export const store = new ReferralStore();
