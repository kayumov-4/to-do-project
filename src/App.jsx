import React, { useState, useEffect } from "react";
import HomeLayout from "./components/Layout/HomeLayout";
import Registration from "./pages/auth/Registration";
import Auth from "./pages/auth";

import ContextStore from "./store/store";
function App() {
  const [quotes, setQuotes] = useState("");
  const [author, setAuthor] = useState("");
  function getQuote() {
    fetch("https://dummyjson.com/quotes/random")
      .then((res) => res.json())
      .then((res) => {
        setQuotes(res.quote);
        setAuthor(res.author);
      });
  }

  useEffect(() => {
    getQuote();
  }, []);
  return (
    <>
      <ContextStore.Provider value={{ quotes, author }}>
        {localStorage.getItem("token") ? <HomeLayout /> : <Auth />}
      </ContextStore.Provider>
    </>
  );
}

export default App;
