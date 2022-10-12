import { Button as CegalButton } from '@cegal/ui-components'

type ButtonProps = { label: string; onClick: () => void }

export function Button ({ label, onClick }: ButtonProps) {
  return <CegalButton onClick={() => onClick()}>{label}</CegalButton>
}
