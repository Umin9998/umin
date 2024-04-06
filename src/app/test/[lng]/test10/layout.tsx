'use client';
import StyledComponentsRegistry from '@/styles/StyledComponentsRegistry';

import '@/styles/globals.css';
import 'normalize.css';
import { StrictMode } from 'react';
import { styled } from 'styled-components';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <head>
        <title>{'test'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/test2/favicon.ico" />
        {/* https://cdnjs.com/libraries/font-awesome */}
        {/* <style jsx global>{`
        html {
          font-family: ${notoSansKr.style.fontFamily};
        }
      `}</style> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin /> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <style>
          {`
          ol {
            list-style-type: decimal;
          }

          ul {
            list-style: initial;
          }
        `}
        </style>
      </head>{' '}
      {/* <body>{children}</body> */}
      <StyledComponentsRegistry>
        <body>
          {' '}
          <div id="root">
            <StrictMode>{children}</StrictMode>
          </div>
        </body>
      </StyledComponentsRegistry>
    </html>
  );
};

export default Layout;
