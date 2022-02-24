import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./App.css";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import { useStore } from "./app/stores/store";
import NavBar from "./app/layout/NavBar";
import HomePage from "./app/layout/HomePage";
import AdminDashboard from "./features/admin/AdminDashboard";
import { Route, Switch } from "react-router-dom";
import AccountManagement from "./features/admin/AccountManagement";
import ProfessorDashboard from "./features/professor/ProfessorDashboard";
import LoadingComponent from "./app/layout/LoadingComponent";
import RegisterSubjects from "./features/admin/RegisterSubjects";
import SubjectsTable from "./features/admin/SubjectsTable";
import RegisterProfessors from "./features/admin/RegisterProfessors";
import SubjectManagement from "./features/professor/SubjectManagement";
import StudentDashboard from "./features/student/StudentDashboard";
import ViewAllCourses from "./features/student/ViewAllCourses";
import ChooseRegister from "./features/admin/ChooseRegister";
import RegisterStudent from "./features/admin/RegisterStudent";
import ModalContainer from "./app/common/ModalContainer";
import GradeTable from "./features/professor/grades/GradeTable";
import Grades from "./features/student/grades/Grades";
import BeforeLoginPage from "./app/layout/BeforeLoginPage";
import Header from "./features/Header and footer/Header";

function App() {
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return <LoadingComponent content="Loading app..." />;

  return (

    <>
      
      <ToastContainer position="top-right" hideProgressBar />
      <ModalContainer />
      <Route exact path="/" component={BeforeLoginPage} />
      <Route exact path="/login" component={HomePage} />
      
      <Container fluid style={{ padding: "20px 20px 0 22vw" }}>
              <Switch>
                {/* Admin Routes */}
                <Route exact path="/admin" component={AdminDashboard} />
                <Route path="/admin/accounts" component={AccountManagement} />
                <Route path="/admin/choose-account" component={ChooseRegister} />
                <Route path="/admin/registerProfessors" component={RegisterProfessors}/>
                <Route path="/admin/register-student" component={RegisterStudent}/>
                <Route path="/admin/subject" component={RegisterSubjects} />
                <Route path="/admin/viewSubjects" component={SubjectsTable} />

                {/* Professor Routes */}
                <Route exact path="/professor" component={ProfessorDashboard} />
                <Route path="/professor/course" component={SubjectManagement} />
                <Route path="/professor/grading" component={GradeTable} />
                <Route path="/beforeloginpage" component={BeforeLoginPage} />

                {/* Student Routes */}
                <Route exact path="/student" component={StudentDashboard} />
                <Route path="/student/all-courses" component={ViewAllCourses} />
                <Route path="/student/grade" component={Grades} />

              </Switch>
            </Container>
      
      
        
        
      
    </>
  );
}

export default observer(App);
