import React, { useState } from "react";
import SelectSearch from "react-select-search";
import "../searchInputStyle.css";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_DEPARTMENTS, GET_RANKS, SEARCH_USERS } from "../SharedQueries";

export const JusoSearchInput = ({
  setAddress,
  placeHolder = "도로명 주소",
}) => {
  const onChange = (e) => {
    setAddress(e);
  };

  return (
    <SelectSearch
      options={[]}
      getOptions={(query) => {
        return new Promise((resolve, reject) => {
          fetch(
            `https://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=10&keyw
ord=${query}&confmKey=devU01TX0FVVEgyMDIwMTExODIxMzQxMDExMDQzNjU=&resultType=json`
          )
            .then((response) => response.json())
            .then(({ results }) => {
              resolve(
                results.juso.map(({ roadAddrPart1, roadAddrPart2 }) => ({
                  value: `${roadAddrPart1} ${roadAddrPart2}`,
                  name: `${roadAddrPart1} ${roadAddrPart2}`,
                }))
              );
            })
            .catch(reject);
        });
      }}
      search
      placeholder={placeHolder}
      onChange={onChange}
    />
  );
};

export const UserSearchInput = ({ setUser }) => {
  const [users, setUsers] = useState([]);
  const [term, setTerm] = useState("");

  const [getUsers] = useLazyQuery(SEARCH_USERS, {
    variables: {
      term: term,
    },
    fetchPolicy: "network-only",
    onCompleted: (d) => setUsers(d.searchUser),
  });

  const onChange = (e) => {
    setUser(e);
  };

  return (
    <SelectSearch
      options={[]}
      getOptions={(query) => {
        return new Promise((resolve, reject) => {
          setTerm(query);
          getUsers();
          resolve(
            users.map(({ id, username, fullName }) => ({
              value: { id, username, fullName },
              name: `${fullName} @${username}`,
            }))
          );
        });
      }}
      search
      placeholder="수신자"
      onChange={onChange}
    />
  );
};

export const DepartmentSearchInput = ({
  setDepartment,
  placeHolder = "부서",
}) => {
  const [departments, setDepartments] = useState([]);

  useQuery(GET_DEPARTMENTS, {
    fetchPolicy: "network-only",
    onCompleted: (d) => {
      setDepartments(
        d.departments.map(({ id, title }) => ({
          value: id,
          name: title,
        }))
      );
    },
  });

  const onChange = (e) => {
    setDepartment(e);
  };

  return (
    <SelectSearch
      placeholder={placeHolder}
      onChange={onChange}
      options={departments}
    />
  );
};

export const RankSearchInput = ({ setDepartment, placeHolder = "직급" }) => {
  const [ranks, setRanks] = useState([]);

  useQuery(GET_RANKS, {
    fetchPolicy: "network-only",
    onCompleted: (d) => {
      setRanks(
        d.ranks.map(({ id, title }) => ({
          value: id,
          name: title,
        }))
      );
    },
  });

  const onChange = (e) => {
    setDepartment(e);
  };

  return (
    <SelectSearch
      options={ranks}
      placeholder={placeHolder}
      onChange={onChange}
    />
  );
};
