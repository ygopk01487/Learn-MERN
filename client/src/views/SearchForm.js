import React from "react";

const SearchForm = ({ searchFilter }) => {
  return (
    <div
      className="search-container-filter divSearch"
      style={{
        background: "#C0C0C0",
        width: "25%",
        height: "auto",
        marginLeft: "35%",
      }}
    >
      {searchFilter.length !== 0 ? (
        <ul>
          {searchFilter.map((item) => {
            return (
              <a key={item._id}>
                <li>{item.title}</li>
              </a>
            );
          })}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchForm;
