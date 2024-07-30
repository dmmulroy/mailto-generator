import { ulid } from "ulid";
import { Contact } from "./contact.svelte";

type ReferralStoreState = {
	subject: string;
	advisor: Contact;
	nominator: Contact;
	referrals: Array<Contact>;
	template: string;
	version: number;
};

const defaultTemplate =
	"Hi [referral_first_name],\n\nI wanted to introduce you to our financial services professional [advisor_name]. We've been working together for a while now and they've helped us change the trajectory of our financial future. No pressure to meet, of course, but I think it would be worthwhile to schedule an intro call.\n\nBest,\n\n[nominator_name]";

const defaultSubject = "Introduction - [advisor_name]";

function compileTemplate(
	template: string,
	referral: Contact,
	state: ReferralStoreState,
) {
	return template
		.replaceAll("[referral_first_name]", Contact.getFirstName(referral))
		.replaceAll("[referral_last_name]", Contact.getLastName(referral))
		.replaceAll("[referral_name]", Contact.getFullName(referral))
		.replaceAll("[nominator_first_name]", Contact.getFirstName(state.nominator))
		.replaceAll("[nominator_last_name]", Contact.getLastName(state.nominator))
		.replaceAll("[nominator_name]", Contact.getFullName(state.nominator))
		.replaceAll("[advisor_first_name]", Contact.getFirstName(state.advisor))
		.replaceAll("[advisor_last_name]", Contact.getLastName(state.advisor))
		.replaceAll("[advisor_name]", Contact.getFullName(state.advisor));
}

const version = 1;

const defaultState = {
	version,
	subject: defaultSubject,
	advisor: {
		id: ulid(),
		first: "",
		last: "",
		email: "",
	},
	nominator: {
		id: ulid(),
		first: "",
		last: "",
		email: "",
	},
	referrals: [
		{
			id: ulid(),
			first: "",
			last: "",
			email: "",
		},
	],
	template: defaultTemplate,
} satisfies ReferralStoreState;

export class ReferralStore {
	private state: ReferralStoreState = $state(defaultState);

	static compileTemplate = compileTemplate;

	constructor() {}

	public hydrate = () => {
		const maybeJson = localStorage.getItem("__store__");

		if (maybeJson) {
			const state: ReferralStoreState = JSON.parse(maybeJson);
			const maybeVersion = state?.version;

			if (maybeVersion !== version) {
				this.state = defaultState;
				return;
			}

			this.state = state;
		}
	};

	public persist = () => {
		const snapshot = $state.snapshot(this.state);
		const json = JSON.stringify(snapshot);

		localStorage.setItem("__store__", json);
	};

	public get advisor(): Readonly<Contact> {
		return this.state.advisor;
	}

	public set advisor(advisor: Contact) {
		this.state.advisor = advisor;
	}

	public get advisorEmail(): Readonly<string | undefined> {
		return this.state.advisor.email;
	}

	public set advisorEmail(advisorEmail: string) {
		this.state.advisor.email = advisorEmail;
	}

	public get nominator(): Readonly<Contact> {
		return this.state.nominator;
	}

	public set nominator(nominator: Contact) {
		this.state.nominator = nominator;
	}

	public get nominatorEmail(): Readonly<string | undefined> {
		return this.state.nominator.email;
	}

	public set nominatorEmail(nominatorEmail: string) {
		this.state.nominator.email = nominatorEmail;
	}

	public get nominatorEmailBody(): Readonly<string> {
		return (
			`Hi, ${Contact.getFirstName(store.nominator)}<br/><br/>` +
			`Thanks again for your willingness to introduce me to the people discussed. ` +
			`As I mentioned, I'm including a couple links here for you to click to make ` +
			`the intro easy. All you need to do is click each link and ensure their email ` +
			`is included in the "To" line. Feel free to edit any of the text if you'd like.<br/><br/>` +
			this.referrals
				.map(
					(referral) =>
						`<a href=${this.referralMailToLink(referral)}>Click here to refer ${Contact.getFullName(referral)}</a><br/><br/>`,
				)
				.join("") +
			`Thanks again!<br/><br/>` +
			`${Contact.getFirstName(store.advisor)}`
		);
	}
	public get nominatorMailToLink(): Readonly<string> {
		const mailToLink =
			`mailto:${store.nominatorEmail}?subject=Referral Introductions` +
			`&body=The body of this email is in your clipboard. Please paste it here and delete this text.`;

		return encodeURI(mailToLink);
	}

	public get template(): Readonly<string> {
		return this.state.template;
	}

	public set template(template: string) {
		this.state.template = template;
	}

	public get subject(): Readonly<string> {
		return this.state.subject;
	}

	public set subject(subject: string) {
		this.state.subject = subject;
	}

	public get referrals(): Array<Contact> {
		return this.state.referrals;
	}

	public set referrals(referrals: Array<Contact>) {
		this.state.referrals = referrals;
	}

	public get version(): Readonly<number> {
		return this.state.version;
	}

	public referralMailToLink(referral: Contact): Readonly<string> {
		const mailToLink = encodeURI(
			`mailto:${
				referral.email ?? ""
			}?subject=${ReferralStore.compileTemplate(this.subject, referral, this.state)}&body=${ReferralStore.compileTemplate(this.template, referral, this.state)}&cc=${this.state.advisor.email}`,
		);

		return mailToLink;
	}

	public addReferral(referral: Contact): void {
		this.referrals.push(referral);
	}

	public deleteReferral(referralToDelete: Contact): void {
		this.referrals = this.referrals.filter(
			(referral) => referral.id !== referralToDelete.id,
		);
	}

	public updateReferral(updateReferral: Contact) {
		this.state.referrals = this.referrals.map((referral) => {
			if (referral.id === updateReferral.id) {
				return updateReferral;
			}

			return referral;
		});
	}
}

export const store = new ReferralStore();
