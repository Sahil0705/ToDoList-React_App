import React, { useState, useEffect } from "react";
import todo from "../images/todo.png"
import todolight from "../images/todolight.png"

// get the localStorage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  let [theme, setTheme] = useState("dark");

  // add the items fucnction
  const addItem = () => 
  {

    if (!inputdata) 
    {
      alert("plz fill the data");
    } 
    else if (inputdata && toggleButton) 
    {
      document.getElementById("cap").innerHTML = 'Add Your List...✌';
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) 
          {
              curElem.name = inputdata
          }
          return curElem;
        })
      );
      setInputData("");
      setIsEditItem("");
      setToggleButton(false);
    } 
    else if (inputdata && !toggleButton) 
    {
      const myNewInputData = 
      {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  function changeTheme()
  {
    // alert(theme);
    if(theme=='dark')
    {
        document.body.style.backgroundColor='#F0FFFF';
        document.getElementById('IdOfInput').style.backgroundColor='rgb(85, 41, 220)';
        document.getElementById('IdOfInput').focus();
        document.getElementById('IdOfInput').classList.add('your-class');
        document.getElementById('cap').style.color='black';
        document.getElementById('faw').classList.replace("fa-sun","fa-moon");
        document.getElementById('faw').title='Dark Theme..?';
        document.getElementById('themebtn').style.color='black';
        document.getElementById('i').src=todolight;
        setTheme('light');
    }
    else if(theme='light')
    {
        document.body.style.backgroundColor='#060822';
        document.getElementById('IdOfInput').style.backgroundColor='white';
        document.getElementById('IdOfInput').focus();
        document.getElementById('IdOfInput').classList.remove('your-class');
        document.getElementById('cap').style.color='white';
        document.getElementById('faw').classList.replace("fa-moon","fa-sun");
        document.getElementById('faw').title='Light Theme..?'
        document.getElementById('themebtn').style.color='white';
        document.getElementById('i').src=todo;
        setTheme('dark');
    }
  }

  //edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    document.getElementById("IdOfInput").focus();
    document.getElementById("cap").innerHTML = 'Update Your List...✌';
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  // how to delete items section
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  // remove all the elements
  const removeAll = () => {
    setItems([]);
  };

  // adding localStorage
  useEffect(() => {
    document.getElementById("IdOfInput").focus();
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
        <button onClick={changeTheme} id='themebtn'><i className="far fa-sun" title='Light Theme..?' id="faw"></i></button>
          <figure style={{display:"inline"}}>
          <img src={todo} alt='todo' id='i'/>
          <div className="theme" style={{display:"inline", height:"300", width:"300"}}>
          
          </div>
            <figcaption ><b id='cap'>Add Your List...✌</b>
            </figcaption>
            
          </figure>
          
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add an Item..."
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
              id='IdOfInput'
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          {/* show our items  */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)} title='Edit Item'></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)} title='Delete Item'></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* remove all button  */}
          <div>
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              style={{fontFamily:'Convergence'}}
              onClick={removeAll}>
              <span style={{fontFamily:'Convergence'}}> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;