"use client";

import { UploadButton } from "@/src/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";

interface UploadImageProps {}

const UploadImage: React.FC<UploadImageProps> = () => {
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <>
      <UploadButton
        endpoint={"imageUploader"}
        onClientUploadComplete={(res) => {
          // Do something with the response
          setImageUrl(res[0].url);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />

      {imageUrl.length ? (
        <div>
          <Image
            src={imageUrl}
            alt="product image"
            width={400}
            height={300}
            style={{ height: "auto" }}
            className="rounded-md"
          />
        </div>
      ) : null}
    </>
  );
};

export default UploadImage;
