import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from "./config";
import { Row } from "react-bootstrap";
import TodoList from "./TodoList";
import "./blockchain.css";

export default function Blockchain() {
  const [account, setAccount] = useState("");

  const [todoList, setTodoList] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBlockchainData();
  }, []);

  async function loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const newtodoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    setTodoList(newtodoList);
    const newtaskCount = await newtodoList.methods.taskCount().call();
    setTaskCount(newtaskCount);
    let newTasks = [];
    for (var i = 1; i <= newtaskCount; i++) {
      const task = await newtodoList.methods.tasks(i).call();
      newTasks.push(task);
    }
    setTasks(newTasks);
  }
  function createTask(content) {
    setLoading(true);
    todoList.methods
      .createTask(content)
      .send({ from: account })
      .once("receipt", (receipt) => {
        loadBlockchainData();
        setLoading(false);
      });
  }

  function deleteTask(taskId) {
    setLoading(true);
    todoList.methods
      .deleteTask(taskId)
      .send({ from: account })
      .once("receipt", (receipt) => {
        loadBlockchainData();
        setLoading(false);
      });
  }
  function toggleTask(taskId) {
    setLoading(true);
    todoList.methods
      .toggleCompleted(taskId)
      .send({ from: account })
      .once("receipt", (receipt) => {
        loadBlockchainData();
        setLoading(false);
      });
  }

  return (
    <>
      Your Contracts: {account}
      <Row>
        <div>
          <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <ul className="navbar-nav px-3">
              <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                <small>
                  <a className="nav-link" href="#">
                    <span id="account"></span>
                  </a>
                </small>
              </li>
            </ul>
          </nav>
          <div className="container-fluid">
            <div className="row">
              <main
                role="main"
                className="col-lg-12 d-flex justify-content-center"
              >
                {loading ? (
                  <div id="loader" className="text-center">
                    <p className="text-center">Loading...</p>
                  </div>
                ) : (
                  <TodoList
                    tasks={tasks}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    toggleTask={toggleTask}
                  />
                )}
              </main>
            </div>
          </div>
        </div>
      </Row>
    </>
  );
}
