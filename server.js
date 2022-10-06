const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("client"));

const myTodos = [
  {
    id: 0,
    title: "Todo Example #1",
    status: true,
    category: ["General", "Latest"],
    due: "9-18-2022",
  },
  {
    id: 1,
    title: "Todo Example #2",
    status: false,
    category: ["Example"],
    due: "9-25-2022",
  },
];

app.get("/todos", (req, res) => {
  res.send(myTodos);
});

app.post("/todos", (req, res) => {
  console.log(req);

  myTodos.push({
    id: 2,
    title: "Test Todo",
    status: false,
    category: ["General"],
    due: "10-10-1999",
  });

  res.send(myTodos);
});

app.listen(port, () => {
  console.log(`App Running On: http://localhost:${port}`);
});
