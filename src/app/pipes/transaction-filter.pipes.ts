// Filter for the transactions
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'transactionfilter',
    pure: false
})
export class TransactionFilter implements PipeTransform {
    transform(items: any[], filter: any): any {
        if (!items || !filter) {
            return items;
        }

        // filter items array, items which match and return true will be kept, false will be filtered out
        let filteredList = items.filter(item => item.userId.indexOf(filter.studentFilter) !== -1);
        filteredList = items.filter(item => item.sessionId.indexOf(filter.sessionIdFilter) !== -1);

        if(filter.eventFilter !== '')
        {
            filteredList = items.filter(item => item.event === filter.eventFilter);
        }

        if(filter.questionFilter !== null)
        {
            filteredList = items.filter(item => item.questionId === filter.questionFilter.toString());
        }

        return filteredList;
    }
}