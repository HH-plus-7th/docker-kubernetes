from django.db.models import Q, QuerySet
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Product
from .serializers import ProductSerializer


def apply_filters(queryset: QuerySet[Product], params) -> QuerySet[Product]:
    search = params.get("search") or ""
    category1 = params.get("category1") or ""
    category2 = params.get("category2") or ""

    if search:
        queryset = queryset.filter(
            Q(title__icontains=search) | Q(brand__icontains=search),
        )

    if category1:
        queryset = queryset.filter(category1=category1)

    if category2:
        queryset = queryset.filter(category2=category2)

    return queryset


def apply_sorting(queryset: QuerySet[Product], sort: str) -> QuerySet[Product]:
    if sort == "price_asc":
        return queryset.order_by("lprice")
    if sort == "price_desc":
        return queryset.order_by("-lprice")
    if sort == "name_asc":
        return queryset.order_by("title")
    if sort == "name_desc":
        return queryset.order_by("-title")
    # 기본: 가격 오름차순
    return queryset.order_by("lprice")


class ProductListCreateView(generics.GenericAPIView):
    serializer_class = ProductSerializer

    def get(self, request, *args, **kwargs):
        query = request.query_params

        page = int(query.get("page") or query.get("current") or 1)
        limit = int(query.get("limit") or 20)
        search = query.get("search") or ""
        category1 = query.get("category1") or ""
        category2 = query.get("category2") or ""
        sort = query.get("sort") or "price_asc"

        qs = Product.objects.all()
        qs = apply_filters(qs, query)
        qs = apply_sorting(qs, sort)

        total = qs.count()
        start = (page - 1) * limit
        end = start + limit
        products = qs[start:end]

        serializer = self.get_serializer(products, many=True)

        data = {
            "products": serializer.data,
            "pagination": {
                "page": page,
                "limit": limit,
                "total": total,
                "totalPages": (total + limit - 1) // limit,
                "hasNext": end < total,
                "hasPrev": page > 1,
            },
            "filters": {
                "search": search,
                "category1": category1,
                "category2": category2,
                "sort": sort,
            },
        }
        return Response(data)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "product_id"


class CategoryListView(APIView):
    def get(self, request, *args, **kwargs):
        categories = {}

        for row in Product.objects.values("category1", "category2"):
            cat1 = row["category1"]
            cat2 = row["category2"]
            if not cat1:
                continue
            if cat1 not in categories:
                categories[cat1] = {}
            if cat2 and cat2 not in categories[cat1]:
                categories[cat1][cat2] = {}

        return Response(categories)

