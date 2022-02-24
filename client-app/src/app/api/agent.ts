import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { AccountDto, AccountFormValues, Grades, GradesDto, Professor, registerProfessor, Student, Subject, User, UserFormValues } from "../models/user";
import { store } from "../stores/store";
import { history } from '../..';

// fake delay
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

// base url so that for every request it uses this url
axios.defaults.baseURL = "http://localhost:54635/api";

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

// everytime we recive a response from the api we do smth with that response
axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

// store the data we get from axios in this response body
const responseBody = <T>(response: AxiosResponse<T>) => response.data; 

// the common requests
const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

// object that going to store our request for our accouts
const Account = {
    current: () => requests.get<User>('/user'),
    login: (user: UserFormValues) => requests.post<User>('user/login', user),
    register: (user: AccountFormValues) => requests.post<User>('/user/register', user)
}

const AccountManagement = {
    list: () => requests.get<AccountDto[]>('/user/all'),
    getProfessor: (id: string) => requests.get<Professor>(`/user/prof/${id}`),
    registerProfessor: (user: registerProfessor) => requests.post('/user/register/professor', user),
    delete: (id: string) => requests.delete<void>(`/user/${id}`),
    update: (user: AccountDto) => requests.put<void>(`/user/${user.id}`, user),
    details: (id: string) => requests.get<AccountDto>(`/user/${id}`),
    
}

const SubjectManagement = {
    list: () => requests.get<Subject[]>('/subjects'),
    delete: (id: any) => requests.delete(`/subjects/${id}`),
    details: (id: any) => requests.get<Subject>(`/subjects/${id}`),
    update: (subject: Subject) => requests.put<void>(`/subjects/${subject.id}`, subject),
    create: (subject: Subject) => requests.post<void>(`/subjects`, subject)
}

const GradesManagement = {
    list: () => requests.get<Grades[]>('/gradings'),
    delete: (id: string) => requests.delete<void>(`/gradings/${id}`),
    details: (id: string) => requests.get<Grades>(`/gradings/${id}`),
    update: (grades: Grades) => requests.put<void>(`/gradings/${grades.id}`, grades),
    create: (grades: GradesDto) => requests.post<void>('/gradings', grades),
    byStudent: (studentId: string) => requests.get<Grades[]>(`/gradings/student/${studentId}`)
}
const Students = {
    list: () => requests.get<Student[]>('/user/all'),
    details: (id: string) => requests.get<Student>(`/user/${id}`),
    delete: (id: string) => requests.delete<void>(`/user/${id}`),
    update: (user: Student) => requests.put<void>(`/user/${user.id}`, user),
}

const agent ={
    Account,
    AccountManagement,
    SubjectManagement,
    GradesManagement,
    Students
}

export default agent; 