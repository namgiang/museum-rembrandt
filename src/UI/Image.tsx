import { useEffect, useMemo, useState } from "react";
import { useIsMobile } from "../hooks/isMobile.hook";

type ImageProps = {
  baseSource: string;
};

export const Image: React.FC<ImageProps> = ({ baseSource }) => {
  const isMobile = useIsMobile();
  const sources = useMemo(
    () => ({
      blurryImage: baseSource.replace("=s0", "=w10"),
      desktop: baseSource.replace("=s0", "=w220"),
      mobile: baseSource.replace("=s0", "=w184"),
    }),
    [baseSource]
  );
  const [desktopSrc, setDesktopSrc] = useState(sources.blurryImage);
  const [mobileSrc, setMobileSrc] = useState(sources.blurryImage);

  useEffect(() => {
    const onLoad = () => {
      setDesktopSrc(sources.desktop);
      setMobileSrc(sources.mobile);
    };
    const onError = () => {
      setDesktopSrc(sources.blurryImage);
      setMobileSrc(sources.blurryImage);
    };

    const img = document.createElement("img");
    img.src = isMobile ? sources.mobile : sources.desktop;
    img.alt = "";
    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);

    return () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, [sources, isMobile]);

  return (
    <picture>
      <source srcSet={mobileSrc} media="(max-width: 401px)" />
      <img src={desktopSrc} alt="artwork" style={{ width: "100%" }} />
    </picture>
  );
};
