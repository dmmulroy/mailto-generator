import type { Referral } from "./referral";

export class ReferralStore {
	private _referrals: Array<Referral> = $state([]);
	private _subject: string = $state("");

	constructor() {}

	addReferral = (referral: Referral): void => {
		this._referrals.push(referral);
	};

	public get subject(): Readonly<string> {
		return this._subject;
	}

	public set subject(subject: string) {
		this._subject = subject;
	}

	public get referrals(): ReadonlyArray<Referral> {
		return this._referrals;
	}
}

const store = new ReferralStore();

export function getStore(): ReferralStore {
	return store;
}
