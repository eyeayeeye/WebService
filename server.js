const app = require("./app");
app.listen(8000, () => {
  console.log("app is listening to port 8000");
});

app.listen(8001, () => {
  console.log("app is listening to port 8001");
});
