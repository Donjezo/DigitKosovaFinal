import { observer } from 'mobx-react-lite';
import React, { useState, useEffect} from 'react';
import axios from "axios";
import { Button, Header, Segment, Table } from 'semantic-ui-react';
import { AccountDto } from '../../app/models/user';
import Breadcrumbs from '../../app/layout/Breadcrumbs';
import { useStore } from '../../app/stores/store';
import NavBar from '../../app/layout/NavBar';
export default observer(function AccountManagement() {
    const { userStore, modalStore } = useStore();
    const { accounts, accountRegistry, loadAccounts, deleteAccount } = userStore;
    
    useEffect(() => {
      if (accountRegistry.size <= 1) loadAccounts();
  }, [accountRegistry.size, loadAccounts])
    
    return (

        <>
        <Segment><NavBar></NavBar></Segment>
        <Segment.Group>
                <Segment>
                    <Breadcrumbs />
                </Segment>
                <Segment style={{backgroundColor:"#9C528B"}}>
                    <Header as='h3' content='Accounts'  />
                </Segment>
            </Segment.Group>
        <Table textAlign="center" celled style={{backgroundColor:"#DDDFE1"}}> 
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell style={{backgroundColor:"#9C528B"}}>Username</Table.HeaderCell>
                    <Table.HeaderCell style={{backgroundColor:"#9C528B"}}>First Name</Table.HeaderCell>
                    <Table.HeaderCell style={{backgroundColor:"#9C528B"}}>Last Name</Table.HeaderCell>
                    <Table.HeaderCell style={{backgroundColor:"#9C528B"}}>Email</Table.HeaderCell>
                    <Table.HeaderCell style={{backgroundColor:"#9C528B"}}>Role</Table.HeaderCell>
                    <Table.HeaderCell style={{backgroundColor:"#9C528B"}}>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {accounts.map(account =>{
                    return(
                            <Table.Row key={account.id}>
                            <Table.Cell>{account.userName}</Table.Cell>
                            <Table.Cell>{account.firstname}</Table.Cell>
                            <Table.Cell>{account.lastname}</Table.Cell>
                            <Table.Cell>{account.email}</Table.Cell>
                            <Table.Cell>{account.role}</Table.Cell>
                            <Table.Cell>
                              <Button icon='trash' color='red' content='Delete' onClick={() => deleteAccount(account.id)}/>  
                              {/* <Button content='View' icon='edit' basic color='youtube'/>   */}
                            </Table.Cell>
                            
                      </Table.Row>)
                })}

                </Table.Body>
                </Table>
    </>
    )
})