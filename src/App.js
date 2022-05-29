import Form from "./components/form";
import Result from "./components/result";

import { useState } from "react";

function App() {
  const [data, setData] = useState({});

  return (
    <main>
      <Form setData={setData}/>
      {!Object.keys(data).length ? <div></div> : <Result data={data} />}
    </main>
  );
}

export default App;
