import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./Home.css";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

type CartItem = Product;

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "shop" | "prescriptions" | "orders" | "profile" | "cart"
  >("shop");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  const products: Product[] = [
    {
      id: 1,
      name: "Ibuprofen 200mg",
      description: "Pain reliever and fever reducer",
      price: 5.99,
      category: "Pain Relief",
      image: "💊",
    },
    {
      id: 2,
      name: "Cetirizine 10mg",
      description: "Antihistamine for allergy relief",
      price: 8.49,
      category: "Allergy",
      image: "🌼",
    },
    {
      id: 3,
      name: "Omeprazole 20mg",
      description: "Acid reducer for heartburn",
      price: 12.99,
      category: "Digestive Health",
      image: "🔥",
    },
    {
      id: 4,
      name: "Vitamin D3 1000IU",
      description: "Supports bone and immune health",
      price: 9.99,
      category: "Vitamins",
      image: "🌞",
    },
    {
      id: 5,
      name: "Band-Aids",
      description: "Assorted sizes for wound care",
      price: 3.49,
      category: "First Aid",
      image: "🩹",
    },
    {
      id: 6,
      name: "Pepto-Bismol",
      description: "Upset stomach reliever",
      price: 6.79,
      category: "Digestive Health",
      image: "🌸",
    },
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: Product): void => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number): void => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const getTotal = (): string => {
    return cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  };

  const handleLogout = (): void => {
    navigate("/");
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <div className="logo">💊</div>
          <h1>MediCart</h1>
        </div>

        <nav className="nav-menu">
          <button
            className={`nav-item ${activeTab === "shop" ? "active" : ""}`}
            onClick={() => setActiveTab("shop")}
          >
            Shop Medications
          </button>
          <button
            className={`nav-item ${activeTab === "prescriptions" ? "active" : ""}`}
            onClick={() => setActiveTab("prescriptions")}
          >
            My Prescriptions
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

        {/* Only show logout button on profile page */}
        {activeTab === "profile" && (
          <div className="logout-container">
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h2 className="page-title">
            {activeTab === "shop"
              ? "Online Pharmacy"
              : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <div className="user-info">
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab("cart")}
                className="cart-button"
              >
                <span className="cart-icon">🛒</span>
                <span className="cart-count">{cart.length}</span>
              </Button>
            </div>
            <span className="username">Welcome, User!</span>
            <div className="avatar">👩‍⚕️</div>
          </div>
        </header>

        <div className="content-area">
          {activeTab === "shop" && (
            <div className="pharmacy-shop">
              <div className="search-container mb-6">
                <input
                  type="text"
                  placeholder="Search medications or categories..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="categories mb-6">
                <h3 className="text-lg font-semibold mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "All",
                    "Pain Relief",
                    "Allergy",
                    "Digestive Health",
                    "Vitamins",
                    "First Aid",
                  ].map((category) => (
                    <button
                      key={category}
                      className={`category-pill ${
                        searchTerm === category ? "active" : ""
                      }`}
                      onClick={() =>
                        setSearchTerm(category === "All" ? "" : category)
                      }
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="products-grid">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div key={product.id} className="product-card">
                      <div className="product-image">{product.image}</div>
                      <div className="product-details">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-category">{product.category}</p>
                        <p className="product-description">
                          {product.description}
                        </p>
                        <div className="product-footer">
                          <span className="product-price">
                            ${product.price.toFixed(2)}
                          </span>
                          <Button
                            size="sm"
                            onClick={() => addToCart(product)}
                            className="add-to-cart-btn"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-8">
                    No products found matching your search.
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === "cart" && (
            <div className="shopping-cart">
              <h3 className="text-xl font-semibold mb-4">Your Shopping Cart</h3>
              {cart.length > 0 ? (
                <>
                  <div className="cart-items">
                    {cart.map((item) => (
                      <div key={item.id} className="cart-item">
                        <div className="cart-item-image">{item.image}</div>
                        <div className="cart-item-details">
                          <h4>{item.name}</h4>
                          <p>${item.price.toFixed(2)}</p>
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
                    <Button
                      className="checkout-btn"
                      onClick={() => console.log("Proceeding to checkout...")}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="empty-cart">
                  <p>Your cart is empty</p>
                  <Button
                    variant="secondary"
                    onClick={() => setActiveTab("shop")}
                    className="continue-shopping-btn"
                  >
                    Continue Shopping
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === "prescriptions" && (
            <div className="prescriptions">
              <h3>Your Prescriptions</h3>
              <p>Prescription management content goes here</p>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="orders">
              <h3>Order History</h3>
              <p>Order history content goes here</p>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="profile">
              <h3>Your Profile</h3>
              <div className="profile-content">
                <div className="profile-section">
                  <h4>Personal Information</h4>
                  <p>Name: Jane Doe</p>
                  <p>Email: jane.doe@example.com</p>
                  <p>Phone: (123) 456-7890</p>
                </div>
                <div className="profile-section">
                  <h4>Shipping Address</h4>
                  <p>123 Main St, Apt 4B</p>
                  <p>New York, NY 10001</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
