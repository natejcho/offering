import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
// import { useState } from "react";
import { useForm } from 'react-hook-form'
import Input from './Input'
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
  const elements = useElements();

  const onSubmit = async (data) => {
    const verifyCard = await stripe?.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      'billing_details': {
        email: data.email,
        name: data.name
      }
    })
    console.log(verifyCard);
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
          <Input
            type="text"
            label="Name on card"
            name="name"
            isError={errors.name}
            placeholder="Jane Smith"
            register={register({ required: true })}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <Input
            type="email"
            label="Email"
            name="email"
            isError={errors.email}
            placeholder="jane.smith@offering.com"
            register={register({ required: true })}
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
