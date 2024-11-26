'use client'

import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import CheckoutSummary from '@/components/CheckoutSummary'
import ShippingForm from '@/components/ShippingForm'
import PaymentForm from '@/components/PaymentForm'
import OrderConfirmation from '@/components/OrderConfirmation'

const steps = ['Shipping', 'Payment', 'Confirmation']

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] =
useState(0)
  const [shippingDetails, setShippingDetails] = useState(null)
  const [paymentDetails, setPaymentDetails] = useState(null)
  const { cartItems, total } = useCart()

  const handleShippingSubmit = (data) => {
    setShippingDetails(data)
    setCurrentStep(1)
  }

  const handlePaymentSubmit = async (data) => {
    setPaymentDetails(data)
    // Process payment here
    // If successful, move to confirmation step
    setCurrentStep(2)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="flex mb-8">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`flex-1 text-center ${
              index <= currentStep ? 'text-indigo-600' : 'text-gray-400'
            }`}
          >
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                index <= currentStep ? 'bg-indigo-600 text-white' : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </div>
            <div className="mt-2">{step}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {currentStep === 0 && <ShippingForm onSubmit={handleShippingSubmit} />}
          {currentStep === 1 && <PaymentForm onSubmit={handlePaymentSubmit} />}
          {currentStep === 2 && (
            <OrderConfirmation
              shippingDetails={shippingDetails}
              paymentDetails={paymentDetails}
              cartItems={cartItems}
              total={total}
            />
          )}
        </div>
        <div>
          <CheckoutSummary cartItems={cartItems} total={total} />
        </div>
      </div>
    </div>
  )
}

