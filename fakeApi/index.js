const express = require("express");
const cors = require("cors");

const port = 3001;
const app = express();
app.use(cors());

app.get("/api", (req, res) => {
  res.status(200).send({ data: "Server Working OK" });
});

app.get("/api/todos", (req, res) => {
  res.status(200).send([
    {
      id:"sdfds567",
      title: "Take out garbage",
      description:
        "I need to take out the garbage before 11PM for the collector",
      priority: "high",
      status: "in process",
    },
    {
      id:"sdfdssdfsdf7",
      title: "Study for exams",
      description: "I need to study for the test on 14 of July",
      priority: "medium",
      status: "new",
    },
    {
      id:"sdfd6433s5fsfds67",
      title: "Check towels",
      description: "I need to buy new towels",
      priority: "low",
      status: "done",
    },
  ]);
});

app.listen(port, () => {
  console.log(`Fake Api listening at http://localhost:${port}`);
});
