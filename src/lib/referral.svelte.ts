import { v4 } from "uuid";

export type Contact = {
	first: string;
	last: string;
  email?: string;
};

export const Contact = {
	getFirstName: (name: Contact) => name.first,
	getLastName: (name: Contact) => name.last,
	getFullName: (name: Contact) => `${name.first} ${name.last}`,
  getEmail: (contact: Contact) => contact.email
};

export type Referral = {
	id: string;
	contact: Contact;
	referrer: Contact;
	sent: boolean;
	mailtoLink: string;
	email?: string;
	timestamp: number;
};

export const Referral = {
	make: (
		contact: Contact,
		referrer: Contact,
		mailtoLink: string,
		email?: string,
	): Referral =>
		$state.snapshot({
			email,
			id: v4(),
			mailtoLink,
			contact,
			referrer,
			sent: false,
			timestamp: Date.now(),
		}),
	toggleSent: (referral: Referral): Referral => ({
		...referral,
		sent: !referral.sent,
	}),
} as const;
