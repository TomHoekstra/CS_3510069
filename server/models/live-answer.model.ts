//Model for the live answers feature of the quiz.
import * as mongoose from 'mongoose';

export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;

export interface ILiveAnswer {
    quizId: string;
    questionId: string;
    studentId: string;
    answer: string;
}

export const LiveAnswerSchema = new Schema({
    questionId: {
        type: String,
        required: true
    },
    quizId: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    answer: {
        type: Number,
        required: true
    }
});

export interface IMongooseLiveAnswer extends mongoose.Document, ILiveAnswer { }

const LiveAnswer = mongoose.model<ILiveAnswer>('LiveAnswer', LiveAnswerSchema, 'liveAnswers', true);
export default LiveAnswer;