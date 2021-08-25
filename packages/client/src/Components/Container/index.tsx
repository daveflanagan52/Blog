import React, { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode | Array<ReactNode>,
}

const Container = ({ children }: ContainerProps) => (
  <div className="container">
    {children}
  </div>
);

export default Container;
