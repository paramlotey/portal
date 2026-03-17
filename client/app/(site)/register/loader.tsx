import Image from "next/image";
import React from "react";

const loader = () => {
  return (
    <>
      <Image
        src={"./images/Ramgarhia.gif"}
        alt="Loader"
        height={1000}
        width={1000}
        className="h-screen"
      />
    </>
  );
};

export default loader;
