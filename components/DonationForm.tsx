import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
// import { useState } from "react";
import { useForm } from 'react-hook-form'
// import apiClient from '../utils/apiClient'
// import { AxiosError } from 'axios'

interface FormData {
  address: string
  email: string
  name: string
}

const CheckoutForm = () => {
  const { register, handleSubmit, watch, errors } = useForm<FormData>()
  // const [isLoading, setLoading] = useState(false);

  const stripe = useStripe()
  // const elements = useElements();

  const onSubmit = async (data) => {
    console.log(data)
    // setLoading(true);
    // const result = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: elements.getElement(CardElement),
    //   billing_details: {
    //     address: {
    //       city: data.city,
    //       line1: data.address,
    //       postal_code: data.zip,
    //       state: data.state
    //     },
    //     email: "janedoe@example.com",
    //     name: data.name,
    //     phone: "555-555-5555"
    //   }
    // });
    // await handleStripePaymentMethod(result);
    // setLoading(false);
  }

  // const handleStripePaymentMethod = async result => {
  //   if (result.error) {
  //     Modal.error({
  //       title: "Error",
  //       content: result.error.message
  //     });
  //   } else {
  //     const response = await fetch("api/create-customer", {
  //       method: "POST",
  //       mode: "same-origin",
  //       body: JSON.stringify({
  //         paymentMethodId: result.paymentMethod.id
  //       })
  //     });

  //     const subscription = await response.json();
  //     handleSubscription(subscription);
  //   }
  // };

  // const handleSubscription = subscription => {
  //   const { latest_invoice } = subscription;
  //   const { payment_intent } = latest_invoice;

  //   if (payment_intent) {
  //     const { client_secret, status } = payment_intent;

  //     if (status === "requires_action") {
  //       stripe.confirmCardPayment(client_secret).then(function (result) {
  //         if (result.error) {
  //           // The card was declined (i.e. insufficient funds, card has expired, etc)
  //           Modal.error({
  //             title: "Error",
  //             content: result.error.message
  //           });
  //         } else {
  //           // Success!
  //           Modal.success({
  //             title: "Success"
  //           });
  //         }
  //       });
  //     } else {
  //       // No additional information was needed
  //       Modal.success({
  //         title: "Success"
  //       });
  //     }
  //   } else {
  //     console.log(`handleSubscription:: No payment information received!`);
  //   }
  // };

  // const paymentIntent = async () => {
  //   try {
  //     const response = await apiClient.post('/api/donation');
  //     const paymentIntent = response.data;
  //   } catch (err) {
  //     if (err && err.response) {
  //       const axiosError = err as AxiosError<ServerError>
  //       return axiosError.response.data;
  //     }

  //     throw err;
  //   }
  // };

  return (
    <form className="w-full max-w-lg m-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-name"
          >
            Name on card
          </label>
          <input
            ref={register({ required: true })}
            name="name"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-name"
            type="text"
            placeholder="Jane Smith"
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-email"
          >
            Email
          </label>
          <input
            ref={register({ required: true })}
            name="email"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-email"
            type="email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 mb-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-address"
          >
            <span>Address</span>
            <span className="lowercase tracking-wide text-gray-700 text-xs font-normal ml-2 mb-2">
              (Optional)
            </span>
          </label>
          <input
            ref={register}
            name="street"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-street"
            type="text"
            placeholder="123 elm st"
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-city"
          >
            City
          </label>
          <input
            ref={register}
            name="city"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-city"
            type="text"
            placeholder="Albuquerque"
          />
        </div>
        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            State
          </label>
          <input
            ref={register({ maxLength: 2, minLength: 2 })}
            name="state"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
            type="text"
            placeholder="NY"
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-zip"
          >
            Zip
          </label>
          <input
            ref={register({ maxLength: 6, minLength: 6 })}
            name="zip"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-zip"
            type="text"
            placeholder="90210"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <CardElement className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 flex justify-end">
          <input
            ref={register}
            type="submit"
            disabled={!stripe}
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          />
        </div>
      </div>
    </form>
  )
}

export default CheckoutForm

//    <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
