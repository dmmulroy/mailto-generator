import { Name, Referral } from "./referral.svelte";

type EmailTemplateState = {
	subject: string;
	cc: string;
	adviser: Name;
	referrer: Name;
	template: string;
};

type AddReferralState = {
	name: Name;
	email?: string;
};

type ReferralStoreState = {
	emailTemplateState: EmailTemplateState;
	addReferralState: AddReferralState;
	referrals: Array<Referral>;
};

const defaultTemplate =
	"Hi [referral_first_name],\n\nI wanted to introduce you to our financial services professional [adviser_name]. We've been working together for a while now and they've helped us change the trajectory of our financial future. No pressure to meet, of course, but I think it would be worthwhile to schedule an intro call.\n\nBest,\n\n[referrer_name]";
const defaultSubject = "Hello, [referral_name]";

function compileTemplate(template: string, state: ReferralStoreState) {
	const result = template
		.replaceAll(
			"[referral_first_name]",
			Name.getFirstName(state.addReferralState.name),
		)
		.replaceAll(
			"[referral_last_name]",
			Name.getLastName(state.addReferralState.name),
		)
		.replaceAll(
			"[referral_name]",
			Name.getFullName(state.addReferralState.name),
		)
		.replaceAll(
			"[referrer_first_name]",
			Name.getFirstName(state.emailTemplateState.referrer),
		)
		.replaceAll(
			"[referrer_last_name]",
			Name.getLastName(state.emailTemplateState.referrer),
		)
		.replaceAll(
			"[referrer_name]",
			Name.getFullName(state.emailTemplateState.referrer),
		)
		.replaceAll(
			"[adviser_first_name]",
			Name.getFirstName(state.emailTemplateState.adviser),
		)
		.replaceAll(
			"[adviser_last_name]",
			Name.getLastName(state.emailTemplateState.adviser),
		)
		.replaceAll(
			"[adviser_name]",
			Name.getFullName(state.emailTemplateState.adviser),
		);

	console.log(result);

	return result;
}

const defaultState = {
	emailTemplateState: {
		subject: defaultSubject,
		cc: "test@test.com",
		referrer: {
			first: "Dillon",
			last: "Mulroy",
		},
		adviser: {
			first: "Timothy",
			last: "Mulroy",
		},
		template: defaultTemplate,
	},
	addReferralState: {
		name: { first: "Morgan", last: "Mulroy" },
	},
	referrals: [],
};

export class ReferralStore {
	private state: ReferralStoreState = $state(defaultState);

	constructor(initialState?: ReferralStoreState) {
		if (initialState) {
			this.state = initialState;
		}
	}

	public addReferral = (): void => {
		const body = compileTemplate(
			this.state.emailTemplateState.template,
			this.state,
		);

		const subject = compileTemplate(
			this.state.emailTemplateState.subject,
			this.state,
		);

		const params = new URLSearchParams({
			subject,
			body,
			cc: this.state.emailTemplateState.cc,
		});

		console.log({ params: params.toString() });

		const mailtoLink = encodeURI(
			`mailto:${
				this.state.addReferralState.email ?? ""
			}?subject=${subject}&body=${body}&cc=${this.state.emailTemplateState.cc}`,
		);

		this.state.referrals.push(
			Referral.make(
				this.state.addReferralState.name,
				this.referrer,
				mailtoLink,
				this.state.addReferralState.email,
			),
		);

		this.clearAddReferralState();
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

	public get adviser(): Readonly<Name> {
		return this.state.emailTemplateState.adviser;
	}

	public set adviser(adviser: Name) {
		this.state.emailTemplateState.adviser = adviser;
	}

	public get cc(): Readonly<string> {
		return this.state.emailTemplateState.cc;
	}

	public set cc(cc: string) {
		this.state.emailTemplateState.cc = cc;
	}

	public get referrer(): Readonly<Name> {
		return this.state.emailTemplateState.referrer;
	}

	public set referrer(referrer: Name) {
		this.state.emailTemplateState.referrer = referrer;
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

	public get referrals(): ReadonlyArray<Referral> {
		return this.state.referrals;
	}

	public get referral(): Readonly<AddReferralState> {
		return this.state.addReferralState;
	}

	public set referral(referral: AddReferralState) {
		this.state.addReferralState = referral;
	}
}

export const store = new ReferralStore();
