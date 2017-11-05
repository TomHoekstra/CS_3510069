//UserData that is used to show the name in the frontend, as well as managing their rights to visit certain pages
export interface IUserData {
    signedIn: boolean;
    studentId?: string;
    firstName?: string;
    lastName?: string;
    role: string;
}

