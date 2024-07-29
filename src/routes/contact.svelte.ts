import { ulid } from "ulid";

export type Contact = {
	id: string;
	first: string;
	last: string;
	email?: string;
};

export const Contact = {
	default: () => ({ id: ulid(), first: "", last: "" }),
	getId: (contact: Contact) => contact.id,
	getFirstName: (contact: Contact) => contact.first,
	getLastName: (contact: Contact) => contact.last,
	getFullName: (contact: Contact) => `${contact.first} ${contact.last}`,
	getEmail: (contact: Contact) => contact.email,
};
