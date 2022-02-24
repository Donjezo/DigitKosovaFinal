import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Header, Segment, Table } from "semantic-ui-react";
import Breadcrumbs from "../../app/layout/Breadcrumbs";
import { useStore } from "../../app/stores/store";
import ViewSubject from "./ViewSubject";
import NavBar from "../../app/layout/NavBar";

export default observer(function SubjectManagement() {
  const { userStore, modalStore } = useStore();
  const { user, loadProfessor, selectedProfessor: prof } = userStore;

  useEffect(() => {
    loadProfessor(user?.id!);
  }, [user]);

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
          <Header as="h3" content="Accounts" />
        </Segment>
      </Segment.Group>
      <Table textAlign="center" celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{prof?.subject.name}</Table.Cell>
            <Table.Cell>{prof?.subject.description}</Table.Cell>
            <Table.Cell>
              <Button content='View' color='purple' onClick={() => modalStore.openModal(<ViewSubject id={prof?.subject.id!} />)} />
             </Table.Cell> 
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
});
