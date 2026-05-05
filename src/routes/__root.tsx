import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
// import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
// import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'
import ReactLenis from "lenis/react";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Quán nước Út Hạnh',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/logo.png",
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
    <head>
      <HeadContent/>
    </head>
    <body>
    <ReactLenis root/>
    {children}
    {/*<TanStackDevtools*/}
    {/*  config={{*/}
    {/*    position: 'bottom-right',*/}
    {/*  }}*/}
    {/*  plugins={[*/}
    {/*    {*/}
    {/*      name: 'Tanstack Router',*/}
    {/*      render: <TanStackRouterDevtoolsPanel/>,*/}
    {/*    },*/}
    {/*  ]}*/}
    {/*/>*/}
    <Scripts/>
    </body>
    </html>
  )
}
