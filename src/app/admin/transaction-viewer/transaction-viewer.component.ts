import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-transaction-viewer',
  templateUrl: './transaction-viewer.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class TransactionViewerComponent {
  public quizCode: string;
  public transactions;

  public filters = {
    questionFilter : null,
    studentFilter :  '',
    eventFilter : '',
    sessionIdFilter : ''
  }
  
  constructor(private transactionService: TransactionService, private messageService: MessageService) { }

  getTransactions({ value, valid }: { value, valid: boolean }) {
    if (valid) {
      this.transactionService.getAllQuizcodesByQuizCode(value.quizCode).subscribe((result) => {
        if (result.success) {
          this.transactions = result.model;
        }
        else {
          this.messageService.add({severity:'error', summary:'Error Message', detail: `Couldn't get the transactions for this QuizCode`});           
        }
      });
    }
  }
}
