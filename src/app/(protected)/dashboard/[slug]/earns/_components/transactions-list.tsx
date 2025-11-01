'use client'
import { useTransactions } from '@/hooks/use-earns'
import { centsToDollars } from '@/lib/stripe-utils'
import { CheckCircle, XCircle, Clock, Image as ImageIcon } from 'lucide-react'
import React from 'react'
import { format } from 'date-fns'

const TransactionsList = () => {
  const { data: transactions, isLoading, error } = useTransactions(20)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-white">Recent Transactions</h3>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse h-20 bg-background-80 rounded-xl border border-in-active/50" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-text-secondary">Failed to load transactions</p>
      </div>
    )
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-white">Recent Transactions</h3>
        <div className="text-center py-20 bg-background-80 rounded-xl border border-in-active/50">
          <p className="text-text-secondary mb-2">No transactions yet</p>
          <p className="text-text-secondary text-sm">Sales will appear here once customers purchase your products</p>
        </div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SUCCEEDED':
        return <CheckCircle className="h-4 w-4 text-keyword-green" />
      case 'FAILED':
        return <XCircle className="h-4 w-4 text-red-400" />
      case 'PENDING':
        return <Clock className="h-4 w-4 text-yellow-400" />
      default:
        return <Clock className="h-4 w-4 text-text-secondary" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCEEDED':
        return 'text-keyword-green'
      case 'FAILED':
        return 'text-red-400'
      case 'PENDING':
        return 'text-yellow-400'
      default:
        return 'text-text-secondary'
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-medium text-white mb-2">Recent Transactions</h3>
        <p className="text-text-secondary text-sm">Your latest sales and earnings</p>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-background-90 p-4 rounded-xl border border-in-active/50 hover:border-in-active transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-4 flex-1">
              {/* Product Image or Icon */}
              <div className="w-12 h-12 rounded-lg bg-background-80 flex items-center justify-center overflow-hidden">
                {transaction.Product?.imageUrl ? (
                  <img
                    src={transaction.Product.imageUrl}
                    alt={transaction.Product.name || 'Product'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="h-6 w-6 text-text-secondary" />
                )}
              </div>

              {/* Transaction Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-white">
                    {transaction.Product?.name || 'Unknown Product'}
                  </p>
                  {getStatusIcon(transaction.status)}
                </div>
                <p className="text-xs text-text-secondary">
                  {format(new Date(transaction.createdAt), 'MMM d, yyyy • h:mm a')}
                </p>
              </div>

              {/* Earnings */}
              <div className="text-right">
                <p className="text-lg font-bold text-keyword-green">
                  +${centsToDollars(transaction.userEarnings).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-xs text-text-secondary">
                  <span className={getStatusColor(transaction.status)}>
                    {transaction.status.toLowerCase()}
                  </span>
                  {' • '}
                  ${centsToDollars(transaction.amount).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{' '}
                  total
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransactionsList

