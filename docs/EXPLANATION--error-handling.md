# Error Handling

Because of the various ways mop-frontend fetches data, we should have different ways of detecting errors and displaying them to the user. We should try to reduce the different cases as much as possible, but there is some necessary complexity.

What we have now is just a start, and could be improved upon. (See [Possible Future Work](#possible-future-work))

## /404 and /500

The simplest way of seeing the error pages is going to these routes, defined in routes.js, which simply loads the Error404 or Error500 component as a normal child of Wrapper. Because we don't pass in an `error` prop and they have a `defaultProp.error` of {}, `error.description` returns `undefined` and we always see the default error message defined in the render function.

## Errors in Wrapper

We didn't want to have to change the url to /404 or /500 for every error, so errors can additionally be displayed by the Wrapper, a component that is always on screen (wrapping the current route) and only mounts once. This allows an error to be shown at any route by somehow rendering the error component instead of the Wrapper's normal children.

To do this, there is some logic in Wrapper's render function to display the corresponding error component if `store.errorStore.response_code` is `404` or `500`. We will also override the message on the error page if `store.errorStore.description` is set.

We also need to clear this error in the router's `onChange` callback, so if they navigate to another page, or go back or something, this error is cleared and they can see the page contents again.

### Setting Error: On Page Load

When the user enters the app at certain special routes, e.g. the petition sign page, the django server provides the app with some data in `window.preloadObjects`. This saves the time of calling the extra `fetch()`.

The user could load the app at a path that the django server recognizes, but some parameter (e.g. petition slug) could be incorrect, or there could be some other server-side issue that means that the server can't provide preload data.

In that case, the server will set `window.error` in the html body. We want to look for this on load and render based on it, so we check the error object in `actions/serverErrorActions.js:checkServerError()`, called on `componentDidMount` of Wrapper (so when the page loads). This function dispatches an action with the contents of any `window.error`, which causes the error to be set in `store.errorStore`.

### Setting Error: From `fetch()`

If we need some data that the server didn't provide in `preloadObjects`, like the user has navigated to a different petition, we fetch the data.

Fetch uses promises, and automatically rejects only if there is a network error.

We can this pattern in an action, which should handle all cases:


```js
fetch(...)
.catch(rejectNetworkErrorsAs500)
.then(parseAPIResponse)
.then(json => dispatch(/*success*/))
.catch(err => dispatch(/*error*/, error: err))
```
because of `catch(rejectNetworkErrorsAs500)` and `then(parseAPIResponse)`, the final catch will be thrown on network errors and api server errors, always being called with `error` as an object with `response_code`.

So in the reducer, we can use this dispatch to set the error on `store.errorStore` and the correct error will be shown in the wrapper like before.

## Possible Future Work
- More types of error messages (e.g. user has gone offline)
- Use this fetch() pattern for every fetch()
- Errors that don't take over the screen.
