import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListOneService } from './list-one.service';
import { signal } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-one',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
  ],
  providers: [ListOneService],
  templateUrl: './list-one.component.html',
  styleUrl: './list-one.component.css',
})
export class ListOneComponent implements OnInit {
  id: string | null = null;
  gadgetData: any;
  secret = signal('');
  errorMessage = signal('');

  readonly key = new FormControl('', [Validators.required]);

  constructor(
    private route: ActivatedRoute,
    private listOneService: ListOneService,
    private toastr: ToastrService
  ) {}

  updateErrorMessage() {
    if (this.key.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else {
      this.errorMessage.set('');
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID:', this.id);
    this.listOneService.fetchOneData(this.id).subscribe((response: any) => {
      this.gadgetData = response.data;
    });
  }

  decryptSecret() {
    if (!this.key.valid) {
      this.toastr.error('key is required', 'Required Field');
    } else {
      this.listOneService
        .decryptSecret(this.key.value, this.id)
        .subscribe((response: any) => {
          this.secret.set(response.data);
        });
    }
  }
}
