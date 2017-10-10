import { IQuiz,  IQuestion, IAnswer } from "../../../server/models/quiz.model";

export class Quiz implements IQuiz {
    title: string;
    questions: IQuestion[] = new Array();
    quizCode: string;

    constructor() {
        this.title = "New Quiz"
    }
}

export class Question implements IQuestion {
    question: string;
    answers: IAnswer[] = new Array();

    constructor() {
        this.question = "New Question!"

        this.answers.push(new Answer("Answer 1", true));
        this.answers.push(new Answer("Answer 2", false));
        this.answers.push(new Answer("Answer 3", false));
        this.answers.push(new Answer("Answer 4", false));
    }
}

export class Answer implements IAnswer {
    answer: string;
    correct: boolean;

    constructor(answer: string, correct: boolean)
    {
        this.answer = answer;
        this.correct = correct;
    }
}
