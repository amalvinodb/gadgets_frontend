import { Component, inject, model } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-dialog-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-form.component.html',
  styleUrl: './dialog-form.component.css',
})
export class DialogFormComponent {
  myForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      item_name: ['', [Validators.required]],
      item_secret: ['', [Validators.required]],
      item_price: [
        '',
        [Validators.required, Validators.pattern('^-?\\d*(\\.\\d+)?$')],
      ],
      item_quantity: [
        '',
        [Validators.required, Validators.pattern('^-?\\d+$')],
      ],
      key: ['', [Validators.required]],
    });
  }

  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);

  matcher = new MyErrorStateMatcher();

  readonly dialogRef = inject(MatDialogRef<DialogFormComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.animal);

  onNoClick(): void {
    this.dialogRef.close();
  }

  finishedForm() {
    if (this.data.type == 'Add') {
      this.addGadgets();
    } else {
      this.updateGadget();
    }
  }
  addGadgets() {}
  updateGadget() {}
}
