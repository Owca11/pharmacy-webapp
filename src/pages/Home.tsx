import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { fetchAllDrugs, logout as authLogout } from "../authService";
import "./Home.css";

interface Product {
  id: number;
  brandName: string;
  price: number;
  graphicLink: string;
  prescriptionStatus: string;
  isAvailable: boolean;
}

interface CartItem {
  id: number;
  brandName: string;
  price: number;
  quantity: number;
}

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "shop" | "orders" | "profile" | "cart"
  >("shop");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDrugs = async () => {
      try {
        const drugs = await fetchAllDrugs();
        const mappedProducts = drugs.map((drug) => ({
          id: drug.id,
          brandName: drug.brandName,
          price: drug.price,
          graphicLink: drug.graphicLink,
          prescriptionStatus: drug.prescriptionStatus,
          isAvailable: drug.isAvailable,
        }));
        setProducts(mappedProducts);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load medications"
        );
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "shop") {
      loadDrugs();
    }
  }, [activeTab]);

  const filteredProducts = products.filter(
    (product) =>
      product.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.prescriptionStatus
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: Product): void => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            brandName: product.brandName,
            price: product.price,
            quantity: 1,
          },
        ];
      }
    });
  };

  const removeFromCart = (productId: number): void => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number): void => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotal = (): string => {
    return cart
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleLogout = (): void => {
    authLogout();
    navigate("/");
  };

  const navigateToProductDetail = (productId: number): void => {
    navigate(`/product/${productId}`);
  };

  if (loading && activeTab === "shop") {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home-container">
      {/* Removed the sidebar with MediCart logo and text */}
      <div className="main-content">
        <header className="header">
          <h2 className="page-title">
            {activeTab === "shop"
              ? "Online Pharmacy"
              : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>

          <nav className="top-nav-menu">
            <button
              className={`nav-item ${activeTab === "shop" ? "active" : ""}`}
              onClick={() => setActiveTab("shop")}
            >
              Shop Medications
            </button>
            <button
              className={`nav-item ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              Order History
            </button>
            <button
              className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              My Profile
            </button>
          </nav>

          <div className="user-info">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab("cart")}
              className="cart-button"
            >
              <span className="cart-icon">🛒</span>
              <span className="cart-count">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </Button>
            <span className="username">Welcome, User!</span>
            <div className="avatar">👩‍⚕️</div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="logout-button"
            >
              Log out
            </Button>
          </div>
        </header>

        <div className="content-area">
          {activeTab === "shop" && (
            <div className="pharmacy-shop">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search medications..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="products-grid">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div key={product.id} className="product-card">
                      <div
                        className="product-image"
                        onClick={() => navigateToProductDetail(product.id)}
                      >
                        {product.graphicLink ? (
                          <img
                            src={product.graphicLink}
                            alt={product.brandName}
                          />
                        ) : (
                          <span>💊</span>
                        )}
                      </div>
                      <div className="product-details">
                        <h3
                          onClick={() => navigateToProductDetail(product.id)}
                          style={{ cursor: "pointer" }}
                        >
                          {product.brandName}
                        </h3>
                        <p>${product.price.toFixed(2)}</p>
                        <Button size="sm" onClick={() => addToCart(product)}>
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No products found</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "cart" && (
            <div className="shopping-cart">
              <h3>Your Cart</h3>
              {cart.length > 0 ? (
                <>
                  <div className="cart-items">
                    {cart.map((item) => (
                      <div key={item.id} className="cart-item">
                        <div className="cart-item-details">
                          <h4>{item.brandName}</h4>
                          <p>${item.price.toFixed(2)}</p>
                          <div className="quantity-controls">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          className="remove-item"
                          onClick={() => removeFromCart(item.id)}
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="cart-summary">
                    <div className="total">
                      <span>Total:</span>
                      <span>${getTotal()}</span>
                    </div>
                    <Button className="checkout-btn">
                      Proceed to Checkout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="empty-cart">
                  <p>Your cart is empty</p>
                  <Button onClick={() => setActiveTab("shop")}>
                    Continue Shopping
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === "orders" && (
            <div className="orders">
              <h3>Order History</h3>
              <p>
                This section is currently under development. Your past orders
                will appear here once implemented.
              </p>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="profile">
              <h3>Your Profile</h3>
              <div className="profile-content">
                <p>
                  This section is currently under development. Your personal
                  information and shipping address details will be manageable
                  here once implemented.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
