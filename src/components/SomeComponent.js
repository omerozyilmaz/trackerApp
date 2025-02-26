import React, { useEffect } from "react";
import axios from "axios";
import API_URL from "../config/api.js";

const SomeComponent = () => {
  useEffect(() => {
    axios.get(`${API_URL}/some-endpoint`).then((response) => {
      // işlem
    });
  }, []);

  return <div>Component içeriği</div>;
};

export default SomeComponent;
