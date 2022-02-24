import { link } from 'fs';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Grid, Header, Icon, Popup, Segment, Table } from 'semantic-ui-react';
import Breadcrumbs from '../../app/layout/Breadcrumbs';
import { useStore } from '../../app/stores/store';
import RegisterSubjects from './RegisterSubjects';
import { history } from "../..";
import ViewSubject from './ViewSubject';
import NavBar from '../../app/layout/NavBar';
export default observer(function SubjectsTable(){

    const { userStore:{loadSubjects, subjects, subjectsRegistry, deleteSubject}, modalStore} = useStore();

    useEffect(()=>{
        if(subjectsRegistry.size <= 1) loadSubjects();
    },[subjects, subjectsRegistry.size])

    return(
        <>
        <Segment>
            <NavBar>S</NavBar>
        </Segment>
        <Segment.Group>
                <Segment>
                    <Breadcrumbs />
                </Segment>
                <Segment style={{ backgroundColor: "#9C528B" }}>
                    <Header as='h3' content='Create Subjects' />
                </Segment>
            </Segment.Group>
            <Grid>
                <Grid.Column width='11'>
                    <Segment>
                    <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {subjects.map(subject => (
                    <>
                        <Table.Row key={subject.id}>
                            <Table.Cell>{subject.name}</Table.Cell>
                            <Table.Cell width='7'>
                                {subject.description.length > 100 ? subject.description.substring(0, 99) + '...' : subject.description}
                            </Table.Cell>
                            <Table.Cell textAlign='center'>
                            <Button content='View' color='purple' onClick={() => modalStore.openModal(<ViewSubject id={subject.id!} />)} />
                                <Popup content='Delete specialty' trigger={
                                    <Button
                                        icon='trash'
                                        color='red'
                                        content='Delete'
                                        onClick={() => deleteSubject(subject.id!)}
                                        basic
                                    />
                                } />
                            </Table.Cell>
                        </Table.Row>
                    </>
                ))}
            </Table.Body>
            </Table>
                    </Segment>
                </Grid.Column>
                <Grid.Column width='5'>
                    <Segment textAlign='center'>
                        <Header as='h1' content='New Subject' />
                        <span>Add a new subject</span>
                        <br /><br />
                        <Icon name='plus' size='small' />
                        <br /><br />
                        <Button animated='vertical' color='purple' onClick={() => history.push("/admin/subject")}>
                            <Button.Content visible>New Subject</Button.Content>
                            <Button.Content hidden>
                                <Icon name='plus' />
                            </Button.Content>
                        </Button>
                    </Segment>
                </Grid.Column>
            </Grid>
        </>
    )

})