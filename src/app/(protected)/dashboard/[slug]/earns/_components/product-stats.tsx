'use client'
import { useProductStats } from '@/hooks/use-earns'
import { centsToDollars } from '@/lib/stripe-utils'
import { TrendingUp, DollarSign, Package } from 'lucide-react'
import React from 'react'

const ProductStats = () => {
  const { data: products, isLoading, error } = useProductStats()

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-white">Product Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-40 bg-background-80 rounded-xl border border-in-active/50" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-text-secondary">Failed to load product stats</p>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-white">Product Performance</h3>
        <div className="text-center py-20 bg-background-80 rounded-xl border border-in-active/50">
          <Package className="h-12 w-12 text-text-secondary/50 mx-auto mb-4" />
          <p className="text-text-secondary mb-2">No products yet</p>
          <p className="text-text-secondary text-sm">
            Create products in your automations to start earning
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-medium text-white mb-2">Product Performance</h3>
        <p className="text-text-secondary text-sm">See how your products are performing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-background-90 p-5 rounded-xl border border-in-active/50 hover:border-in-active transition-colors"
          >
            {/* Product Image */}
            <div className="w-full h-32 rounded-lg bg-background-80 mb-4 overflow-hidden">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-8 w-8 text-text-secondary/50" />
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-white mb-1">{product.name}</h4>
                <p className="text-sm text-text-secondary">
                  ${centsToDollars(product.price).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-in-active/30">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="h-4 w-4 text-light-blue" />
                  </div>
                  <p className="text-lg font-bold text-white">{product.sales}</p>
                  <p className="text-xs text-text-secondary">Sales</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign className="h-4 w-4 text-keyword-green" />
                  </div>
                  <p className="text-lg font-bold text-white">
                    ${centsToDollars(product.earnings).toLocaleString('en-US', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <p className="text-xs text-text-secondary">Earned</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Package className="h-4 w-4 text-purple-400" />
                  </div>
                  <p className="text-lg font-bold text-white">
                    ${centsToDollars(product.revenue).toLocaleString('en-US', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <p className="text-xs text-text-secondary">Revenue</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductStats

