export const actionTypes = {
  SERVER_ERROR: 'SERVER_ERROR',
  SERVER_OK: 'SERVER_OK',
  CLEAR_ERROR: 'CLEAR_ERROR'
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

export function clearError() {
  return { type: actionTypes.CLEAR_ERROR }
}
