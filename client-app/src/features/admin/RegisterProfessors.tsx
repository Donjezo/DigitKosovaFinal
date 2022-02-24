import { ErrorMessage, Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider, Grid, Header, Input, Label, Message } from 'semantic-ui-react';
import * as Yup from 'yup';
import MyDateInput from '../../app/common/DateInput';
import MySelectInput from '../../app/common/MySelectInput';
import MyTextInput from '../../app/common/MyTextInput';
import { useStore } from '../../app/stores/store';
import { history } from "../..";


export default observer(function RegisterProfessors() {
    const{userStore}  = useStore(); 
    const {registerProfessor} = userStore; 

    let subjectsProf = new Array();
    const insertSubjects =async () => {
        await userStore.loadSubjects;
        for (let i = 0; i < userStore.subjects.length; i++) {
            let subject = {
                key: userStore.subjects[i].id,
                value: userStore.subjects[i].id,
                text: userStore.subjects[i].name
            };
            subjectsProf[i] = subject;
        }
    }

    const registerProfessorDto: any ={
        firstname: '',
        lastname: '',
        userName: '',
        email: '',
        role: '',
        passwordHash: '',
        subjectId: '',
        personalNumber: '',
        dateOfBirth: new Date,
        gender: '',
        phoneNumber: '',
        address: '',
        maritalStatus: '',
        error: null
    }

    const validationSchema = Yup.object({
        firstname: Yup.string().required('First name is required'),
        lastname: Yup.string().required('Last name is required'),
        email: Yup.string().email().required('A valid email is required'),
        userName: Yup.string().required('Username is required'),
        passwordHash: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
        subjectId: Yup.string().required('Specialty is required'),
        personalNumber: Yup.string().required('Personal number is required'),
        gender: Yup.string().required('Please choose gender'),
        address: Yup.string().required('Address is required'),
        phoneNumber: Yup.string().required('Enter a phone number').min(9).max(12),
        maritalStatus: Yup.string().required('Marital status is required')
    })

    useEffect(() =>{
        insertSubjects();
    }, [subjectsProf])

    const maritalStatus = [
        { key: 'Single', value: 'Single', text: 'Single' },
        { key: 'Married', value: 'Married', text: 'Married' },
        { key: 'Widowed', value: 'Widowed', text: 'Widowed' },
        { key: 'Divorced', value: 'Divorced', text: 'Divorced' },
    ]

    return(
        <>
         <Header as='h1' content='Register new professor' />
        <Divider />
        <Formik
                initialValues={registerProfessorDto}
                onSubmit={(values, { setErrors }) => registerProfessor(values).catch(error =>
                    setErrors({ error }))}
                enableReinitialize
                validationSchema={validationSchema}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty, errors }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <ErrorMessage
                            name='error' render={() =>
                                <Message negative content={errors.error} />}
                        />
                        <Grid>
                            <Grid.Column width='8'>
                                <Label content='First Name' color='purple' basic />
                                <MyTextInput name='firstname' placeholder='First name' />
                                <Label content='Last Name' color='purple' basic />
                                <MyTextInput name='lastname' placeholder='Last name' />
                                <Label content='Username' color='purple' basic />
                                <MyTextInput name='userName' placeholder='Username' />
                                <Label content='Email' color='purple' basic />
                                <MyTextInput name='email' placeholder='Email' />
                                <Label content='Role' color='purple' basic />
                                <MyTextInput name='role' placeholder='Role' />
                                <Label content='Password' color='purple' basic />
                                <MyTextInput name='passwordHash' placeholder='Password' type='password' />
                                <Label content='Professor subject' color='purple' basic />
                                <MySelectInput name='subjectId' placeholder='Subject' options={subjectsProf} />
                            </Grid.Column>
                            <Grid.Column width='8'>
                                <Label content='Personal number' color='purple' basic />
                                <MyTextInput name='personalNumber' placeholder='Personal number' />
                                <Label content='Date of birth' icon='calendar' color='purple' basic /><br />
                                <MyDateInput
                                    placeholderText='Date'
                                    name='dateOfBirth'
                                    showTimeSelect={false}
                                    dateFormat='d MMMM, yyyy'
                                    showYearDropdown
                                />
                                <br /><br />
                                <Label content='Gender' color='purple' basic /><br />
                                <label>
                                    <Field type="radio" name="gender" value="Male" />
                                    Male
                                </label>
                                <label style={{ marginLeft: '10px' }}>
                                    <Field type="radio" name="gender" value="Female" />
                                    Female
                                </label>
                                <label style={{ marginLeft: '10px' }}>
                                    <Field type="radio" name="gender" value="Other" />
                                    Other
                                </label>
                                <br /><br />
                                <Label content='Address' color='purple' basic />
                                <MyTextInput name='address' placeholder='Address' />
                                <Label content='Phone number' color='purple' basic />
                                <MyTextInput name='phoneNumber' placeholder='Phone number' />
                                <Label content='Marital status' color='purple' basic />
                                <MySelectInput options={maritalStatus} placeholder='Marital status' name='maritalStatus' />
                            </Grid.Column>
                        </Grid>
                        <Button disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} positive type='submit' content='Submit'
                        />
                        <Button basic color='red' content='Cancel' onClick={() => history.push("/admin/choose-account")} />
                    </Form>
                )}
            </Formik>
        </>
       
    )

})