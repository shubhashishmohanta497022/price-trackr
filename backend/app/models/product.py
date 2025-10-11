from sqlalchemy import Column, Integer, String, BigInteger, ForeignKey, DateTime, Boolean, UniqueConstraint, Text
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from ..database import Base

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(512), nullable=False)
    sku = Column(String(128), nullable=True, index=True)
    brand = Column(String(128), nullable=True)
    sources = relationship("ProductSource", back_populates="product", cascade="all, delete-orphan")

class Source(Base):
    __tablename__ = "sources"
    id = Column(Integer, primary_key=True)
    domain = Column(String(255), unique=True, index=True, nullable=False)
    site_name = Column(String(128), nullable=False)
    trust_score = Column(Integer, default=50)

class ProductSource(Base):
    __tablename__ = "product_sources"
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    source_id = Column(Integer, ForeignKey("sources.id", ondelete="CASCADE"), nullable=False)
    url = Column(Text, nullable=False)
    product = relationship("Product", back_populates="sources")
    source = relationship("Source")
    __table_args__ = (UniqueConstraint("product_id", "source_id", name="uq_product_source"),)

class PriceHistory(Base):
    __tablename__ = "price_history"
    id = Column(Integer, primary_key=True)
    product_source_id = Column(Integer, ForeignKey("product_sources.id", ondelete="CASCADE"), nullable=False, index=True)
    price_cents = Column(BigInteger, nullable=False)
    currency = Column(String(8), nullable=False, default="INR")
    availability = Column(String(64), nullable=True)
    scraped_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))
    __table_args__ = (UniqueConstraint("product_source_id", "scraped_at", name="uq_price_time"),)

class Watchlist(Base):
    __tablename__ = "watchlists"
    id = Column(Integer, primary_key=True)
    user_id = Column(String(128), index=True, nullable=False)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    alert_rules = Column(Text, nullable=True)  # JSON string with thresholds/regions

class ScamScore(Base):
    __tablename__ = "scam_scores"
    domain = Column(String(255), primary_key=True)
    whois_days_old = Column(Integer, default=0)
    safe_browsing_flag = Column(Boolean, default=True)
    trust_signals = Column(Text, nullable=True)
