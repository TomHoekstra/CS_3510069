//Model for the student their results, calculates the percentage of correct answers
import { IQuiz } from './quiz.model';
import StudentQuiz from './student-quiz.model';

export class QuizResult {
    correctedAnswers: CorrectedAnswer[] = new Array();
    percentage: number;

    constructor(quiz: IQuiz, studentQuiz: StudentQuiz) {
        for (var i = 0; i < quiz.questions.length; i++) {
            let correctedAnswer = new CorrectedAnswer(quiz.questions[i].question);

            for (var n = 0; n < quiz.questions[i].answers.length; n++) {

                if (quiz.questions[i].answers[n].correct === true) {
                    correctedAnswer.correctAnswer = quiz.questions[i].answers[n].answer;
                }

                if (studentQuiz.questions[i].answers[n].selected) {
                    correctedAnswer.studentAnswer = studentQuiz.questions[i].answers[n].answer;
                }
            }

            correctedAnswer.checkIfCorrect();

            this.correctedAnswers.push(correctedAnswer);
        }

        this.calculatePercentage();
    }

    private calculatePercentage() {
        let correctAnswers = 0;

        this.correctedAnswers.forEach(cor => {
            if (cor.correct)
                correctAnswers++;
        });

        this.percentage = correctAnswers / this.correctedAnswers.length * 100;
    }
}

export class CorrectedAnswer {
    question: string;
    correctAnswer: string;
    studentAnswer: string;
    correct: boolean = false;

    constructor(question: string) {
        this.question = question;
    }

    public checkIfCorrect() {
        if (this.correctAnswer === this.studentAnswer) {
            this.correct = true;
        }
    }
}