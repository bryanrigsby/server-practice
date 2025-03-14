import React, { useState, useEffect } from "react";
import './App.css'

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [editMessageId, setEditMessageId] = useState(null);
  const [editText, setEditText] = useState("");

  // trigger on render (only once)
  useEffect(() => {
    getData();
  }, []);

  // get messages from db
  const getData = async () => {
    try {
      let response = await fetch("http://localhost:5001/api/messages");
      console.log("response", response);

      if (!response.ok) {
        alert("error getting data");
        return;
      }

      let jsonResponse = await response.json();
      console.log("jsonResponse", jsonResponse);

      if (!jsonResponse.success) {
        alert("error in JSON response");
        return;
      }

      console.log("jsonResponse.data", jsonResponse.data);

      setMessages(
        jsonResponse.data && jsonResponse.data.length > 0
          ? jsonResponse.data
          : []
      );
    } catch (error) {
      console.log("error in getData", error);
    }
  };

  
  // add new message to db
  const addMessage = async () => {
    if (!newMessage) return;
    const response = await fetch("http://localhost:5001/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newMessage }),
    });
    const newMsg = await response.json();
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  // update message in db
  const updateMessage = async (id) => {
    if (!editText) return;

    const response = await fetch(`http://localhost:5001/api/messages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editText }),
    });

    if (response.ok) {
      const updatedMessage = await response.json();
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, text: updatedMessage.text } : msg
        )
      );
      setEditMessageId(null);
      setEditText("");
    } else {
      console.error("Failed to update message");
    }
  };

  // Delete message from db
  const deleteMessage = async (id) => {
    const response = await fetch(`http://localhost:5001/api/messages/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } else {
      console.error("Failed to delete message");
    }
  };

  // triggers anytime messages changes
  useEffect(() => {
    console.log("messages", messages);
  }, [messages]);

  return (
    <div className="container p-5">
      <div className="row border text-center mb-5 py-5">
        <div className="col-12">
          <h3 className="pb-5">Message Creator</h3>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="btn btn-sm btn-primary mx-2" onClick={addMessage}>Add Message</button>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-12">
          {/* Display messages */}
          <ul>
            {messages.map((msg) => (
              <div className="row py-3">
                <div className="col-12">
                <li key={msg.id}>
                {editMessageId === msg.id ? (
                  <>
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button className="btn btn-sm btn-primary mx-2" onClick={() => updateMessage(msg.id)}>Save</button>
                    <button className="btn btn-sm btn-danger" onClick={() => setEditMessageId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {msg.text}
                    <button
                      className="btn btn-sm btn-primary mx-2"
                      onClick={() => {
                        setEditMessageId(msg.id);
                        setEditText(msg.text);
                      }}
                    >
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteMessage(msg.id)}>
                      Delete
                    </button>
                  </>
                )}
              </li>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
