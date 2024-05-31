import { v4 } from "uuid";

export type Name = {
	first: string;
	last: string;
};

export const Name = {
	getFirstName: (name: Name) => name.first,
	getLastName: (name: Name) => name.last,
	getFullName: (name: Name) => `${name.first} ${name.last}`,
};

export type Referral = {
	id: string;
	name: Name;
	referrer: Name;
	sent: boolean;
	mailtoLink: string;
	email?: string;
};

export const Referral = {
	make: (
		name: Name,
		referrer: Name,
		mailtoLink: string,
		email?: string,
	): Referral =>
		$state.snapshot({
			email,
			id: v4(),
			mailtoLink,
			name,
			referrer,
			sent: false,
		}),
	toggleSent: (referral: Referral): Referral => ({
		...referral,
		sent: !referral.sent,
	}),
} as const;
