//Model for the quiz the students receives. Has only the questions and answers, not the information which answer is right
import { IQuestion, IQuiz, IAnswer } from './quiz.model';

export default class StudentQuiz {
    title: string;
    questions: StudentQuestion[] = new Array();

    constructor(quiz: IQuiz) {
        this.title = quiz.title;
        quiz.questions.forEach(q => {
            this.questions.push(new StudentQuestion(q))
        });

        this.questions.forEach(
            (item, index) => item.index = index + 1
        )
    }
}

export class StudentQuestion {
    id: string;
    question: string;
    answers: StudentAnswer[] = new Array();
    index: number;

    constructor(question: IQuestion) {
        this.question = question.question;
        this.id = question._id;
        question.answers.forEach(a => {
            this.answers.push(new StudentAnswer(a))
        });
    }
}

export class StudentAnswer {
    answer: string;
    selected: boolean = false;

    constructor(answer: IAnswer) {
        this.answer = answer.answer;
    }
}

