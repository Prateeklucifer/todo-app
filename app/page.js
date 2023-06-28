"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

export default function Home() {
  const [todo, setTodo] = useState([]);
  const [update, setUpdate] = useState(Math.random());

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("todo"));
    setTodo(data);
  }, [update]);

  const [data, setData] = useState("");

  let todos = [];

  async function addTodo() {
    todos.push(data);

    if (localStorage.getItem("todo") === null) {
      localStorage.setItem("todo", JSON.stringify(todos));
      setUpdate(Math.random());
      setData("");
    } else {
      let new_todo = JSON.parse(localStorage.getItem("todo"));

      new_todo.push(data);

      localStorage.setItem("todo", JSON.stringify(new_todo));
      setUpdate(Math.random());
      setData("");
    }
  }

  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState(false);
  const [compleated, setCompleated] = useState(false);
  if (edit) {
    return (
      <div class="flex h-[100vh] w-full items-center justify-center py-10 relative">
        <div class="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white z-10">
          <div class="w-full">
            <div class="m-8 my-20 max-w-[400px] mx-auto px-2">
              <div class="mb-8">
                <h1 class="mb-4 text-xl md:text-2xl font-extrabold text-[#475569]">
                  Change todo
                </h1>
                <input
                  type="search"
                  class="text-slate-700 rounded-md md:rounded-full p-3 w-full font-semibold outline-[#818cf8] border-2"
                  value={data}
                  onChange={(e) => {
                    setData(e.target.value);
                  }}
                />
              </div>
              <div class="space-y-4">
                <button
                  onClick={() => {
                    let updated_todo = todo
                    updated_todo[index] = data

                    localStorage.setItem("todo", JSON.stringify(updated_todo))

                    setEdit(!edit);
                    setData('')
                  }}
                  class="p-3 bg-[#6366f1] hover:bg-[#818cf8] rounded-md md:rounded-full text-white w-full font-semibold"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            setEdit(!edit);
          }}
          className="absolute inset-0 bg-black/20"
        ></div>
      </div>
    );
  } else {
    return (
      <>
        <div className="header">
          <div className="heading">
            <h1 className="pointer text-4xl">Todo List</h1>
          </div>
          <div className="search-content ">
            <input
              className="searchBar"
              type="search"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Add New Task..."
            />
            <i
              className="fa-solid fa-2x fa-plus btn-add pointer"
              onClick={addTodo}
            ></i>
          </div>
        </div>
        {todo.length ? (
          <div className="todo-list">
            {todo.map((todos, index) => (
              <div key={index} className="w-full">
                <div className="todo">
                <div className={`text pointer ${todos.completed ? "udl" : ""}`}>{todos}</div>
                  <div className="logo">
                    <i onClick={()=>{
                      setCompleated(!compleated)
                    }} className="fa-solid fa-check btn-green rounded pointer"></i>
                    <i
                      onClick={() => {
                        let new_todo = todo;

                        new_todo.splice(new_todo.indexOf(todos), 1);

                        localStorage.setItem("todo", JSON.stringify(new_todo));
                        setUpdate(Math.random());
                      }}
                      className="fa-solid fa-trash btn-red rounded pointer"
                    ></i>
                    <i
                      onClick={() => {
                        setIndex(todo.indexOf(todos));
                        setEdit(!edit);
                        setData('')
                      }}
                      className="fa-solid fa-pencil btn-blue rounded pointer"
                    ></i>
                  </div>
                </div>
                <hr className="horizontal-line m-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="text-lg md:text-xl lg:text-2xl text-slate-400 mt-12">
              No todos
            </div>
          </div>
        )}

        <Script
          src="https://kit.fontawesome.com/e9e378fafe.js"
          crossorigin="anonymous"
        ></Script>
      </>
    );
  }
}