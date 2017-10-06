import * as mongoose from 'mongoose';

export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;

export interface IQuiz extends mongoose.Document {
    title: string;
    questions: IQuestion[];
}

export interface IQuestion {
    question: string;
    answers: IAnswer[];
}

export interface IAnswer {
    answer: string;
    correct: boolean;
}

const AnswerSchema = new Schema({
    answer: {
        type: String,
        required: true
    },
    correct: {
        type: String,
        required: true
    }
});

export const QuestionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answers: [
        AnswerSchema
    ],
});


export interface IMongooseQuiz extends mongoose.Document, IQuiz {

}

export const QuizSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    questions: [
        QuestionSchema
    ],
});

const Quiz = mongoose.model<IQuiz>('Quiz', QuizSchema, 'quiz', true);
export default Quiz;