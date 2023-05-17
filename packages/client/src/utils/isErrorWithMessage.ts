export function isErrorWithMessage(
  error: unknown
): error is { data: { message: string } } {
  return (
    error != null &&
    typeof error === 'object' &&
    'data' in error &&
    error.data != null &&
    typeof error.data === 'object' &&
    'message' in error.data &&
    typeof error.data.message === 'string'
  )
}
