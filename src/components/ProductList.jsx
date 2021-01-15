import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  Button,
  Spinner,
  Form,
} from "react-bootstrap";
import { getAllProducts, getProducts } from "../api/productsApi";
import Reviews from "./Reviews";
const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [paginationLink, setPaginationLink] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    const callMeNow = async () => {
      await fetchProducts(categories);
      // GET ALL PRODUCT FOR CATEGORIES
      await fetchAllProducts();
    };

    callMeNow();
  }, []);

  const fetchProducts = async (category) => {
    setLoading(true);
    const allProducts = await getProducts(category);
    setPaginationLink(allProducts.links);
    setProducts(allProducts.products);
    setLoading(false);
  };

  const fetchAllProducts = async () => {
    setLoading(true);
    const allProducts = await getAllProducts();
    let productCategories = [];
    allProducts.products.forEach((product) => {
      if (product.category) {
        productCategories.push(product.category);
      }
    });
    const uniqueCategories = [...new Set(productCategories)];
    setCategories(uniqueCategories);
    setLoading(false);
  };

  const sendProduct = (product) => {
    props.addToBasket(product);

    console.log(product);
  };
  const url = process.env.REACT_APP_BE_URL;
  const handleNext = async () => {
    if (paginationLink.next) {
      setLoading(true);
      try {
        const response = await fetch(`${url}${paginationLink.next}`, {
          method: "GET",
        });
        // console.log(response);
        if (response.ok) {
          let data = await response.json();
          setPaginationLink(data.links);
          setProducts(data.products);
          setLoading(false);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePrev = async () => {
    if (paginationLink.prev) {
      setLoading(true);
      try {
        const response = await fetch(`${url}${paginationLink.prev}`, {
          method: "GET",
        });
        // console.log(response);
        if (response.ok) {
          let data = await response.json();
          setPaginationLink(data.links);
          setProducts(data.products);
          setLoading(false);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAscend = () => {
    let sortedProducts = products.sort((a, b) => (a.price > b.price ? 1 : -1));
    setProducts(sortedProducts);
    console.log(sortedProducts);
  };

  const handleDescend = () => {
    let sortedProducts = products.sort((a, b) => (a.price > b.price ? -1 : 1));
    setProducts(sortedProducts);
    console.log(sortedProducts);
  };

  const handleCheckBox = async (e) => {
    console.log(e.target.id);
    let indexOfSelected = selected.findIndex(
      (select) => select === e.target.id
    );
    if (indexOfSelected !== -1) {
      selected.splice(indexOfSelected, 1);
      setSelected(selected);
    } else {
      selected.push(e.target.id);
      setSelected(selected);
    }
    await fetchProducts(selected);
  };
  return (
    <div className="product-list mt-4">
      <Reviews
        productId={productId}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Container>
        <Row>
          <Form>
            <div key={`inline-checkbox`} className="mb-3">
              {categories.map((category) => {
                return (
                  <Form.Check
                    inline
                    label={category}
                    type={"checkbox"}
                    id={category}
                    onChange={(e) => handleCheckBox(e)}
                  />
                );
              })}
            </div>
          </Form>
          <Button className="mx-2" onClick={() => handleAscend()}>
            Ascending
          </Button>
          <Button onClick={() => handleDescend()}>Descending</Button>
        </Row>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <>
            <Row>
              {products.map((product) => {
                return (
                  <Col md={3} key={product._id}>
                    <Card style={{ width: "12rem" }}>
                      <Card.Img
                        style={{
                          width: "100%",
                          height: "10rem",
                        }}
                        variant="top"
                        src={product.imageUrl}
                      />
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                          {product.description} <br />
                          <strong>${product.price}</strong>
                        </Card.Text>
                        <Button
                          onClick={() => {
                            setProductId(product._id);
                            setModalShow(true);
                          }}
                          variant="primary"
                        >
                          Reviews
                        </Button>
                        <Button
                          className="ml-3"
                          onClick={() => sendProduct(product)}
                        >
                          Buy
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
            <Button className="mx-2" onClick={() => handlePrev()}>
              Prev Page
            </Button>
            <Button onClick={() => handleNext()}>Next Page</Button>
          </>
        )}
      </Container>
    </div>
  );
};

export default ProductList;
