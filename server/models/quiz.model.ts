//Model for the quiz, it has an autoIncrement feature. This way the quiz and questions have logical ID's instead of the basic mongoDB ID's
import * as mongoose from 'mongoose';
import * as autoIncrement from 'mongoose-auto-increment';

autoIncrement.initialize(mongoose.connection);

export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;

export interface IQuiz {
    title: string;
    questions: IQuestion[];
    quizCode: string;
}

export interface IQuestion {
    _id: string;
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
        type: Boolean,
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
QuestionSchema.plugin(autoIncrement.plugin, 'Question');

export interface IMongooseQuiz extends mongoose.Document, IQuiz {}

export const QuizSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    questions: [
        QuestionSchema
    ],
    quizCode: {
        type: String,
        required: true
    }
});


QuizSchema.plugin(autoIncrement.plugin, 'Quiz');
const Quiz = mongoose.model<IQuiz>('Quiz', QuizSchema, 'quiz', true);
export default Quiz;