import * as mongoose from 'mongoose';

export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;

export interface ILiveAnswer {
    questionId: string;
    studentId: string;
    answer: string;
}

export const LiveAnswerSchema = new Schema({
    questionId: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});


export interface IMongooseLiveAnswer extends mongoose.Document, ILiveAnswer { }

const Quiz = mongoose.model<ILiveAnswer>('LiveAnswer', LiveAnswerSchema, 'LiveAnswers', true);
export default Quiz;