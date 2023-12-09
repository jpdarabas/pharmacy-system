import React from 'react';


interface SearchProps {
  searchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
}

const Search: React.FC<SearchProps> = ({ 
  searchChange, 
  placeHolder}) => {
  return (
    <div className="relative">
      <input
        type="text"
        defaultValue=''
        placeholder={placeHolder}
        onChange={searchChange}
        className="p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300"
      />
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <span className="material-symbols-outlined text-gray-500">search</span>
      </span>
    </div>
  );
};

export default Search;