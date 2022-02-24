import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import ModalStore from "./modalStore";
import { store } from "./store";
import "react-toastify/dist/ReactToastify.min.css";
import { toast } from "react-toastify";
import { Grades, GradesDto } from "../models/user";

export default class GradesStore {
  gradesRegistry = new Map<string, Grades>();
  selectedGrade: Grades | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;
  modalStore = new ModalStore();

  constructor() {
    makeAutoObservable(this);
  }

  get grades() {
    return Array.from(this.gradesRegistry.values());
  }

  createGrade = async (grade: GradesDto) => {
    try {
      await agent.GradesManagement.create(grade);
      runInAction(() => {
        this.editMode = false;
        this.loading = false;
        store.modalStore.closeModal();
        toast.success("Grade Added Successfully", {
          autoClose: 3000,
          hideProgressBar: false,
        });
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };


  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  loadGradesByStudent = async (studentId: string) => {
    try {
      const grades = await agent.GradesManagement.byStudent(studentId);
      grades.forEach((grade) => {
        this.setGrades(grade);
      });
    } catch (error) {
      console.log(error);
    }
  };

  private setGrades = (grade: Grades) => {
    this.gradesRegistry.set(grade.id!, grade);
  };
}
