import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Divider, Grid, Header, Label, Segment, Table } from 'semantic-ui-react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useStore } from '../../app/stores/store';
import MyTextInput from '../../app/common/MyTextInput';
import MyTextArea from '../../app/common/MyTextArea';

interface Props {
    id: string;
}

export default observer(function ViewSubject({ id }: Props) {
    const { userStore, modalStore } = useStore();
    const { loadSubject, selectedSubject, editSubject } = userStore;

    const [editMode, setEditMode] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string().required('Specialty name is required'),
        description: Yup.string().required('Please provide a description of the specialty')
    })

    useEffect(() => {
        if (id) loadSubject(id);
    }, [id, loadSubject]);

    return (
        <> 
        
            <Header content='Specialty details' />
            <Divider />
            {editMode ?
                <>
                
                    <Formik
                        initialValues={selectedSubject!}
                        onSubmit={values => editSubject(values).catch(error => console.log(error))
                            .then(modalStore.closeModal)}
                        validationSchema={validationSchema}
                        enableReinitialize
                    >
                        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <Label content='Subject name' /><br />
                            <MyTextInput name='name' placeholder='Subject Name' />
                            <Label content='Description' /><br />
                            <MyTextArea rows={4} name='description' placeholder='Description' />
                            <Label content='Literature' /><br />
                            <MyTextArea rows={4} name='literature' placeholder='Literature' />
                            <Label content='topics' /><br />
                            <MyTextArea rows={6} name='topics' placeholder='topics' />
                            <Label content='news' /><br />
                            <MyTextArea rows={5} name='news' placeholder='news' />
                            <Button disabled={isSubmitting || !dirty || !isValid}
                                loading={isSubmitting} positive type='submit' content='Submit' 
                            />
                            <Button basic color='red' content='Cancel' onClick={() => setEditMode(false)} />
                        </Form>
                        )}
                    </Formik>
                </> :
                <>
                    <Grid>
                        <Grid.Column width='14'>
                            <Table basic='very' collapsing >
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Label basic content='Specialty' />
                                        </Table.Cell>
                                        <Table.Cell>{selectedSubject?.name}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Label basic content='Description' />
                                        </Table.Cell>
                                        <Table.Cell>{selectedSubject?.description}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            <Button color='red' icon='edit' basic onClick={() => setEditMode(true)} />
                        </Grid.Column>
                    </Grid>
                    {!editMode &&
                        <>
                            <Divider />
                            <Button onClick={modalStore.closeModal} content='Close' />
                        </>
                    }
                </>
            }
        </>
    )
})