const TempAddress = (props) => {
  return (
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
  )
}
