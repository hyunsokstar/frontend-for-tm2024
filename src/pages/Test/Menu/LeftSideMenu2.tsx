import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';

const App: React.FC = () => {
    return (
        <div style={{ display: 'flex', height: '100%', width: '80%', margin: 'auto', marginTop: '10px' }}>
            <Sidebar>
                <Menu
                    menuItemStyles={{
                        button: ({ level, active, disabled }) => {
                            // only apply styles on first level elements of the tree
                            if (level === 0)
                                return {
                                    color: disabled ? '#9e9e9e' : '#6200EE',
                                    backgroundColor: active ? '#D1C4E9' : undefined,
                                };
                        },
                    }}
                >
                    <SubMenu defaultOpen label="Charts" icon={<span role="img" aria-label="Chart">📊</span>}>
                        <MenuItem> Pie charts</MenuItem>
                        <MenuItem> Line charts</MenuItem>
                        <MenuItem> Bar charts</MenuItem>
                    </SubMenu>
                    <MenuItem active icon={<span role="img" aria-label="Calendar">📅</span>}>
                        Calendar (active)
                    </MenuItem>
                    <MenuItem disabled icon={<span role="img" aria-label="Cart">🛒</span>}>
                        E-commerce (disabled)
                    </MenuItem>
                    <MenuItem icon={<span role="img" aria-label="List">📋</span>}> Examples</MenuItem>
                </Menu>
            </Sidebar>
        </div>
    );
};

export default App;
