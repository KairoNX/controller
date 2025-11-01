'use client'
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/hooks/use-products'
import { Plus, Edit, Trash2, Package, X, Image as ImageIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { centsToDollars, dollarsToCents } from '@/lib/stripe-utils'
import { toast } from 'sonner'
import Loader from '@/components/global/loader'

const ProductsManager = () => {
  const { data: products, isLoading } = useProducts()
  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()
  const deleteProduct = useDeleteProduct()

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  })

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.price) {
      toast.error('Name and price are required')
      return
    }

    const price = parseFloat(formData.price)
    if (isNaN(price) || price <= 0) {
      toast.error('Price must be a positive number')
      return
    }

    try {
      await createProduct.mutateAsync({
        name: formData.name,
        description: formData.description || undefined,
        price,
        imageUrl: formData.imageUrl || undefined,
      })
      toast.success('Product created!')
      setIsCreateOpen(false)
      setFormData({ name: '', description: '', price: '', imageUrl: '' })
    } catch (error: any) {
      toast.error(error.message || 'Failed to create product')
    }
  }

  const handleEdit = (product: any) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description || '',
      price: centsToDollars(product.price).toString(),
      imageUrl: product.imageUrl || '',
    })
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return

    const price = parseFloat(formData.price)
    if (isNaN(price) || price <= 0) {
      toast.error('Price must be a positive number')
      return
    }

    try {
      await updateProduct.mutateAsync({
        productId: editingProduct.id,
        data: {
          name: formData.name,
          description: formData.description || undefined,
          price,
          imageUrl: formData.imageUrl || undefined,
        },
      })
      toast.success('Product updated!')
      setEditingProduct(null)
      setFormData({ name: '', description: '', price: '', imageUrl: '' })
    } catch (error: any) {
      toast.error(error.message || 'Failed to update product')
    }
  }

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      await deleteProduct.mutateAsync(productId)
      toast.success('Product deleted!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete product')
    }
  }

  const handleToggleActive = async (product: any) => {
    try {
      await updateProduct.mutateAsync({
        productId: product.id,
        data: { active: !product.active },
      })
      toast.success(`Product ${!product.active ? 'activated' : 'deactivated'}!`)
    } catch (error: any) {
      toast.error(error.message || 'Failed to update product')
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse h-8 bg-background-80 rounded w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-64 bg-background-80 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-medium text-white mb-2">Products</h3>
          <p className="text-text-secondary text-sm">Manage your products for sale</p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="bg-light-blue hover:bg-light-blue/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Product
        </Button>
      </div>

      {!products || products.length === 0 ? (
        <div className="text-center py-20 bg-background-80 rounded-xl border border-in-active/50">
          <Package className="h-16 w-16 text-text-secondary/50 mx-auto mb-4" />
          <p className="text-text-secondary mb-2">No products yet</p>
          <p className="text-text-secondary text-sm mb-4">Create your first product to start selling</p>
          <Button
            onClick={() => setIsCreateOpen(true)}
            className="bg-light-blue hover:bg-light-blue/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Product
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product: any) => (
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
                    <ImageIcon className="h-8 w-8 text-text-secondary/50" />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-white">{product.name}</h4>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={product.active}
                        onCheckedChange={() => handleToggleActive(product)}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary line-clamp-2">
                    {product.description || 'No description'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-in-active/30">
                  <p className="text-lg font-bold text-white">
                    ${centsToDollars(product.price).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(product)}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-light-blue hover:text-light-blue/80"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(product.id)}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Product Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="bg-background-90 border-in-active/50 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Create Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <Label className="text-white">Product Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Premium Course"
                className="bg-background-80 border-in-active/30 mt-1"
                required
              />
            </div>
            <div>
              <Label className="text-white">Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your product..."
                className="bg-background-80 border-in-active/30 mt-1"
                rows={3}
              />
            </div>
            <div>
              <Label className="text-white">Price (USD) *</Label>
              <Input
                type="number"
                step="0.01"
                min="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="19.99"
                className="bg-background-80 border-in-active/30 mt-1"
                required
              />
            </div>
            <div>
              <Label className="text-white">Image URL</Label>
              <Input
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="bg-background-80 border-in-active/30 mt-1"
                type="url"
              />
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateOpen(false)}
                className="border-in-active/50 text-text-secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-light-blue hover:bg-light-blue/90 text-white"
                disabled={createProduct.isPending}
              >
                <Loader state={createProduct.isPending}>Create</Loader>
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="bg-background-90 border-in-active/50 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <Label className="text-white">Product Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Premium Course"
                className="bg-background-80 border-in-active/30 mt-1"
                required
              />
            </div>
            <div>
              <Label className="text-white">Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your product..."
                className="bg-background-80 border-in-active/30 mt-1"
                rows={3}
              />
            </div>
            <div>
              <Label className="text-white">Price (USD) *</Label>
              <Input
                type="number"
                step="0.01"
                min="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="19.99"
                className="bg-background-80 border-in-active/30 mt-1"
                required
              />
            </div>
            <div>
              <Label className="text-white">Image URL</Label>
              <Input
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="bg-background-80 border-in-active/30 mt-1"
                type="url"
              />
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingProduct(null)}
                className="border-in-active/50 text-text-secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-light-blue hover:bg-light-blue/90 text-white"
                disabled={updateProduct.isPending}
              >
                <Loader state={updateProduct.isPending}>Update</Loader>
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductsManager

