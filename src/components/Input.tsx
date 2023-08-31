import React from "react";
interface Props extends React.HTMLProps<HTMLInputElement> {
  value: string;
}

export const InputText = ({ value, ...props }: Props) => {
  return (
    <>
      <div className="container mx-auto">
        <div className="mb-4 flex items-center">
          <input
            type="text"
            className="w-full rounded-lg border border-gray-400 p-2"
            placeholder="Search the movie ..."
            value={value}
            {...props}
          />
        </div>
      </div>
    </>
  );
};
