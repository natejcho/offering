import fetch from 'isomorphic-unfetch'
import cookie from 'cookie'

// TODO: delete
export async function fetchGetJSON(url: string) {
  try {
    const data = await fetch(url).then((res) => res.json())
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function fetchPostJSON(url: string, data?: {}) {
  try {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data || {}), // body data type must match "Content-Type" header
    })
    return await response.json() // parses JSON response into native JavaScript objects
  } catch (err) {
    throw new Error(err.message)
  }
}

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie)
}

// TODO: memoize
/**
 * Obtains URI based on deployment of application
 *  SSR requests need absolute path, so when making calls to local api grab deployed uri
 *
 *
 * @param {Object} context Data fetching context parameter
 *    passed through from NextJs data fetching method
 */
export function getURI(context) {
  const {
    req: {
      headers: {
        'x-forwarded-host': host = '',
        'x-forwarded-proto': proto = '',
      } = {},
    } = {},
  } = context
  return proto && host ? `${proto}://${host}` : 'http://localhost:3000'
}
