import * as mongoose from 'mongoose';

export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;

export interface IStudent {
    studentId : string;
}

export interface IMongooseStudent extends mongoose.Document, IStudent {

}

export const StudentSchema = new Schema({
    studentId: {
        type: String,
        required: true,
        unique: true
    }
});

const Student = mongoose.model<IMongooseStudent>('Student', StudentSchema, 'students', true);
export default Student;