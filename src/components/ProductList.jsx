import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, Button, Spinner } from "react-bootstrap";
import { getProducts } from "../api/productsApi";
import Reviews from "./Reviews";
const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState("");
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const callMeNow = async () => {
      await fetchProducts();
    };

    callMeNow();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const allProducts = await getProducts();
    setProducts(allProducts);
    setLoading(false);
  };

  const sendProduct = (product) => {
    props.addToBasket(product);

    console.log(product);
  };
  return (
    <div className="product-list mt-4">
      <Reviews
        productId={productId}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Container>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
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
                      src={`http://localhost:3001/${product._id}.jpg`}
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
        )}
      </Container>
    </div>
  );
};

export default ProductList;
