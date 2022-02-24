import { makeAutoObservable, runInAction } from "mobx";
import { AccountDto, AccountFormValues, Professor, Student, Subject, User, UserFormValues } from "../models/user";
import { store } from "./store";
import { history } from "../..";
import agent from "../api/agent";
import { toast } from "react-toastify";


export default class UserStore {
    user: User | null = null;
    subjectsRegistry = new Map<string, Subject>();
    accountRegistry = new Map<string, AccountDto>();
    studentRegistry = new Map<string, Student>();
    selectedAccount: AccountDto | undefined = undefined;
    loading = false;
    loadingInitial = false;
    selectedProfessor: Professor | undefined = undefined;
    selectedSubject: Subject | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            const path = user.role.toLowerCase();
            history.push(`/${path}`);
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/')
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }

    register = async (creds: AccountFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.loadAccounts();
            })
            toast.success('User created successfully');
        } catch (error) {
            throw error;
        }
    }

    get subjects(){
        return Array.from(this.subjectsRegistry.values());
    }

    private setSubject = (subjects: Subject) => {
        this.subjectsRegistry.set(subjects.id!, subjects);
    }

    loadSubjects =async () => {
        try {
            const subjects = await agent.SubjectManagement.list()
            subjects.forEach(subjects => {
                this.setSubject(subjects);
            })
        } catch (error) {
            console.log(error);
        }
    }

    private getSubject = (id: any) => {
        return this.subjectsRegistry.get(id);
    }

    loadSubject = async (id: any) => {
        let subject = this.getSubject(id);
        if (subject) {
            this.selectedSubject = subject;
            return subject;
        } else {
            try {
                subject = await agent.SubjectManagement.details(id);
                this.setSubject(subject);
                runInAction(() => {
                    this.selectedSubject = subject;
                })
                return subject;
            } catch (error) {
                console.log(error);
            }
        }
    }

    registerSubject = async(subject: Subject) =>{
        try {
           if(subject == null) return null
           await agent.SubjectManagement.create(subject);
           runInAction(() => {
            this.loadSubjects();
        })
           toast.success('Subject created successfully');
        } catch (error) {
            console.log(error);
            
        }
    }

    deleteSubject  = async (id: any) => {
        try {
            await agent.SubjectManagement.delete(id);
            runInAction(() => {
                this.subjectsRegistry.delete(id);
            });
            toast.success("Subject deleted successfully");
        } catch (error) {
            console.log(error);
            toast.error("Error deleting subject")
        }
    }

    editSubject = async (subject: Subject) => {
        try {
            await agent.SubjectManagement.update(subject);

            runInAction(() => {
                this.loadSubjects();
            })

            toast.info('Subject updated');
        } catch (error) {
            console.log(error);
        }
    }

    deleteAccount = async (id: string) => {
        try {
            await agent.AccountManagement.delete(id);
            runInAction(() => {
                this.accountRegistry.delete(id);
            })
            toast.info('User deleted successfully');
        } catch (error) {
            console.log(error);
            toast.error("Error deleting user")
        }
    }

    get accounts() {
        return Array.from(this.accountRegistry.values());
    }

    private setAccount = (user: AccountDto) => {
        this.accountRegistry.set(user.id, user);
    }

    loadProfessor = async (id: string) => {
        try {
            const prof = await agent.AccountManagement.getProfessor(id);
            if (prof)
                this.selectedProfessor = prof;
        } catch (error) {
            console.log(error);
        }
    }

    loadAccounts = async () => {
        try {
            const accounts = await agent.AccountManagement.list();
            accounts.forEach(account => {
                this.setAccount(account);
            })
            this.loadingInitial = false;
        } catch (error) {
            console.log(error);
        }
    }

    private getAccount = (id: string) => {
        return this.accountRegistry.get(id);
    }

    loadAccount = async (id: string) => {
        let account = this.getAccount(id);
        if (account) {
            this.selectedAccount = account;
            return account;
        } else {
            this.loadingInitial = true;
            try {
                account = await agent.AccountManagement.details(id);
                this.setAccount(account);
                runInAction(() => {
                    this.selectedAccount = account;
                })
                this.setLoadingInitial(false);
                return account;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }


    registerProfessor =async (creds:any) => {
        try {
            const professor = {
                "firstname": creds.firstname,
                "lastname": creds.lastname,
                "email": creds.email,
                "userName": creds.userName,
                "passwordHash": creds.passwordHash,
                "subjectId": creds.subjectId,
                "role": creds.role,
                "personalInfo": {
                    "personalNumber": creds.personalNumber,
                    "dateOfBirth": creds.dateOfBirth,
                    "gender": creds.gender,
                    "phoneNumber": creds.phoneNumber,
                    "address": creds.address,
                    "maritalStatus": creds.maritalStatus
                }
            };
            await agent.AccountManagement.registerProfessor(professor);
            runInAction(()=>{
                this.loadAccounts();
            });
            toast.success('Professor registered succesfully');
        } catch (error) {
            console.log(error);   
        }
    }

    private setStudent = (student: Student) => {
        if(student.role === 'student'){
            this.studentRegistry.set(student.id, student);
        }else{
            console.log("Can't load Students")
        }
     }


    get students() {
        return Array.from(this.studentRegistry.values());
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    loadStudents= async() => {
        try {
            const students = await agent.Students.list();
            students.forEach(students => {
                this.setStudent(students);
            })
            this.loadingInitial = false;
        } catch (error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
}