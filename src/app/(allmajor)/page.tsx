"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllMajor } from "./api/api";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;
export default function AllMajor() {
  const [majorList, setMajorList] = useState([]);

  const getFetchData = function () {
    getAllMajor().then((res) => {
      setMajorList(res.data);
    });
  };
  useEffect(() => {
    getFetchData();
  }, []);
  return (
    <div>
      <Link href="/career">career</Link>
      <Link href="/advice">advice</Link>
      <div>
        {majorList.map(({ name, keyword, example }, i) => {
          return (
            <div key={i}>
              <h1>{name}</h1>
              <h3>{keyword}</h3>
              <p>{example}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
