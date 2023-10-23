import { appName, appNameAcronym } from "@/config";
import { Helmet } from "react-helmet-async";

interface HeadProps {
  title?: string;
  description?: string;
  index?: boolean;
}

const title = `${appNameAcronym} | ${appName}`;

export default function Head({
  title: receivedTitle = title,
  description,
  index = false,
}: HeadProps) {
  const titleTemplate =
    receivedTitle === title ? title : `${receivedTitle} | ${appNameAcronym}`;
  const { href } = location;

  return (
    <Helmet>
      <link rel="canonical" href={href} />
      <meta property="og:site_name" content={appName} />
      <meta property="og:title" content={titleTemplate} />
      <meta property="og:url" content={href} />
      <meta name="apple-mobile-web-app-title" content={appName} />
      <meta name="application-name" content={appName} />

      <title>{titleTemplate}</title>

      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
        </>
      )}

      {!index && <meta name="robots" content="none" />}
    </Helmet>
  );
}
