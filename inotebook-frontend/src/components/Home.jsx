import React from 'react'
import AddNote from './AddNote';
import Notes from './Notes';

function Home({showAlert}) {

  return (
    <>
      <AddNote showAlert={showAlert} />
      <Notes showAlert={showAlert} />
    </>
  );
}

export default Home