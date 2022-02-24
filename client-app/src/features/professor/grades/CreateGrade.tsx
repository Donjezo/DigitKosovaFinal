import { ErrorMessage, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Divider, Form, Header, Message, Modal, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import MyTextArea from '../../../app/common/MyTextArea';
import MyTextInput from '../../../app/common/MyTextInput';
import { useStore } from '../../../app/stores/store';

interface Props {
    id: string
}

export default observer(function CreateGrade({ id }: Props) {

    const { gradesStore, modalStore } = useStore();

    const selectedGrade = {
        grade: '',
        subject: '',
        description: '',
        studentId: id,
        error: null
    }

    const validationSchema = Yup.object({
        grade: Yup.string().required('Grade is required'),
        subject: Yup.string().required('Subject is required'),
        description: Yup.string().required('Valid description are required'),
    })

    return (
        <>
            <Header as='h2' content='Add a new Grade' />
            <Divider />
            <Formik
                initialValues={selectedGrade}
                onSubmit={(values, { setErrors }) => gradesStore.createGrade(values).catch(error =>
                    setErrors({ error }))}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {({ handleSubmit, isValid, isSubmitting, dirty, errors }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <ErrorMessage
                            name='error' render={() =>
                                <Message negative content={errors.error} />}
                        />
                        <Segment clearing>
                            <Modal.Content>
                                <Header sub content='Subject information' />
                                <MyTextInput name='subject' placeholder='Subject' />
                                <MyTextArea rows={4} name='description' placeholder='Description' />
                                <Divider />

                                <Header sub content='Grade' />
                                <MyTextInput name='grade' placeholder='Grade' />
                            </Modal.Content>
                        </Segment>
                        <Button.Group>
                         <Button disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} positive type='submit' content='Submit'
                        /> 
                        <Button.Or/>
                            <Button basic color='red' content='Cancel' onClick={modalStore.closeModal} />
                        </Button.Group>
                        
                      
                    </Form>
                )}
            </Formik>
        </>
    )
})