import { FormControl, FormGroup } from "@angular/forms";

export type ModelSelectCustomForm = FormGroup<{
  model: FormControl<string>;
  color: FormControl<string>;
}>


// using getRawValue as type will always be partial
// reactive forms put undefined in the control if disabled, raw value ignores this
export type ModelSelectCustomFormValue = ReturnType<ModelSelectCustomForm['getRawValue']>;
