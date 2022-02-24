import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Header, Segment, Table } from "semantic-ui-react";
import Breadcrumbs from "../../../app/layout/Breadcrumbs";
import { useStore } from "../../../app/stores/store";
import CreateGrade from "./CreateGrade";
import NavBar from "../../../app/layout/NavBar";

export default observer(function GradeTable() {
  const { userStore, modalStore } = useStore();
  const {
    loadStudents,
    students,
    studentRegistry,
    selectedAccount: user,
  } = userStore;

  useEffect(() => {
    if (studentRegistry.size <= 1) loadStudents();
  }, [studentRegistry.size, loadStudents]);

  return (
    <>
    <Segment>
      <NavBar></NavBar>
    </Segment>
      <Segment.Group>
        <Segment>
          <Breadcrumbs />
        </Segment>
        <Segment style={{ backgroundColor: "#9C528B" }}>
          <Header as="h2" content="Students" />
        </Segment>
      </Segment.Group>
      <Segment>
        <Header sub content="Grade all students" />
        <Table textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ backgroundColor: "#9C528B" }}>
                First Name
              </Table.HeaderCell>
              <Table.HeaderCell style={{ backgroundColor: "#9C528B" }}>
                Last name
              </Table.HeaderCell>
              <Table.HeaderCell style={{ backgroundColor: "#9C528B" }}>
                Email
              </Table.HeaderCell>
              <Table.HeaderCell style={{ backgroundColor: "#9C528B" }}>
                Role
              </Table.HeaderCell>
              <Table.HeaderCell style={{ backgroundColor: "#9C528B" }}>
                Actions
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {students.map((student) => (
              <Table.Row key={student.id}>
                <Table.Cell>{student.firstname}</Table.Cell>
                <Table.Cell>{student.lastname}</Table.Cell>
                <Table.Cell>{student.email}</Table.Cell>
                <Table.Cell>{student.role}</Table.Cell>
                <Table.Cell>
                  <Button
                    content="Add Grade"
                    icon="add"
                    basic
                    color="youtube"
                    onClick={() =>
                      modalStore.openModal(<CreateGrade id={student.id} />)
                    }
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    </>
  );
});
