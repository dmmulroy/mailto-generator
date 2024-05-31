export type Name = {
	first: string;
	last: string;
};

export type Referral = {
	id: number;
	name: Name;
	email?: string;
	referrer: Name;
	sent: boolean;
};

let id = 0;

export const Referral = {
	make: (name: Name, referrer: Name, email?: string): Referral => ({
		id: id++,
		name,
		referrer,
		email,
		sent: false,
	}),
	markSent: (referral: Referral): Referral => ({ ...referral, sent: true }),
} as const;
