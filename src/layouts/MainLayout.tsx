import { FC, PropsWithChildren } from 'react';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className="w-full h-screen flex overflow-hidden">{children}</div>;
};

export default MainLayout;
