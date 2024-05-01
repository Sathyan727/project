import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

function TodoList() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: 'Doctor Appointment',
            completed: false
        },
        {
            id: 2,
            text: 'Meeting at School',
            completed: false
        }
    ]);
    const [text, setText] = useState(""); // Define text state

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleCompleted = (id) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            } else {
                return task;
            }
        }));
    };

    const editTask = (id, newText) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, text: newText };
            } else {
                return task;
            }
        }));
    };

    const addTask = () => { // Modify addTask to handle adding a task
        if (text.trim() !== "") { // Make sure text is not empty
            const newTask = {
                id: Date.now(),
                text,
                completed: false
            };
            setTasks([...tasks, newTask]);
            setText(""); // Clear the input after adding task
        }
    };

    return (
        <div className="todo-list">
            {tasks.map(task => (
                <TodoItem
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    toggleCompleted={toggleCompleted}
                    editTask={editTask}
                />
            ))}
            <input
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <button onClick={addTask}>Add</button> {/* Pass addTask directly to onClick */}
        </div>
    );
}

export default TodoList;
