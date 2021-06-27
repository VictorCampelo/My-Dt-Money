import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { createServer, Model } from "miragejs";

createServer({
  models: {
    transaction: Model,
    category: Model,
  },

  routes() {
    this.namespace = "api";

    this.get("/categories/:id");

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.get("/categories", () => {
      return this.schema.all("category");
    });

    this.post("/transaction", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    });

    this.post("/categories", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("category", data);
    });
  },

  seeds(server) {
    server.create("category", {
      id: 1,
      title: "trabalho",
      description: "deposit",
      createdAt: new Date("2021-02-01"),
    } as any);
    server.create("category", {
      id: 2,
      title: "alimentação",
      description: "withdraw",
      createdAt: new Date("2021-11-01"),
    } as any);
    server.create("category", {
      id: 3,
      title: "frelancer",
      description: "deposit",
      createdAt: new Date("2021-12-01"),
    } as any);

    server.create("transaction", {
      id: 1,
      title: "frelancer",
      type: "deposit",
      categoryId: 1,
      category: {
        id: 1,
        title: "trabalho",
        description: "deposit",
        createdAt: new Date("2021-02-01"),
      },
      amount: 5000,
      createdAt: new Date("2021-02-01"),
    } as any);
    server.create("transaction", {
      id: 2,
      title: "agua",
      type: "withdraw",
      categoryId: 2,
      category: {
        id: 2,
        title: "alimentação",
        description: "withdraw",
        createdAt: new Date("2021-11-01"),
      },
      amount: -5000,
      createdAt: new Date("2021-11-01"),
    } as any);
    server.create("transaction", {
      id: 3,
      title: "frelancer",
      type: "deposit",
      categoryId: 3,
      category: {
        id: 3,
        title: "frelancer",
        description: "deposit",
        createdAt: new Date("2021-02-01"),
      },
      amount: 5000,
      createdAt: new Date("2021-12-01"),
    } as any);
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
