import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Card, Header, Item, Segment } from "semantic-ui-react";
import Breadcrumbs from "../../app/layout/Breadcrumbs";
import { useStore } from "../../app/stores/store";
import ViewSubject from "../professor/ViewSubject";
import NavBar from "../../app/layout/NavBar";

export default observer(function ViewAllCourses() {
  const {
    userStore: { loadSubjects, subjects, subjectsRegistry },
    modalStore,
  } = useStore();

  useEffect(() => {
    if (subjectsRegistry.size <= 1) loadSubjects();
  }, [subjects, subjectsRegistry.size]);

  return (
    <>
    <Segment><NavBar>S</NavBar></Segment>
      <Segment.Group>
        <Segment>
          <Breadcrumbs />
        </Segment>
        <Segment style={{ backgroundColor: "#9C528B", color: "white" }}>
          <Header as="h2" content="Courses" />
        </Segment>
      </Segment.Group>
      <Segment>
        <Item>
          <Card.Group>
            {subjects.map((subject) => (
              <Card>
                <Card.Content key={subject.id}>
                  <Card.Header>{subject.name}</Card.Header>
                  <Card.Description>{subject.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button
                    content="Enroll"
                    icon="edit"
                    basic
                    color="youtube"
                    onClick={() =>
                      modalStore.openModal(<ViewSubject id={subject.id!} />)
                    }
                  />
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Item>
      </Segment>
    </>
  );
});
