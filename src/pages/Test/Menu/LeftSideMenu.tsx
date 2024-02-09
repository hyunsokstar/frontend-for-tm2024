import React, { useState } from "react";
import Dropdown, { Option } from "react-dropdown";
import 'react-dropdown/style.css';

type MenuItem = {
    label: string;
    options: string[];
};

const App: React.FC = () => {
    const [selectedItems, setSelectedItems] = useState<Record<string, string>>({});

    const menuItems: MenuItem[] = [
        {
            label: 'tutorial',
            options: ['youtube', 'note'],
        },
        {
            label: 'install',
            options: ['npm', 'yarn'],
        },
    ];

    const handleSelect = (option: Option, label: string) => {
        if (option.value) {
            setSelectedItems({
                ...selectedItems,
                [label]: option.value.toString(),
            });
        }
    };

    const renderDropdowns = () => {
        return menuItems.map(item => (
            <div key={item.label} style={{ marginBottom: '70px' }}> {/* 여기서 여유 공간 조정 */}
                <h3>{item.label}</h3>
                <Dropdown
                    options={item.options.map(option => ({ value: option, label: option }))}
                    value={selectedItems[item.label] || ''}
                    onChange={(option) => handleSelect(option, item.label)}
                    placeholder="선택"
                />
            </div>
        ));
    };

    return (
        <div style={{ width: '200px', margin: '20px' }}>
            {renderDropdowns()}
        </div>
    );
};

export default App;
