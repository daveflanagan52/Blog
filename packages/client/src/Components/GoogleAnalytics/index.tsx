import React, { useEffect } from "react";
import ReactGA, { FieldsObject } from "react-ga";
import { RouteComponentProps } from "react-router-dom";

declare var process: {
  env: {
    GA_PROPERTY: string
  }
}

ReactGA.initialize(process.env.GA_PROPERTY);

export default <P extends RouteComponentProps>(
  WrappedComponent: React.ComponentType<P>,
  options: FieldsObject = {},
) => {
  const trackPage = (page: string) => {
    ReactGA.set({ page, ...options });
    ReactGA.pageview(page);
  };

  return (props: P) => {
    useEffect(() => {
      trackPage(props.location.pathname);
    }, [props.location.pathname]);

    return <WrappedComponent {...props} />;
  };
}