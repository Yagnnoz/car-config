import { Injectable } from '@angular/core';
import { ModelSelectCustomForm, ModelSelectCustomFormValue } from "../forms/model-select.form";
import { MODEL_SELECT_CUSTOM_FORM } from "../forms/model-select-custom-form.const";
import { connectable, filter, map, Observable, ReplaySubject, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModelSelectService {

  private readonly form: ModelSelectCustomForm = MODEL_SELECT_CUSTOM_FORM;

  private readonly latestValidValue$: Observable<ModelSelectCustomFormValue>;

  constructor() {

    const hotValidValueChanges$ = connectable(this.getLatestValueChanges(), {
      connector: () => new ReplaySubject(1),
      resetOnDisconnect: false,
    });

    this.latestValidValue$ = hotValidValueChanges$;
    hotValidValueChanges$.connect();

  }

  getForm(): ModelSelectCustomForm {
    return this.form;
  }

  getLatestValueChanges(): Observable<ModelSelectCustomFormValue> {
    return this.getForm().valueChanges.pipe(
      tap(v => console.log('getLatestValueChanges', v)),
      map(() => this.getForm().getRawValue()),
    )
  }
}
