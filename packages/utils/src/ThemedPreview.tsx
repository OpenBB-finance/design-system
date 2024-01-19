import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function ThemedPreview({ children }: Props) {
  return (
    <div>
      <div className="dark bg-grey-850 p-10 text-grey-100">
        <h3 className="mb-10 text-center subtitle-sm-bold">Dark Theme</h3>
        {children}
      </div>
      <div className="bg-white p-10 text-black">
        <h3 className="mb-10 text-center subtitle-sm-bold">Light Theme</h3>
        {children}
      </div>
    </div>
  );
}
