import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Grid, Header, Image, Segment } from 'semantic-ui-react';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import logo from '../Images/ikone.jpg';

export default observer(function HomePage() {
    const { userStore } = useStore();
    const { user } = userStore;
    const [register, setRegister] = useState(false);

    return (
        <>
             
           <div className='homeePage'>
            <Segment textAlign='center' vertical>
                <Container text style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {userStore.isLoggedIn ? (
                        <Segment style={{ backgroundColor: 'white' }}>
                            <h2>you are logged in {user?.firstname}</h2>
                            <Button as={Link} to={`/${user?.role.toLowerCase()}`} size='huge' primary >
                                Continue!
                            </Button>
                        </Segment>
                    ) : (
                        !register &&
                        <> 
                            <Segment>
                                <Grid >
                                    <Grid.Column width='8' style={{ padding: 0 }} id='001'>
                                        <Image src='/assets/loginpic.jpg' style={{height: "530px"}} />
                                         
                                        
                                    </Grid.Column>
                                    <Grid.Column width='7' style={{ padding: '0 60px' }}>
                                        <div style={{ margin: '50px 0' }}>
                                            <Header content='Sign in' as='h2' />
                                            <Header
                                                content='Sign in to continue to your account'
                                                as='h4'
                                                style={{ padding: 0, margin: 0 }}
                                                color='grey'
                                            />
                                        </div>
                                        <LoginForm />
                                        <Divider style={{ margin: '40px 0' }} />
                                        Don't have an account?
                                        <br />
                                        <Button content='Sign up' basic onClick={() => setRegister(true)} />
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                         </>)
                    }
                </Container>
            </Segment>
            </div>
        </>
    )
})