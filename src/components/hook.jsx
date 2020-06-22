import { useState, useEffect } from "react";
import socket from "../socket";
function changePageno() {
  //const [x, setX] = useState(0);
  useEffect(() => {
    socket.on("turnPage", (msg) => {
      console.log(msg);
      console.log("something happened");
    });
  });
}
export default changePageno;
