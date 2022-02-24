import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Header, Segment, Table } from 'semantic-ui-react';
import Breadcrumbs from '../../../app/layout/Breadcrumbs';
import { useStore } from '../../../app/stores/store';
import NavBar from '../../../app/layout/NavBar';

export default observer(function Grades() {
  const { gradesStore, userStore } = useStore();
  const { loadGradesByStudent, grades, gradesRegistry} = gradesStore;
  const { user } = userStore;

    useEffect(() => {
      if (gradesRegistry.size <= 1) loadGradesByStudent(user?.id!);
  }, [gradesRegistry, loadGradesByStudent]);

    return(
        <>
        <Segment><NavBar></NavBar></Segment>
        <Segment.Group>
        <Segment>
          <Breadcrumbs />
        </Segment>
        <Segment style={{ backgroundColor: "#9C528B" }}>
          <Header as="h2" content="Students" />
        </Segment>
      </Segment.Group>
      <Segment>
        <Header sub content="View My Grades" />
        <Table textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ backgroundColor: "#9C528B" }}>
              Subject
              </Table.HeaderCell>
              <Table.HeaderCell style={{ backgroundColor: "#9C528B" }}>
               Grade
              </Table.HeaderCell>
               <Table.HeaderCell style={{ backgroundColor: "#9C528B" }}>
                Description
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {grades.map(grade =>(
              <Table.Row key={grade.id}>
                <Table.Cell>{grade.subject}</Table.Cell>
                <Table.Cell>{grade.grade}</Table.Cell>
                <Table.Cell>{grade.description}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    </>

  );
});
