'use client';

import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
    // This code will only run on the client side
    console.log(document.title);
  }, []);

  return (
    <div>
      Welcome to oss !
    </div>
  );
};

export default App;