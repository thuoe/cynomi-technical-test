import { useRouteError, isRouteErrorResponse, useLocation } from "react-router-dom"

const ErrorPage = (): JSX.Element => {
  const location = useLocation()
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return (
      <div id="error-page" style={ { textAlign: 'center',  fontFamily: 'Arial, sans-serif'}}>
        <h1>404</h1>
        <p>Oops! Page Not found.</p>
        <p>Invalid path: {`${location.pathname}`}</p>
      </div>
    );
  } else {
    return <div>Oops!</div>;
  }
}

export default ErrorPage