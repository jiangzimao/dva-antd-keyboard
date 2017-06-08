import React from 'react';
import FormBlock from './FormBlock';
import ShortcutBlock from './ShortcutBlock';
import ShortcutBlock2 from './ShortcutBlock2';
import TableDemo from './TableDemo';
// import ArtoCompleteDemo from './AutoCompleteDemo';

const Main = () => {
  return (
    <div>
      <ShortcutBlock />
      <ShortcutBlock2 />
      <FormBlock />
      {/* <ArtoCompleteDemo /> */}
      <TableDemo />
    </div>
  );
};

export default Main;
