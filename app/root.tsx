import type { MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import MainNavigation from "~/components/MainNavigation"
import styles from "~/styles/main.css";


export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />        
      </head>
      <body>
        <header>
          <MainNavigation></MainNavigation>
        </header>        
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {

  const caughtResponse = useCatch();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>{caughtResponse.statusText}</title>
      </head>
      <body>
        <header>
          <MainNavigation></MainNavigation>
        </header>
        <main className="error">
          <h1>{caughtResponse.status}</h1>
          <p>{caughtResponse.data.message || "Something went wrong !!!"}</p>
          <p>Back to <Link to="/">safety</Link></p>
        </main>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({error}: any) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>An error occurred !!!</title>
      </head>
      <body>
        <header>
          <MainNavigation></MainNavigation>
        </header>
        <main className="error">
          <h1>An error occured !!!</h1>
          <p>{error.message}</p>
          <p>Back to <Link to="/">safety</Link></p>
        </main>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function links() {
  return[{rel: "stylesheet", href: styles}];
}
