import { useState } from "react";
import "./App.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddClick = () => {
    if (inputValue.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      };

      setTodos([...todos, newTodo]);

      setInputValue("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="app">
      <h1>ToDo App</h1>
      
      <div className="input-section">
        <input 
          type="text" 
          placeholder="新しいタスクを入力..." 
          className="todo-input"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={handleAddClick}>
          追加
        </button>
      </div>

      <div className="todos-list">
        {todos.length === 0 ? (
          <p className="no-todos">タスクがありません。新しくタスクを追加してください！</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span className="todo-text">{todo.text}</span>
              <button 
                className="delete-button"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                削除
              </button>
            </div>
          ))
        )}
      </div>
      
      {/* デバッグ用：現在の入力値とタスク数を表示 */}
      <div style={{ marginTop: "20px", color: "#666" }}>
        <p>現在の入力値: "{inputValue}"</p>
        <p>タスク数: {todos.length}</p>
        <p>完了済み: {todos.filter(todo => todo.completed).length}</p>
      </div>
    </div>
  );
}

export default App;