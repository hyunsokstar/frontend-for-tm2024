import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import DataGridForUserTodoList from './DataGrid/DataGridForUserTodoList';

type Props = {
    selectedUserId?: any
}


const TabMenuBoxForProfilePage = ({ selectedUserId }: Props) => {
    return (
        <div>
            <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab _selected={{ color: 'blue.500', bg: 'blue.200' }}>ToDos(Uncompleted)</Tab>
                    <Tab _selected={{ color: 'red.500', bg: 'red.200' }}>Todos(Completed)</Tab>
                    <Tab _selected={{ color: 'green.500', bg: 'green.200' }}>Todos(Idea)</Tab>
                    <Tab _selected={{ color: 'purple.500', bg: 'purple.200' }}>Four</Tab>
                    <Tab _selected={{ color: 'orange.500', bg: 'orange.200' }}>Five</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <DataGridForUserTodoList selectedUserId={selectedUserId} pageInfo="uncompletedTodosPageForUser" todoStatusOption={'uncompleted'} />
                    </TabPanel>

                    <TabPanel>
                        <DataGridForUserTodoList selectedUserId={selectedUserId} pageInfo="uncompletedTodosPageForUser" todoStatusOption={'completed'} />
                    </TabPanel>

                    <TabPanel>
                        <DataGridForUserTodoList selectedUserId={selectedUserId} pageInfo="uncompletedTodosPageForUser" todoStatusOption={'idea'} />
                    </TabPanel>

                    <TabPanel>
                        <p>four!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>five!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}

export default TabMenuBoxForProfilePage;
