import React, { useState } from 'react';

interface SelectProps {
  initialState?: string;
}

const useSelect = (props: SelectProps) => {
  const { initialState } = props;
  const [selected, setSelected] = useState(initialState || '');

  const selectHandler = (item: string) => {
    setSelected(item);
  };

  return { selected, selectHandler };
};

export default useSelect;
