import { Container } from './styles'

export function Checkbox({ label, checked = false, ...rest }) {
  return (
    <Container>
    <span>{label}</span>
    <input
        type="checkbox"
        checked={checked}
        {...rest}
    />
    </Container>
  )
}