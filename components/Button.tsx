import { Button as CegalButton, ButtonProps } from "@cegal/ui-components";

export function Button({ label, ...rest }: ButtonProps) {
  return <CegalButton {...rest}>{label}</CegalButton>;
}
