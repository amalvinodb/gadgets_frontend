import { Component, inject, model, OnInit } from '@angular/core';
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
import { DialogService } from './dialog.service';
import { ToastrService } from 'ngx-toastr';

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
    ReactiveFormsModule,
  ],
  providers: [DialogService],
  templateUrl: './dialog-form.component.html',
  styleUrl: './dialog-form.component.css',
})
export class DialogFormComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    private toastService: ToastrService
  ) {
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
  ngOnInit() {
    if (this.data.type == 'Update') {
      console.log('data', this.data.id);
      this.dialogService.fetchGadget(this.data.id).subscribe((data: any) => {
        console.log(data);
        this.myForm.patchValue({
          item_name: data.data.item_name,
          item_price: data.data.item_price,
          item_quantity: data.data.item_quantity,
        });
      });
    }
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
  addGadgets() {
    if (this.myForm.valid) {
      this.dialogService.addGadget(this.myForm.value).subscribe((response) => {
        console.log(response);
        this.toastService.success(
          'successfully added new Gadget',
          'Successfully Added'
        );
        this.dialogRef.close({ status: 'content added to table' });
      });
    } else {
      Object.keys(this.myForm.controls).forEach((field) => {
        const control = this.myForm.get(field);
        if (control) {
          control.markAsTouched({ onlySelf: true });
        }
      });
    }
  }
  updateGadget() {
    console.log(this.data.id, this.myForm.value);
    const validFields = Object.fromEntries(
      Object.entries(this.myForm.value).filter(
        ([_, value]) => value !== undefined && value !== null && value !== ''
      )
    );
    this.dialogService
      .updateGadget(this.data.id, validFields)
      .subscribe((response) => {
        this.toastService.success(
          'successfully updated Gadget',
          'Successfylly Updated'
        );
        console.log(response);
        this.dialogRef.close({ status: 'Content Updated' });
      });
  }
}
