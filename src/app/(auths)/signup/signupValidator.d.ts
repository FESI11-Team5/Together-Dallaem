export interface SignupFormValues {
	email: string;
	password: string;
	confirmPassword: string;
	name: string;
	companyName: string;
}

export interface ValidationResult {
    fieldErrors: Partial<Record<keyof SignupFormValues, string>>;
}

export interface SignupValidator {
    validate(values: SignupFormValues): ValidationResult;
}
