"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useTheme } from "next-themes";

export default function ProductCard({ product }: any) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Card
      className={`w-full max-w-sm shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 ${
        !isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Link href={`/product/${product.slug}`}>
        <Image
          src={product.images[0]}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-60 object-cover"
        />
      </Link>
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold truncate">{product.name}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {product.brand}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xl font-bold">${product.price}</span>
          <span className="text-sm text-yellow-500">
            ⭐ {product.rating} ({product.numReviews})
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <Button asChild variant="outline">
          <Link href={`/product/${product.slug}`}>View Details</Link>
        </Button>
        <Button
          disabled={product.stock === 0}
          variant={product.stock === 0 ? "destructive" : "default"}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
}
