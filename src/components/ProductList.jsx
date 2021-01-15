import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, Button, Spinner } from "react-bootstrap";
import { getProducts } from "../api/productsApi";
import Reviews from "./Reviews";
const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [paginationLink, setPaginationLink] = useState(null);

  useEffect(() => {
    const callMeNow = async () => {
      await fetchProducts();
    };

    callMeNow();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const allProducts = await getProducts();
    setPaginationLink(allProducts.links);
    setProducts(allProducts.products);
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
