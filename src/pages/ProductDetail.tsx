import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { fetchDrugById } from "../authService";
import { DrugDto } from "../Types";
import "./Home.css";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<DrugDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDrug = async () => {
      try {
        if (!id) return;
        const drugData = await fetchDrugById(parseInt(id));
        setProduct(drugData);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load medication details"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDrug();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!product) {
    return <div className="not-found">Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <Button
        variant="outline"
        onClick={() => navigate("/home")}
        className="back-button"
      >
        ← Back to Shop
      </Button>

      <div className="product-detail">
        <div className="product-image-container">
          {product.graphicLink ? (
            <img
              src={product.graphicLink}
              alt={product.brandName}
              className="product-detail-image"
            />
          ) : (
            <div className="product-image-placeholder">💊</div>
          )}
        </div>

        <div className="product-info">
          <h1>{product.brandName}</h1>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-status">
            {product.isAvailable ? "In Stock" : "Out of Stock"}
          </p>

          <div className="details-section">
            <h2>Product Details</h2>
            <div className="details-grid">
              <div>
                <span className="detail-label">Manufacturer:</span>
                <span>{product.manufacturer}</span>
              </div>
              <div>
                <span className="detail-label">Active Ingredient:</span>
                <span>{product.activeIngredient}</span>
              </div>
              <div>
                <span className="detail-label">Dosage:</span>
                <span>{product.dosage}</span>
              </div>
              <div>
                <span className="detail-label">Form:</span>
                <span>{product.drugForm}</span>
              </div>
              <div>
                <span className="detail-label">Prescription:</span>
                <span>{product.prescriptionStatus}</span>
              </div>
              <div>
                <span className="detail-label">Batch Number:</span>
                <span>{product.batchNumber}</span>
              </div>
            </div>
          </div>

          <div className="description-section">
            <h2>Safety Information</h2>
            <div>
              <h3>Contraindications</h3>
              <p>{product.contraindications}</p>
            </div>
            <div>
              <h3>Side Effects</h3>
              <p>{product.sideEffects}</p>
            </div>
            <div>
              <h3>Storage</h3>
              <p>{product.storageConditions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
