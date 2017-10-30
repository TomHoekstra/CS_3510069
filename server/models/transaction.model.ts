import * as mongoose from 'mongoose';

export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;

export interface ITransaction {
    timestamp : Date;
    userId: string;
    sessionId: string;
    quizId: string;
    timespan: number;
    answer: string;   
    result: string;
    event: string;
}

export interface IMongooseTransaction extends mongoose.Document, ITransaction {

}

export const TransactionSchema = new Schema({
    timestamp: {
        type: Date,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    sessionId: {
        type: String,
        required: true
    },
    quizId: {
        type:String,
        required: true
    },
    timespan: {
        type: Number,
        required: false
    },    
    answer: {
        type: String,
        required: false
    },
    result: {
        type: String,
        required: false
    },
    event: {
        type: String,
        enum: ['Start', 'Finish', 'Response', 'Dodge'],
        required: true
      }
});

const Transaction = mongoose.model<IMongooseTransaction>('Transaction', TransactionSchema, 'transactions', true);
export default Transaction;