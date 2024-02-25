import React from 'react';

interface ItemProps {
  item: string;
  onClick: (v: string) => void;
}

const Item = (props: ItemProps) => {
  const { item, onClick } = props;
  return (
    <li
      className="m-0 w-full list-none rounded-lg p-2 text-sm font-light transition hover:bg-slate-100"
      onClick={() => onClick(item)}
    >
      {item}
    </li>
  );
};

export default Item;
