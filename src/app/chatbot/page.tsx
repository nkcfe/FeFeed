import React from 'react';

const Search = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1"></div>
      <div className="container mx-auto p-4 pb-12">
        <form
          onSubmit={() => {}}
          className="flex items-center rounded-md border"
        ><input type='text' className='flex-1 rounded-md p-2 pl-3' placeholder='NextJS가 뭐야'/></form>
      </div>
    </div>
  );
};

export default Search;
