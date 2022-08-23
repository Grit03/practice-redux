import { useState } from "react";

function Home() {
  const [text, setText] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    setText("");
  };
  const onChange = (e) => {
    setText(e.target.value);
  };
  return (
    <>
      <h1>✅ TO-DO</h1>
      <form onSubmit={onSubmit}>
        <input
          placeholder="할 일을 입력하세요..."
          type="text"
          value={text}
          onChange={onChange}
        />
        <button>저장</button>
      </form>
      <ul></ul>
    </>
  );
}

export default Home;
