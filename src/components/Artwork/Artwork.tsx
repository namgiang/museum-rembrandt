import React from "react";
import { Image } from "../../UI/Image";

type ArtworkProps = {
  title: string;
  imageUrl: string;
  caption: string;
};

export const Artwork: React.FC<ArtworkProps> = React.memo(
  ({ title, imageUrl, caption }) => {
    return (
      <div>
        <Image baseSource={imageUrl} />
        <h4 style={{ margin: "4px 0" }}>{title}</h4>
        <p style={{ margin: "0", fontSize: "0.8rem", color: "grey" }}>
          {caption}
        </p>
      </div>
    );
  }
);
