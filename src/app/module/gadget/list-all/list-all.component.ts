import {
  Component,
  inject,
  model,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  MatTable,
  MatTableModule,
  MatTableDataSource,
} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ListAllApiService } from './list-all-api.service';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { DialogFormComponent } from '../../../shared/dialog-form/dialog-form.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

export interface GadgetData {
  id: number;
  image_url: string | null;
  item_name: string;
  item_secret: string;
  item_price: number;
  item_quantity: number;
  item_description: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];

@Component({
  selector: 'app-list-all',
  imports: [
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    CommonModule,
  ],
  providers: [ListAllApiService, DatePipe],
  templateUrl: './list-all.component.html',
  styleUrl: './list-all.component.css',
})
export class ListAllComponent implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'name', 'price', 'actions'];
  dataSource = new MatTableDataSource<GadgetData>();
  selection = new SelectionModel<GadgetData>(true, []);
  constructor(private listService: ListAllApiService) {}
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);
  openDialog(type: string, id?: string): void {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      maxWidth: '500px',
      data: { type },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }

  ngOnInit(): void {
    this.listService.getAllGadgetDetails().subscribe((response: any) => {
      console.log(response.data);
      this.dataSource = new MatTableDataSource<GadgetData>(response.data);
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: GadgetData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  addData() {
    this.openDialog('Add');
    console.log(this.selection);
  }

  removeData() {
    console.log(this.selection);
  }
  deleteItem(id: string) {
    console.log(id);
  }
  updateItem(id: string) {
    console.log(id);
  }
}
