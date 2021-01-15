import React, { Component } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { removeItemFromBasket } from "../api/productsApi";

export default class Basket extends Component {
  removeItem = async (product) => {
    await removeItemFromBasket("", product.product._id);
    this.props.handleModified();
  };
  render() {
    return (
      <div>
        {this.props.basket ? (
          <ListGroup>
            {this.props.basket.products.map((product, index) => (
              <ListGroup.Item
                key={index}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {product.product.name}
                <Button onClick={() => this.removeItem(product)}>
                  Remove Item
                </Button>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>Total: {this.props.basket.total}</ListGroup.Item>
          </ListGroup>
        ) : (
          <h3>Empty Basket</h3>
        )}
      </div>
    );
  }
}
