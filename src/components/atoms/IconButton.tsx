import type { ButtonHTMLAttributes } from "react";
export function IconButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`inline-flex items-center justify-center p-2 ${props.className ?? ""}`} />;
}
