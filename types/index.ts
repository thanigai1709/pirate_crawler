export interface ScrapeTarget {
	pcDOMid: string;
	DOMPath: string;
	keyName: string;
}

export interface SignupError {
	username: string;
	email: string;
	password: string;
	cpassword: string;
}

export interface SignupForm {
	username: string;
	email: string;
	password: string;
	cpassword: string;
}
