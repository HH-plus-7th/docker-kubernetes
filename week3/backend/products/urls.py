from django.urls import path

from .views import CategoryListView, ProductDetailView, ProductListCreateView

urlpatterns = [
    path("products", ProductListCreateView.as_view(), name="product-list-create"),
    path("products/<str:product_id>", ProductDetailView.as_view(), name="product-detail"),
    path("categories", CategoryListView.as_view(), name="category-list"),
]

