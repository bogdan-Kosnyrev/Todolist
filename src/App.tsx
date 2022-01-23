import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

  let [tasks, setTasks] = useState([
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: false},
    {id: v1(), title: 'rest API', isDone: false},
    {id: v1(), title: 'graphQL', isDone: false}
  ])

  function removeTask(id: string) {
    let filteredTasks = tasks.filter(t => t.id != id)
    setTasks(filteredTasks)
  }

  function addTask(title: string) {
    let task = {id: v1(), title: title, isDone: false}
    let newTasks = [task, ...tasks]
    setTasks(newTasks)
  }

  let [filter, setFilter] = useState<FilterValuesType>('all')
  let tasksForTodolist = tasks
  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => t.isDone === false)
  }
  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.isDone === true)
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value)
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasks([...tasks])
    }
  }

  return (
    <div className="App">
      <Todolist
        title='What to learn'
        tasks={tasksForTodolist}
        removeTask={removeTask}
        addTask={addTask}
        changeFilter={changeFilter}
        changeTaskStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
