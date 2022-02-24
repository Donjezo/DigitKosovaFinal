import { Grid, Header, Segment } from "semantic-ui-react";
import React from "react";
import Breadcrumbs from "../../app/layout/Breadcrumbs";
import WelcomeBanner from "../../app/layout/WelcomeBanner";

import NavBar from "../../app/layout/NavBar";

export default function AdminDashboard() {
  return (
    <>
    <Segment><NavBar></NavBar></Segment>
    
      <Segment.Group>
        <Segment>
          <Breadcrumbs />
        </Segment>
        <Segment style={{ backgroundColor: "#9C528B" }}>
          <Header as="h3" content="Dashboard" />
        </Segment>
      </Segment.Group>
      <Grid>
        <Grid.Column width="10">
          <WelcomeBanner />
          <Grid>
            <Grid.Column width="8">Smth</Grid.Column>
            <Grid.Column width="8">Other</Grid.Column>
          </Grid>
        </Grid.Column>
        <Grid.Column width="6">gresa berisha</Grid.Column>
      </Grid>
    </>
  );
}
