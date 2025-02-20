import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Job Search 2023</h1>
      <nav className="flex space-x-4">
        <button className="hover:underline">Board</button>
        <button className="hover:underline">Activities</button>
        <button className="hover:underline">Contacts</button>
        <button className="hover:underline">Documents</button>
        <button className="bg-blue-500 px-4 py-2 rounded">+ Create</button>
      </nav>
    </header>
  );
};

export default Header;
