import { useRouteError, isRouteErrorResponse, useLocation } from "react-router-dom"

const ErrorPage = () => {
  const location = useLocation()
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>{`Sorry, an unexpected error has occurred when redirecting to ${location.pathname}.`}</p>
        <p>
          <i>{error.statusText || error.data}</i>
        </p>
      </div>
    );
  } else {
    return <div>Oops!</div>;
  }
}

export default ErrorPage