import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TodoItem({ task, deleteTask, toggleCompleted, editTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);

    const handleCheckboxChange = () => {
        toggleCompleted(task.id);
    };

    const handleEditButtonClick = () => {
        setIsEditing(true);
    };

    const handleEditInputChange = (e) => {
        setEditedText(e.target.value);
    };

    const handleEditFormSubmit = (e) => {
        e.preventDefault();
        editTask(task.id, editedText);
        setIsEditing(false); // Set editing mode to false after saving changes
    };

    console.log('isEditing:', isEditing); // Add this line for debugging

    return (
        <div className="todo-item">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={handleCheckboxChange}
            />
            {isEditing ? (
                <form onSubmit={handleEditFormSubmit}>
                    <input
                        type="text"
                        value={editedText}
                        onChange={handleEditInputChange}
                        autoFocus
                    />
                    <button type="submit">Save</button>
                </form>
            ) : (
                <>
                    <p style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.text}
                    </p>
                    {!isEditing && (
                        <button onClick={handleEditButtonClick}>Edit</button>
                    )}
                </>
            )}
            <button onClick={() => deleteTask(task.id)}>DELETE</button>
        </div>
    );
}

TodoItem.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }),
    deleteTask: PropTypes.func.isRequired,
    toggleCompleted: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired
};

export default TodoItem;
