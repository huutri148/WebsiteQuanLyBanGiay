import React, { useEffect, useState } from "react";
import "../../components/App/App.css";
import "../../styles/dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import * as TODO from "../../redux/actions/todoAction";
export default function DashboardTodoList(props) {
  const dispatch = useDispatch();
  const [todoList, setTodoList] = useState([]);
  const [openNewTodo, setOpenNewTodo] = useState(false);
  const [openEditTodo, setOpenEditTodo] = useState("");
  const [newTodoText, setNewTodoText] = useState("");
  const [editTodoText, setEditTodoText] = useState("");
  const { listTodo } = useSelector((state) => state.ListTodo);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(TODO.fetchListTodo());
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (typeof listTodo !== "undefined") {
      const data = Object.values(listTodo).reduce((result, value) => {
        result.push({
          ...value,
        });
        return result;
      }, []);

      setTodoList(data);
    }
  }, [listTodo]);

  const clickToCheck = (event) => {
    const target = JSON.parse(event.target.id);
    const id = target.id;
    var isDone = "";
    if (target.isDone === 1) {
      isDone = false;
    } else {
      isDone = true;
    }
    const virtualTodo = [...todoList];
    for (let i in virtualTodo) {
      if (id === virtualTodo[i].MaTODO) {
        virtualTodo[i].isDone = isDone;
      }
    }
    setTodoList(virtualTodo);

    const data = {
      ...listTodo[id],
      isDone: isDone,
    };
    dispatch(TODO.updateTodo(id, data));
    dispatch(TODO.fetchListTodo());
  };

  const addNewTodo = (event) => {
    event.preventDefault();
    const virtualTodo = [...todoList];
    const data = {
      NoiDung: newTodoText,
      isDone: false,
      NgayLap: new Date(),
    };
    virtualTodo.push(data);
    dispatch(TODO.createTodo(data));
    setOpenNewTodo(false);
    dispatch(TODO.fetchListTodo());
  };

  const deleteTodo = (event) => {
    const id = event.target.id;
    dispatch(TODO.deleteTodo(id));
    dispatch(TODO.fetchListTodo());
  };

  const eidtTodoOnSubmit = (event) => {
    const id = event.target.id;
    event.preventDefault();

    const virtualTodo = [...todoList];
    for (let i in virtualTodo) {
      if (id === virtualTodo[i]._id) {
        virtualTodo[i].todoContent = editTodoText;
      }
    }
    setTodoList(virtualTodo);
    const data = {
      ...listTodo[id],
      NoiDung: editTodoText,
    };
    dispatch(TODO.updateTodo(id, data));
    dispatch(TODO.fetchListTodo());
    setOpenEditTodo("");
  };

  return (
    <div className="topfive topfive-rv flex-col" style={{ width: "40%" }}>
      <div className={`headerbox flex-center ${props.color}`}>
        <FontAwesomeIcon icon={props.icon} className="icon" />
      </div>
      <div className="top-location-container">
        <div className="headerbox-header">
          <p>{props.title}</p>
        </div>
        <div className="topfive-content">
          <div
            className="todo-list"
            style={{ height: "390px", overflowY: "scroll" }}
          >
            <div
              className="flex"
              style={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <p
                className="todo-title"
                style={{ margin: "0", marginLeft: "10px" }}
              >
                Sắp hoàn thành
              </p>
              <div
                style={{ marginRight: "5px", cursor: "pointer" }}
                onClick={() => {
                  if (openNewTodo) {
                    setOpenNewTodo(false);
                  } else {
                    setOpenNewTodo(true);
                  }
                  setNewTodoText("");
                }}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ color: "#aaa", fontSize: "14px" }}
                />
              </div>
            </div>
            <form
              onSubmit={addNewTodo}
              className={
                openNewTodo
                  ? "newtodo-input flex"
                  : "newtodo-input closeNewTodo"
              }
            >
              <input
                value={newTodoText}
                type="text"
                onChange={(event) => {
                  setNewTodoText(event.target.value);
                }}
              ></input>
              <button className="newtodo-btn btn">Thêm</button>
            </form>
            {todoList &&
              todoList.reverse().map((item, index) => {
                if (item.isDone === 0) {
                  return (
                    <div key={index} className="topfive-div">
                      <div
                        className="topfive-div flex"
                        style={{ border: "none", padding: "0" }}
                      >
                        {item.isDone === 0 && (
                          <div
                            className="todo-check"
                            id={JSON.stringify({
                              id: item.MaTODO,
                              isDone: item.isDone,
                            })}
                            onClick={clickToCheck}
                          ></div>
                        )}
                        {item.isDone === 1 && (
                          <div
                            className="todo-check-done"
                            id={JSON.stringify({
                              id: item.MaTODO,
                              isDone: item.isDone,
                            })}
                            onClick={clickToCheck}
                          >
                            <FontAwesomeIcon
                              icon={faCheck}
                              style={{
                                pointerEvents: "none",
                                color: "#23bfea",
                              }}
                            />
                          </div>
                        )}
                        <p className="todo-text">{item.NoiDung}</p>
                        <div className="todo-action flex">
                          <div
                            id={item.MaTODO}
                            onClick={() => {
                              if (openEditTodo === "") {
                                setOpenEditTodo(item.MaTODO);
                              } else {
                                setOpenEditTodo("");
                              }
                              setEditTodoText(item.NoiDung);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="icon blue"
                              style={{ pointerEvents: "none" }}
                            />
                          </div>
                          <div id={item.MaTODO} onClick={deleteTodo}>
                            <FontAwesomeIcon
                              icon={faTimes}
                              className="icon red"
                              style={{
                                marginTop: "5px",
                                fontSize: "12px",
                                color: "#ffb3b7",
                                marginLeft: "7px",
                                pointerEvents: "none",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <form
                        id={item.MaTODO}
                        onSubmit={eidtTodoOnSubmit}
                        style={{ marginTop: "10px", marginBottom: "0" }}
                        className={
                          openEditTodo === item.MaTODO
                            ? "newtodo-input flex"
                            : "newtodo-input closeNewTodo"
                        }
                      >
                        <input
                          style={{ margin: "0", marginRight: "10px" }}
                          value={editTodoText}
                          type="text"
                          onChange={(event) => {
                            setEditTodoText(event.target.value);
                          }}
                        ></input>
                        <button className="newtodo-btn btn">Edit</button>
                      </form>
                    </div>
                  );
                }
                return null;
              })}
            <p className="todo-title" style={{ marginTop: "20px" }}>
              Đã hoàn thành
            </p>
            {todoList &&
              todoList.reverse().map((item, index) => {
                if (item.isDone === 1) {
                  return (
                    <div key={index} className="topfive-div">
                      <div
                        className="topfive-div flex"
                        style={{ border: "none", padding: "0" }}
                      >
                        {item.isDone === 0 && (
                          <div
                            className="todo-check"
                            id={JSON.stringify({
                              id: item.MaTODO,
                              isDone: item.isDone,
                            })}
                            onClick={clickToCheck}
                          ></div>
                        )}
                        {item.isDone === 1 && (
                          <div
                            className="todo-check-done"
                            id={JSON.stringify({
                              id: item.MaTODO,
                              isDone: item.isDone,
                            })}
                            onClick={clickToCheck}
                          >
                            <FontAwesomeIcon
                              icon={faCheck}
                              style={{
                                pointerEvents: "none",
                                color: "#23bfea",
                              }}
                            />
                          </div>
                        )}
                        <p className="todo-text">{item.NoiDung}</p>
                        <div className="todo-action flex">
                          <div
                            id={item.MaTODO}
                            onClick={() => {
                              if (openEditTodo === "") {
                                setOpenEditTodo(item.MaTODO);
                              } else {
                                setOpenEditTodo("");
                              }
                              setEditTodoText(item.NoiDung);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="icon blue"
                              style={{ pointerEvents: "none" }}
                            />
                          </div>
                          <div id={item.MaTODO} onClick={deleteTodo}>
                            <FontAwesomeIcon
                              icon={faTimes}
                              className="icon red"
                              style={{
                                marginTop: "5px",
                                fontSize: "12px",
                                color: "#ffb3b7",
                                marginLeft: "7px",
                                pointerEvents: "none",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <form
                        id={item.MaTODO}
                        onSubmit={eidtTodoOnSubmit}
                        style={{ marginTop: "10px", marginBottom: "0" }}
                        className={
                          openEditTodo === item.MaTODO
                            ? "newtodo-input flex"
                            : "newtodo-input closeNewTodo"
                        }
                      >
                        <input
                          style={{ margin: "0", marginRight: "10px" }}
                          value={editTodoText}
                          type="text"
                          onChange={(event) => {
                            setEditTodoText(event.target.value);
                          }}
                        ></input>
                        <button className="newtodo-btn btn">Edit</button>
                      </form>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
