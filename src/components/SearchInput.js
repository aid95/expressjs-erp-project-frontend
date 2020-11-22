import React, { useState } from "react";
import SelectSearch from "react-select-search";
import "../searchInputStyle.css";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_USERS } from "../SharedQueries";

export const JusoSearchInput = ({ setAddress }) => {
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
      placeholder="Address"
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
      getOptions={(query) => {
        return new Promise((resolve, reject) => {
          setTerm(query);
          getUsers();
          resolve(
            users.map(({ id, username, fullName }) => ({
              value: `${id}`,
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
