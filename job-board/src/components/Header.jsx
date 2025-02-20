import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Job Search 2023</h1>
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded p-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Board
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Activities
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Contacts
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Documents
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          + Create
        </button>
      </div>
    </header>
  );
};

export default Header;
