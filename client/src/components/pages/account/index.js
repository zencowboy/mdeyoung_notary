import React, { useEffect, useState } from "react";
import { withCookies } from "react-cookie";

function Account({ cookies }) {
  const [state, setState] = useState("");
  useEffect(() => {
    let token = cookies.get("token");
    fetch(`http://localhost:4000/contract?token=${token}`)
      .then((res) => res.json())
      .then((data) => setState(data));
  }, []);
  return <div>{state}</div>;
}

export default withCookies(Account);
