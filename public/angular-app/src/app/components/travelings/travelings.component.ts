import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';
import { Traveling } from '../../models/traveling.model';
import { TravelingDataService } from '../../services/traveling-data.service';

@Component({
  selector: 'app-travelings',
  templateUrl: './travelings.component.html',
  styleUrls: ['./travelings.component.css'],
})
export class TravelingsComponent implements OnInit {
  travelings: Traveling[] = [];
  totalDocs: number = 0;
  pageNo: number = 0;
  destination: string = '';

  constructor(private travelingService: TravelingDataService,
    public authService:AuthenticationService) {}

  ngOnInit(): void {
    this.getTotalDocs();
  }

  getAll(offset: number, count: number, destination: string) {
    this.travelingService
      .getAll(offset, count, destination)
      .subscribe((traveling) => (this.travelings = traveling));
  }

  deleteOne(travelingId: string) {
    if (confirm('Are you sure you want to delete?') === true) {
      this.travelingService
        .deleteOne(travelingId)
        .subscribe((traveling) => this.reload(0));
    }
  }

  getTotalDocs() {
    this.travelingService
      .getTotalDocs(this.destination)
      .subscribe((totalDocs) => this.calculatePagingAndPopulateData(totalDocs));
  }

  calculatePagingAndPopulateData(totalDocs: number) {
    this.totalDocs = totalDocs;
    let offset = this.pageNo * environment.limitRowCount;
    this.getAll(offset, environment.limitRowCount, this.destination);
  }

  reload(pageNo: number) {
    this.pageNo = pageNo;
    this.getTotalDocs();
  }

  onSearch() {
    this.pageNo = 0;
    this.getTotalDocs()
  }
}
