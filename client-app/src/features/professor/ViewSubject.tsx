import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {Header, HeaderSubheader, Segment, Image, Divider,} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import NavBar from "../../app/layout/NavBar";
interface Props {
  id: string;
}

export default observer(function ViewSubject({ id }: Props) {
  const {
    userStore: { loadSubject, selectedSubject: subject },
  } = useStore();

  useEffect(() => {
    if (id) loadSubject(id);
  }, [id, loadSubject]);

  
  return (
    <> 
     <section>
       <NavBar></NavBar>
     </section>
      
      <Header as="h2" image="/assets/ikone.jpg" content="Learn More With Us" />
      <Segment>
        <Header>{subject?.name}</Header>
        <HeaderSubheader>{subject?.description}</HeaderSubheader>
      </Segment>
      <Segment>
        <Segment>
          <Header as="h3">Literature</Header>
          <p>{subject?.literature}</p>

          <Divider section />

          <Header as="h3">Topics</Header>
          <p>{subject?.topics}</p>
        </Segment>

        <Image src='/assets/kids.jpg' size="small" floated="left" />
        <p>{subject?.news}  </p>
        <Image src='/assets/morekids.jpg' size="small" floated="right" />
        <p>{subject?.news}</p>
        
      </Segment>
    </>
  );
});
