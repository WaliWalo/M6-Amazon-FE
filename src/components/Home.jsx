import React, { Component } from "react";
import { addProductToCart, getBasket } from "../api/productsApi";
import Basket from "./Basket";
import ProductList from "./ProductList";
export default class Home extends Component {
  state = {
    basket: null,
    modified: 0,
  };

  handleModified = () => {
    let modified = this.state.modified + 1;
    this.setState({ modified });
  };

  addToBasket = async (product) => {
    await addProductToCart(product._id, "");
    let modified = this.state.modified + 1;
    this.setState({ modified });
    alert(product.name + " added to basket.");
  };

  componentDidMount = () => {
    this.getBasketFromApi();
  };

  getBasketFromApi = async () => {
    const basket = await getBasket("");
    this.setState({ basket: basket });
  };

  componentDidUpdate = (prevProp, prevState) => {
    if (this.state.modified !== prevState.modified) {
      this.getBasketFromApi();
    }
  };

  render() {
    return (
      <div>
        {/* {this.state.basket ? (
          <Basket
            basket={this.state.basket}
            handleModified={this.handleModified}
          />
        ) : (
          <h3>Empty Basket</h3>
        )} */}

        <ProductList addToBasket={this.addToBasket} />
      </div>
    );
  }
}
