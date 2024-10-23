import {FormControl, ValidationErrors} from '@angular/forms';

export class MayaValidators {

	static notOnlyWhitespace(control: FormControl): ValidationErrors | null {
		if(control.value && (typeof control.value) === "string" && control.value.trim().length === 0) {
			return {'notOnlyWhitespace': true};
		}
		return null;
	}
}
