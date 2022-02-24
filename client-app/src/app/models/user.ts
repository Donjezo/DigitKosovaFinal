export interface User {
    id: string;
    firstname: string;
    lastname: string;
    passwordHash: string;
    username: string;
    email: string;
    role: string;
    token: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    username?: string;
    role?: string;
}

export interface AccountFormValues {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    passwordHash: string;
    role: string;
}

export interface AccountDto {
    id: string;
    firstname: string;
    lastname: string;
    userName: string;
    email: string;
    passwordHash: string;
    role: string;
}

export interface PersonalInfo {
    id: string;
    dateOfBirth: string;
    personalNumber: string;
    gender: string;
    phoneNumber: string;
    address: string;
    maritalStatus: string;
}

export interface Professor {
    id: string;
    firstname: string;
    lastname: string;
    userName: string;
    email: string;
    subject: Subject;
    personalInfo: PersonalInfo
}

export interface Student {
    id: string;
    firstname: string;
    lastname: string;
    userName: string;
    email: string;
    role: string;
    personalInfo: PersonalInfo;
    subject: Subject
}

export interface Subject {
    id?: string;
    name: string;
    description: string;
    literature: string;
    topics: string;
    news: string;
}

export interface registerProfessor{
    firstname: string;
    lastname: string;
    userName: string;
    email: string;
    role: string;
    passwordHash: string;
    subjectId: string;
    personalInfo: {
        personalNumber: string;
        dateOfBirth: Date;
        gender: string;
        phoneNumber: string;
        address: string;
        maritalStatus: string;
    }
  }


  export interface Grades{
    id?: string;
    grade: string;
    subject: string;
    description: string;
    studentId: string;
    student?: Student;
    professorId?: string;
    professor?: Professor;

}
  
  export interface GradesDto{
    grade: string;
    subject: string;
    description: string;
    studentId: string;
    student?: Student
}