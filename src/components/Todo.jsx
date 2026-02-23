import { useState } from "react";
import './todo.css';

const Todo = () => {

    const [form, setForm] = useState({ text: "", status: "" });

    const [tasks, setTasks] = useState([]);

    const [editIndex, setEditIndex] = useState(null);

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.text === "") {
            setError("Todo name is required.!!");
            return;
        }

        if (editIndex !== null) {
            const updatedTask = tasks.map((t, i) => (i === editIndex ? form : t))

            setTasks(updatedTask);
            setEditIndex(null);

        } else {
            setTasks([...tasks, form]);
            setError("");
            setForm({ text: "", status: "" });
        }

    }

    const handleDelete = (index) => {
        setTasks(tasks.filter((t, i) => i !== index));
    }

    const handleEdit = (index) => {
        setForm(tasks[index]);
        setEditIndex(index)
    }

    if (error) return <h2>{error}</h2>;

    return (
        <div className="todo-container">
            <form onSubmit={handleSubmit} className="todo-form">
                <h2>Task Management</h2>
                <input type="text" name="text"  value={form.text} onChange={handleChange} placeholder="Enter todo name" />
                <input type="text" name="status" value={form.status} onChange={handleChange} placeholder="Enter todo status" />
                <button>Add task</button>
            </form>

            <table>
                <tr>
                    <th>No.</th>
                    <th>Task Name</th>
                    <th>Task Status</th>
                    <th colSpan={2}>Action</th>
                </tr>
                {
                    tasks.map((t, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{t.text}</td>
                            <td>{t.status}</td>
                            <td><button onClick={()=>handleEdit(i)}>Edit</button></td>
                            <td><button onClick={() => handleDelete(i)}>Delete</button></td>
                        </tr>
                    ))
                }
            </table>

        </div>
    )
}

export default Todo;