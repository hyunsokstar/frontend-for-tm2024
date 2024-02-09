// Counter.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { increment, decrement } from '../store/counterSlice';

const Counter: React.FC = () => {
    const dispatch = useDispatch();
    const count = useSelector((state: RootState) => state.counter.value);

    return (
        <div>
            <h2>Counter: {count}</h2>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    );
};

export default Counter;