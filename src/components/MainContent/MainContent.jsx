import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../UserCard/UserCard";

import {
  MdOutlineRadioButtonUnchecked,
  MdOutlineRadioButtonChecked,
} from "react-icons/md";
import ReportPopup from "../ReportPopup/ReportPopup";
import "./MainContent.css";

const MainContent = () => {
  const [click, setClick] = useState(false);
  const [global, setGlobal] = useState([]);
  const [users, setUsers] = useState([]);
  const [create, setCreate] = useState(false);
  const [open, setOpen] = useState(false);
  const pageLoad = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `https://todobackend-540h.onrender.com/api/v1/users/getAllUser`,
        config
      );
      setUsers(data.data.users);
      // console.log(data.data.users);
    } catch (error) {
      alert(error);
    }
  };
  const handleSend = async () => {
    if (global.length < 1) {
      alert("Please select some User");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await axios.post(
        `https://todobackend-540h.onrender.com/api/v1/users/getData`,
        { data: JSON.stringify(global) },
        config
      );
      // console.log(data);
      alert("data sent");
    } catch (error) {}
  };
  useEffect(() => {
    pageLoad();
  }, [click]);
  return (
    <div>
      <button
        onClick={() => {
          setOpen(!open);
        }}
      >
        Create New
      </button>
      {open ? (
        <ReportPopup
          setOpen={setOpen}
          open={open}
          click={click}
          setClick={setClick}
        />
      ) : (
        ""
      )}
      <table>
        {users.length > 0
          ? users.map((user, i) => (
              <div className="total">
                <div className="ind">
                  <h3>{i + 1}</h3>
                </div>
                <div className="card" key={user._id}>
                  <UserCard
                    user={user}
                    setClick={setClick}
                    click={click}
                    global={global}
                    setGlobal={setGlobal}
                  />
                </div>
              </div>
            ))
          : "No User Found"}
        {/* <tr>
          <td>Anom</td>
          <td>19</td>
          <td>Male</td>
        </tr> */}
      </table>
      <button onClick={handleSend} className="btn">
        Send Users
      </button>
    </div>
  );
};

export default MainContent;
