export default function QueryParameters(app) {
  app.get("/lab5/calculator", (req, res) => {
    const { a, b, operation } = req.query;
    let result = 0;
    switch (operation) {
      case "add":
        result = Number.parseInt(a) + Number.parseInt(b);
        break;
      case "subtract":
        result = Number.parseInt(a) - Number.parseInt(b);
        break;
      case "multiply":
        result = Number.parseInt(a) * Number.parseInt(b);
        break;
      case "divide":
        result = Number.parseInt(a) / Number.parseInt(b);
        break;
      default:
        result = "Invalid operation";
    }
    res.send(result.toString());
  });
}
