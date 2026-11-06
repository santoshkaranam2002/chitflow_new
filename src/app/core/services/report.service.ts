import { Injectable } from '@angular/core';

import { REPORTS, REPORT_LINKS, REPORT_ROWS } from '../data/mock-data';
import { ReportPeriod } from '../models';

@Injectable({ providedIn: 'root' })
export class ReportService {
  readonly links = REPORT_LINKS;
  readonly rows = REPORT_ROWS;

  period(p: ReportPeriod) {
    return REPORTS[p];
  }
}
