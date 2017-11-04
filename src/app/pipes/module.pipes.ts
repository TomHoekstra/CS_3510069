import { NgModule } from "@angular/core";
import { TransactionFilter } from "./transaction-filter.pipes";


@NgModule({
    declarations: [
        TransactionFilter
    ],
    exports: [
        TransactionFilter
    ]
})

export class PipesModule { }
