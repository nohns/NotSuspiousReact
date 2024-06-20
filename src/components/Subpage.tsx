import { ReactNode } from "react";

interface SubpageProps {
  title: string;
  description: string;
  children: ReactNode;
}

function Subpage({ title, description, children }: SubpageProps) {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-4 mt-16 px-8">
      <h1 className="font-extrabold text-4xl">{title}</h1>
      <p className="">{description}</p>
      <main className="flex flex-col gap-4">{children}</main>
    </div>
  );
}

export default Subpage;
