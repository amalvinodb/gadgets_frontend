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
import { Router } from '@angular/router';

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
  constructor(private listService: ListAllApiService, private router: Router) {}
  currentPage = 1;
  pageData: any;
  readonly name = model('');
  readonly dialog = inject(MatDialog);
  openDialog(type: string, id: string = '-1'): void {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      maxWidth: '500px',
      data: { type, id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.getDataForTable(this.currentPage);
      }
    });
  }

  ngOnInit(): void {
    this.getDataForTable(this.currentPage);
  }
  getDataForTable(page: any) {
    this.listService.getAllGadgetDetails(page).subscribe((response: any) => {
      this.dataSource = new MatTableDataSource<GadgetData>(response.data.data);
      this.pageData = response.page;
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
  }
  updateData(id: string) {
    this.openDialog('Update', id);
  }

  removeData() {
    this.listService
      .bulkDeleteGadget(this.selection.selected)
      .subscribe((response) => {
        this.getDataForTable(this.currentPage);
      });
  }
  deleteItem(id: string) {
    // console.log(id);
    this.listService.deleteGadget(id).subscribe((data) => {
      this.getDataForTable(this.currentPage);
    });
  }
  updateItem(id: string) {
    console.log(id);
    this.updateData(id);
  }
  navigateTo(targetRoute: string): void {
    this.router.navigate([targetRoute]);
  }
  nextPage() {
    this.currentPage = this.currentPage + 1;
    this.getDataForTable(this.currentPage);
  }
  previousPage() {
    this.currentPage = this.currentPage - 1;
    this.getDataForTable(this.currentPage);
  }
}
