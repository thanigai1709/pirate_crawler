import { SignupError, LoginForm, SignupForm } from "@/types";

export const buildSelector = (el: HTMLElement): string => {
	let selector = el.nodeName.toLowerCase();
	if (el.id) {
		selector += "#" + el.id;
	}
	if (el.classList.length > 0) {
		selector += "." + [...el.classList].join(".");
	}
	let parent = el.parentNode as HTMLElement;
	let level = 0;
	while (parent && level < 2) {
		let parentSelector = parent.nodeName.toLowerCase();
		if (parent?.id) {
			parentSelector += "#" + parent.id;
		}
		if (parent?.classList?.length > 0) {
			parentSelector += "." + [...parent?.classList].join(".");
		}
		selector = parentSelector + " > " + selector;
		parent = parent.parentNode as HTMLElement;
		level++;
	}
	return selector;
};

export function getElementData(el: HTMLElement): any {
	let data: any = {};
	data["tagName"] = el.tagName;
	data["classList"] = el.classList.toString();
	if (el.children.length === 0 && el.innerText != "") {
		data.innerText = el.innerText;
	}

	if (el.tagName === "IMG") {
		data["src"] = el.getAttribute("src");
	}
	if (el.tagName === "VIDEO") {
		data["src"] = el.getAttribute("src");
	}
	if (el.tagName === "IFRAME") {
		data["src"] = el.getAttribute("src");
	}
	if (el.tagName === "SVG") {
		data["svg"] = el.innerHTML;
	}

	if (el.tagName === "A") {
		data["href"] = el.getAttribute("href");
	}

	if (el.childNodes.length > 0) {
		data["childNodes"] = [];
		for (let i = 0; i < el.childNodes.length; i++) {
			if (el.childNodes[i].nodeType === 1) {
				data["childNodes"].push(getElementData(el.childNodes[i] as HTMLElement));
			}
		}
	}

	return data;
}

export function registerValidate(values: SignupForm) {
	const errors: Partial<SignupError> = {};

	if (!values.username) {
		errors.username = "Username required";
	} else if (values.username.includes(" ")) {
		errors.username = "Invalid Username...!";
	}

	if (!values.email) {
		errors.email = "Email required";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = "Invalid email address";
	}

	// validation for password
	if (!values.password) {
		errors.password = "Password required";
	} else if (values.password.length < 5 || values.password.length > 20) {
		errors.password = "Must be greater then 5 and less then 20 characters long";
	} else if (values.password.includes(" ")) {
		errors.password = "Invalid Password";
	}

	// validate confirm password
	if (!values.cpassword) {
		errors.cpassword = "Password required";
	} else if (values.password !== values.cpassword) {
		errors.cpassword = "Password Not Match...!";
	} else if (values.cpassword.includes(" ")) {
		errors.cpassword = "Invalid Confirm Password";
	}

	return errors;
}

export function loginValidate(values) {
	const errors: Partial<LoginForm> = {};

	if (!values.email) {
		errors.email = "Email required";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = "Invalid email address";
	}

	// validation for password
	if (!values.password) {
		errors.password = "Password required";
	} else if (values.password.includes(" ")) {
		errors.password = "Invalid Password";
	}

	return errors;
}
