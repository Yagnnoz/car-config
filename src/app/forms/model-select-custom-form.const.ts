import { ModelSelectCustomForm } from "./model-select.form";
import { FormControl, FormGroup } from "@angular/forms";


export const MODEL_SELECT_CUSTOM_FORM: ModelSelectCustomForm = new FormGroup({
  model: new FormControl<string>('', {
    nonNullable: true,
  }),
  color: new FormControl<string>('', {
    nonNullable: true,
  }),
})
