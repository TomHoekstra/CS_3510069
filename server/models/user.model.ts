import * as mongoose from 'mongoose';

export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;

export interface IUser {
    studentId : string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;   
}

export interface IMongooseUser extends mongoose.Document, IUser {

}

export const UserSchema = new Schema({
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },    
});

const User = mongoose.model<IMongooseUser>('User', UserSchema, 'users', true);
export default User;