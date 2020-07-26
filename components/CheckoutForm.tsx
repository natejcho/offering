import React, { useState } from 'react'

import getStripe from '../utils/get-stripejs'
import { useForm } from 'react-hook-form'
import Input from './Input'
// import { formatAmountForDisplay } from '../utils/stripe-helpers'
import * as config from '../config'
import { fetchPostJSON } from '../utils/api-helpers'

interface FormData {
  amount: number
}

interface FormProps {
  destination: string
}

const CheckoutForm = (props: FormProps) => {
  const {
    register,
    handleSubmit,
    // watch,
    errors,
  } = useForm<FormData>()

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    // Create a Checkout Session.
    try {
      const response = await fetchPostJSON('/api/checkout_sessions', {
        amount: data.amount,
        destination: props.destination,
      })
      // const response = await apiClient.post<FormData>('/api/checkout_sessions');

      if (response.status === 500) {
        console.error(response.message)
        return
      }

      // Redirect to Checkout.
      const stripe = await getStripe()
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { error } = await stripe!.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: response.id,
      })
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
      console.warn(error.message)
    } catch (err) {
      if (err && err.response) {
        console.warn(err.response)
      }

      throw err
    }
    setLoading(false)
  }

  return (
    <form className="w-full max-w-lg m-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <Input
            type="text"
            label="Amount"
            name="amount"
            isError={errors.amount}
            placeholder="10.00"
            register={register({
              required: true,
              min: config.MIN_AMOUNT,
              max: config.MAX_AMOUNT,
              pattern: config.CURRENCY_FORMAT_REGEX,
            })}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 flex justify-end">
          <input
            ref={register}
            type="submit"
            value="Give"
            disabled={loading}
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          />
        </div>
      </div>
    </form>
  )
}

export default CheckoutForm
