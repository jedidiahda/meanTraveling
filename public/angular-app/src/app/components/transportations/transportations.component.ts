import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';
import { Transportation } from '../../models/transportation.model';
import { TransportationDataService } from '../../services/transportation-data.service';

@Component({
  selector: 'app-transportations',
  templateUrl: './transportations.component.html',
  styleUrls: ['./transportations.component.css'],
})
export class TransportationsComponent implements OnInit {
  transportations: Transportation[] = [];
  travelingId!: string;
  tranId!: string;
  totalDocs: number = 0;
  pageNo: number = 0;

  constructor(
    private tranService: TransportationDataService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.travelingId = this.activatedRoute.snapshot.params['travelingId'];
    this.getTotalDocs();
  }

  getAll(offset: number, count: number): void {
    this.tranService
      .getAll(this.travelingId, offset, count)
      .subscribe((trans) => (this.transportations = trans));
  }

  getTotalDocs() {
    this.tranService
      .getTotalDocs(this.travelingId)
      .subscribe((totalDocs) =>
        this.calculateTotalPageAndPopulateData(totalDocs)
      );
  }

  calculateTotalPageAndPopulateData(totalDocs: number) {
    this.totalDocs = totalDocs;
    let offset = this.pageNo * environment.limitRowCount;
    this.getAll(offset, environment.limitRowCount);
  }

  onEdit(tranId: string): void {
    this.tranId = tranId;
  }

  //because we allow option delete and multi user, total docs may change after deletion.
  //get total doc each time to get latest data
  reload(pageNo: number): void {
    this.tranId = '';
    this.pageNo = pageNo;
    this.getTotalDocs();
  }

  onDelete(tranId: string): void {
    if (confirm('Are you sure you want to delete?') === true) {
      this.tranService
        .deleteOne(this.travelingId, tranId)
        .subscribe((trans) => this.getTotalDocs());
    }
  }

  addNew(): void {
    this.tranId = '';
  }
}
