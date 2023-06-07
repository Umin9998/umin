"use client";

import { getCareer } from "../api/api";
import { useState, useEffect } from "react";

export default function Career() {
  const [career, setCareer] = useState([]);
  const getFetchData = function () {
    getCareer().then((res) => {
      const data = res.data.dataSearch.content;
      console.log(data);
      setCareer(data);
    });
  };

  useEffect(() => {
    getFetchData();
  }, []);
  return (
    <div>
      <ul>
        {career.map(({ lClass, facilName, mClass, majorSeq }) => {
          return (
            <li key={majorSeq}>
              <h1>{mClass}</h1>
              <h3>{lClass}</h3>
              <p>{facilName}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
