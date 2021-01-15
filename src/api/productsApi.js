//GET ALL PRODUCTS
export async function getProducts() {
  try {
    const response = await fetch(`http://localhost:3001/products`, {
      method: "GET",
    });
    if (response.ok) {
      let data = response.json();
      return data;
    } else {
      let error = response.json();
      return error;
    }
  } catch (error) {
    return error;
  }
}

//POST A PRODUCT
export async function postProduct(product) {
  try {
    const response = await fetch(`http://localhost:3001/products/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (response.ok) {
      alert("success");
      let result = response.json();
      return result;
    } else {
      alert("fuck");
      let error = response.json();
      return error;
    }
  } catch (error) {
    return error;
  }
}

//GET A SINGLE PRODUCT
export async function getSingleProduct(id) {
  try {
    const response = await fetch(`http://localhost:3001/products/${id}`, {
      method: "GET",
    });
    if (response.ok) {
      let data = response.json();
      return data;
    } else {
      let error = response.json();
      return error;
    }
  } catch (error) {
    return error;
  }
}

//UPDATE A PRODUCT
export async function updateProduct(id, product) {
  try {
    const response = await fetch(`http://localhost:3001/products/${id}`, {
      method: "PUT",
      header: new Headers("Content-Type", "application/json"),
      body: JSON.stringify(product),
    });
    if (response.ok) {
      let data = response.json();
      return data;
    } else {
      let error = response.json();
      return error;
    }
  } catch (error) {
    return error;
  }
}

//REMOVE A PRODUCT
export async function removeProduct(id) {
  try {
    const response = await fetch(`http://localhost:3001/products/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return "Product Deleted";
    } else {
      return response.json();
    }
  } catch (error) {
    return error;
  }
}

// "/:id/reviews" GET ALL REVIEWS FOR A SINGLE PRODUCT
export async function getAllReviews(productId) {
  try {
    const response = await fetch(
      `http://localhost:3001/products/${productId}/reviews`,
      { method: "GET" }
    );
    if (response.ok) {
      let data = response.json();
      return data;
    } else {
      let error = response.json();
      return error;
    }
  } catch (error) {
    return error;
  }
}

// "/:id/reviews" POST A REVIEW FOR A PRODUCT
export async function postReview(productId, review) {
  try {
    const response = await fetch(
      `http://localhost:3001/products/${productId}/reviews`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      }
    );
    if (response.ok) {
      alert("successfuly added");
      let result = response.json();
      return result;
    } else {
      alert("fuck! smthing wrong");
      let error = response.json();
      return error;
    }
  } catch (error) {
    return error;
  }
}

// UPDATE A REVIEW
export async function updateReview(reviewId, review) {
  try {
    const response = await fetch(
      `http://localhost:3001/products/${reviewId}/reviews`,
      {
        method: "PUT",
        headers: new Headers("Content-Type", "application/json"),
        body: JSON.stringify(review),
      }
    );
    if (response.ok) {
      let result = response.json();
      return result;
    } else {
      let error = response.json();
      return error;
    }
  } catch (error) {
    return error;
  }
}

//DELETE A REVIEW
export async function deleteReview(reviewId) {
  try {
    const response = await fetch(
      `http://localhost:3001/products/${reviewId}/reviews`,
      { method: "DELETE" }
    );
    if (response.ok) {
      return "REVIEW DELETED";
    } else {
      return response.json();
    }
  } catch (error) {
    return error;
  }
}

//POST A IMAGE
export async function postProductImage(productId, file) {
  try {
    console.log(file);
    let formData = new FormData();
    formData.append("product", file, file.name);
    const response = await fetch(
      `http://localhost:3001/products/${productId}/image`,
      { method: "POST", body: formData }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.json();
      return error;
    }
  } catch (error) {
    return error;
  }
}

//POST product to cart
export async function addProductToCart(productId, cartId) {
  try {
    cartId = "5f6b1991df85440017160811";
    let response = await fetch(
      `http://localhost:3001/products/carts/${cartId}/addToCart/${productId}`,
      { method: "POST" }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.json();
      return error;
    }
  } catch (error) {
    return error;
  }
}

//GET BASKET
export async function getBasket(cartId) {
  try {
    cartId = "5f6b1991df85440017160811";
    let response = await fetch(
      `http://localhost:3001/products/carts/${cartId}/`,
      { method: "GET" }
    );
    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      const error = await response.json();
      return error;
    }
  } catch (error) {
    return error;
  }
}

//DELETE ITEM FROM BASKET
export async function removeItemFromBasket(cartId, productId) {
  try {
    cartId = "5f6b1991df85440017160811";
    let response = await fetch(
      `http://localhost:3001/products/carts/${cartId}/removeFromCart/${productId}`,
      { method: "DELETE" }
    );
    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      const error = await response.json();
      return error;
    }
  } catch (error) {
    return error;
  }
}

//GET PRODUCT PDF
export async function getProductPdf(id) {
  try {
    let response = await fetch(
      `http://localhost:3001/products/${id}/exportPdf`,
      { method: "GET" }
    );
    const file = { file: `http://localhost:3001/products/${id}/exportPdf` };

    if (response.ok) {
      alert("SUCCESS! SENT TO YOUR EMAIL!");
      // window.open(file.file);
      return file;
    } else {
      alert("SOMETHING WENT WRONG");
      const error = response.json();
      return error;
    }
  } catch (error) {
    return error;
  }
}

export async function downloadList() {
  try {
    let response = await fetch(
      `http://localhost:3001/products/csv/exportToCSV`,
      { method: "GET" }
    );
    const file = { file: `http://localhost:3001/products/csv/exportToCSV` };

    if (response.ok) {
      // alert("SUCCESS!");
      window.open(file.file);
    } else {
      alert("SOMETHING WENT WRONG");
      const error = response.json();
      return error;
    }
  } catch (error) {
    return error;
  }
}
