const { useState, render } = require("./React");

function Button() {
  const [count, setCount] = useState(10);
  const [name, setName] = useState("Sam");

  const onClick = () => {
    setCount(count + 1);
    setName("Samrood");
  };

  return {
    type: "button",
    children: [count, name],
    onClick,
  };
}

let button = render(Button); // [ 10, "Sam"]
button.onClick();
button = render(Button); // [11, "Samrood"]
button.onClick();
button = render(Button); // [12, "Samrood"]
