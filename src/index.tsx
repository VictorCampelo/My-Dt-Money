import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { createServer, Model } from "miragejs";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "frelancer",
          type: "deposit",
          category: "dev",
          amount: 5000,
          createdAt: new Date("2021-02-01"),
        },{
          id: 2,
          title: "agua",
          type: "withdraw",
          category: "dev",
          amount: -5000,
          createdAt: new Date("2021-11-01"),
        },{
          id: 3,
          title: "frelancer",
          type: "deposit",
          category: "dev",
          amount: 5000,
          createdAt: new Date("2021-12-01"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transaction", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);