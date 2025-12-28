
import React from 'react'
import { gsap } from 'gsap';
import { Draggable } from 'gsap/all';

import { Navbar, Welcome, Dock } from '#components';
import { Finder, Resume, Safari, Terminal, Text , Image, Contact, Gallery, Experience} from '#windows';

gsap.registerPlugin(Draggable);
const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock/>
      <Terminal/>
      <Safari/>
      <Resume/>
      <Finder/>
      <Text/>
      <Image/>
      <Contact/>
      <Gallery/>
      <Experience/>
    </main>
  );  
};

export default App