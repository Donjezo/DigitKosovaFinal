import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Grid, Header, Icon, Segment } from "semantic-ui-react";
import Breadcrumbs from "../../app/layout/Breadcrumbs";
import { history } from "../..";
import NavBar from "../../app/layout/NavBar";

export default observer(function ChooseAccountScreen() {
  return (
    <>
    <Segment><NavBar></NavBar></Segment>
      <Segment.Group>
        <Segment>
          <Breadcrumbs />
        </Segment>
        <Segment style={{ backgroundColor: "#9C528B" }}>
          <Header as="h3" content="Accounts" />
        </Segment>
      </Segment.Group>
      <Header as="h1" content="Choose account role" textAlign="center" />
      <br/>
      <Grid textAlign="center">
        <Grid.Column width="5">
          <Segment textAlign="center">
            <Header as="h3" content="Student" />
            <Icon name="user" size="massive" />
            <br />
            <br />
            <Button
              animated="vertical"
              color="purple"
              onClick={() => history.push("/admin/register-student")}
            >
              <Button.Content visible>New Student</Button.Content>
              <Button.Content hidden>
                <Icon name="plus" />
              </Button.Content>
            </Button>
          </Segment>
        </Grid.Column>
        <Grid.Column width="5">
          <Segment textAlign="center">
            <Header as="h3" content="Professor" />
            <Icon name="user" size="massive" />
            <br />
            <br />
            <Button
              animated="vertical"
              color="purple"
              onClick={() => history.push("/admin/registerProfessors")}
            >
              <Button.Content visible>New Professor</Button.Content>
              <Button.Content hidden>
                <Icon name="plus" />
              </Button.Content>
            </Button>
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  );
});
