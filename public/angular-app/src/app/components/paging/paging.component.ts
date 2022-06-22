import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css'],
})
export class PagingComponent implements OnInit, OnChanges {
  @Input() totalDocs: number = 0;
  @Output() pageClickEvent = new EventEmitter<number>();

  totalPages: number = 0;
  pageNo: number = 0;
  currentPage: number = 0;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.currentPage=0;
    this.totalPages = Math.ceil(this.totalDocs / environment.limitRowCount);
  }

  ngOnInit(): void {}

  emitEvent(): void {
    this.pageClickEvent.emit(this.currentPage);
  }

  onPrevious() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.emitEvent();
    }
  }

  onNext() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.emitEvent();
    }
  }
}
