import { Name, Referral } from "./referral.svelte";

type EmailTemplateState = {
	subject: string;
	cc: string;
	advisor: Name;
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


const defaultSubject = "Introduction - [advisor_name]";

function compileTemplate(template: string, state: ReferralStoreState) {
	return template
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
			"[advisor_first_name]",
			Name.getFirstName(state.emailTemplateState.advisor),
		)
		.replaceAll(
			"[advisor_last_name]",
			Name.getLastName(state.emailTemplateState.advisor),
		)
		.replaceAll(
			"[advisor_name]",
			Name.getFullName(state.emailTemplateState.advisor),
		);
}

const defaultState = {
	emailTemplateState: {
		subject: defaultSubject,
		cc: "",
		referrer: {
			first: "",
			last: "",
		},
		advisor: {
			first: "",
			last: "",
		},
		template: "",
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
			const state = JSON.parse(maybeJson);
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
			}?subject=${subject}&body=${body}&cc=${this.state.emailTemplateState.cc}`,
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

	public get advisor(): Readonly<Name> {
		return this.state.emailTemplateState.advisor;
	}

	public set advisor(advisor: Name) {
		this.state.emailTemplateState.advisor = advisor;
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

	public get referrals(): Array<Referral> {
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
