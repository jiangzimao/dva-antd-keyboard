import React from 'react';
import FormBlock from './FormBlock';
import TableDemo from './TableDemo';
import ShortcutBlock from './ShortcutBlock';
import ArtoCompleteDemo from './AutoCompleteDemo';

const Main = () => {
  return (
    <div>
      <ShortcutBlock />
      <FormBlock />
      <ArtoCompleteDemo />
      <TableDemo />
    </div>
  );
};

export default Main;
