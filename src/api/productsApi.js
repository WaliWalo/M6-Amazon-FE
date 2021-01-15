//GET ALL PRODUCTS
const url = process.env.REACT_APP_BE_URL;
export async function getProducts() {
  try {
    const response = await fetch(`${url}/products?limit=1`, {
      method: "GET",
    });
    if (response.ok) {
      let data = await response.json();
      console.log(data);
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
    const response = await fetch(`${url}/products/`, {
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
    const response = await fetch(`${url}/products/${id}`, {
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
export async function updateProductById(id, product) {
  try {
    const response = await fetch(`${url}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      let error = await response.json();
      return error;
    }
  } catch (error) {
    return error;
  }
}

//REMOVE A PRODUCT
export async function removeProduct(id) {
  try {
    const response = await fetch(`${url}/products/${id}`, {
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

// GET ALL REVIEWS FOR A SINGLE PRODUCT "products/:productId/reviews"
export async function getAllReviews(productId) {
  try {
    const response = await fetch(`${url}/products/${productId}/reviews`, {
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
    console.log("Fetching all reviews error", error);
    return error.response.data;
  }
}

// GET A SPECIFIC REVIEW FOR A SINGLE PRODUCT "products/:productId/reviews/:reviewId"
export async function getSpecificReview(productId, reviewId) {
  try {
    const response = await fetch(
      `${url}/products/${productId}/reviews${reviewId}`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      let data = response.json();
      return data;
    } else {
      let error = response.json();
      return error;
    }
  } catch (error) {
    console.log("Fetching specific review error", error);
    return error.response.data;
  }
}

// POST A REVIEW FOR A PRODUCT "products/:productId/reviews"
export async function postReview(productId, review) {
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  };
  console.log(review);
  try {
    const response = await fetch(
      `${url}/products/${productId}/reviews`,
      config
    );
    if (response.ok) {
      alert("successfuly added");
      let result = await response.json();
      console.log(result);
      return result;
    } else {
      alert("Unable to post your review, something went wrong");
      let error = await response.json();
      return error;
    }
  } catch (error) {
    console.log("Posting review error", error);
    return error;
  }
}

// UPDATE A REVIEW "products/:productId/reviews/:reviewsId"
export async function updateReview(productId, reviewId, review) {
  const config = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const response = await fetch(
      `${url}/products/${productId}/reviews/${reviewId}`,
      {
        config,
        review,
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
    console.log("Editing review error", error);
    return error;
  }
}

// DELETE A REVIEW "products/:productId/reviews/:reviewsId"
export async function deleteReview(productId, reviewId) {
  try {
    const response = await fetch(
      `${url}/products/${productId}/reviews/${reviewId}`,
      { method: "DELETE" }
    );
    if (response.ok) {
      return "REVIEW DELETED";
    } else {
      return response.json();
    }
  } catch (error) {
    console.log("Deleting review error", error);
    return error;
  }
}

//POST A IMAGE
export async function postProductImage(productId, file) {
  try {
    console.log(file);
    let formData = new FormData();
    formData.append("product", file, file.name);
    const response = await fetch(`${url}/products/${productId}/image`, {
      method: "POST",
      body: formData,
    });
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
      `${url}/products/carts/${cartId}/addToCart/${productId}`,
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
    let response = await fetch(`${url}/products/carts/${cartId}/`, {
      method: "GET",
    });
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
      `${url}/products/carts/${cartId}/removeFromCart/${productId}`,
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
export async function getProductPdf(productId) {
  try {
    let response = await fetch(`${url}/products/${productId}/exportPdf`, {
      method: "GET",
    });
    const file = { file: `${url}/products/${productId}/exportPdf` };

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
    let response = await fetch(`${url}/products/csv/exportToCSV`, {
      method: "GET",
    });
    const file = { file: `${url}/products/csv/exportToCSV` };

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
