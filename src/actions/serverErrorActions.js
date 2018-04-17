export const actionTypes = {
  SERVER_ERROR: 'SERVER_ERROR',
  SERVER_OK: 'SERVER_OK'
}

export function checkServerError() {
  // Will be set on the page by the server
  if (window && window.error) {
    return {
      type: actionTypes.SERVER_ERROR,
      error: window.error
    }
  }
  return {
    type: actionTypes.SERVER_OK
  }
}
