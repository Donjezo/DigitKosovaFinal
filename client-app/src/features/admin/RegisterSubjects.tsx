import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import * as Yup from 'yup';
import {Button, Header, Label, Segment } from 'semantic-ui-react';
import MyTextInput from '../../app/common/MyTextInput';
import { useStore } from '../../app/stores/store';
import MyTextArea from '../../app/common/MyTextArea';
import { history } from "../..";
import NavBar from '../../app/layout/NavBar';

export default observer(function RegisterSubjects (){
    const { userStore:{registerSubject} } = useStore();

    return(
        <>
        <Segment>
            <NavBar></NavBar>
        </Segment>
        <Header as='h3' content='Register new subjects' />
        <Formik
            initialValues={{name: '', description: '' , literature: '', topics: '', news:''}}
            onSubmit={values => registerSubject(values).catch(error => console.log(error)
            )}
            validationSchema={Yup.object({
                name: Yup.string().required(),
                description: Yup.string().required()
            })}
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
                        <Button basic color='red' content='Cancel' onClick={() => history.push("/admin/viewSubjects")} />
                    </Form>
                )}
        </Formik>
        </>
    )

})