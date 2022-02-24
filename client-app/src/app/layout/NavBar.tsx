import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Image, Label, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";


export default observer(function NavBar() {
  const { userStore: { user, logout, loadProfessor, selectedProfessor: professor } } = useStore();

  useEffect(() => {
    if (user && user.role === 'professor') loadProfessor(user.id);
  }, [user, loadProfessor])


  const adminLinks = [
    { key: 'dashboard', name: 'Dashboard', to: '/admin' },
    { key: 'accounts', name: 'Accounts Management', to: '/admin/accounts' },
    { key: 'choose-account', name: 'Choose Account', to: '/admin/choose-account' },
    { key: 'viewSubjects', name: 'View Subjects', to: '/admin/viewSubjects' }
  ]

  const professorLinks = [
    { key: 'dashboard', name: 'Dashboard', to: '/professor' },
    { key: 'course', name: 'Subjects Management', to: '/professor/course' },
    { key: 'grading', name: 'Grade Students', to: '/professor/grading' },
  ]

  const studentLinks = [
    { key: 'dashboard', name: 'Dashboard', to: '/student' },
    { key: 'all-courses', name: ' Avaliable Courses', to: '/student/all-courses' },
    { key: 'grade', name: ' Grades', to: '/student/grade' },
  ]


  return (
    <Menu vertical={true} fixed="left" style={{ marginRight: "50px", minWidth: "20vw", backgroundColor: "#59656F", color: "white" }} className='navbar'>
      <Menu.Item style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="sidebar-logo-header">
          <img src="/assets/ikone.jpg" alt="logo" />
          <h2 style={{ margin: "0", padding: 0, color: "white" }}>DigitKosova</h2>
        </div>
      </Menu.Item>

      <Menu.Item style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "white" }}>
        {user?.role === 'admin' ?
          <Image src={`/assets/user.png`} size="tiny" circular /> :
          <Label style={{ marginBottom: 3 }} circular color='blue' size='massive' content={`${user?.firstname[0]}${user?.lastname[0]}`} />
        }
        <h3 style={{ margin: "0 10px", padding: 0 }}>{user?.firstname + ' ' + user?.lastname}</h3>
      </Menu.Item>

      {user?.role === 'professor' && professorLinks.map(link => (
        <Menu.Item key={link.key} as={NavLink} to={link.to} content={link.name} style={{ color: "white" }} exact activeClassName='active' />
      ))}
      {user?.role === 'student' && studentLinks.map(link => (
        <Menu.Item key={link.key} as={NavLink} to={link.to} content={link.name} style={{ color: "white" }} exact activeClassName='active' />
      ))}
      {user?.role === 'admin' && adminLinks.map(link => (
        <Menu.Item key={link.key} as={NavLink} to={link.to} content={link.name} style={{ color: "white" }} exact activeClassName='active' />
      ))}
      <Menu.Item as={Link} content="Logout" onClick={logout} style={{ color: "white" }} text="Logout" icon="power" />
    </Menu>
  );
});

