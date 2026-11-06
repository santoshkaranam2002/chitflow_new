import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Payment } from '../../core/models';
import { IconTile } from '../icon-tile/icon-tile';
import { InrPipe } from '../pipes/inr.pipe';

@Component({
  selector: 'app-payment-item',
  imports: [NgClass, DatePipe, RouterLink, IconTile, InrPipe],
  templateUrl: './payment-item.html',
  styleUrl: './payment-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentItem {
  readonly payment = input.required<Payment>();
}
