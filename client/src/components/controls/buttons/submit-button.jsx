import Button from './button';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  margin-top: 12px;
`;

export default function SubmitButton(props) {
  return <StyledButton type="submit" {...props}></StyledButton>;
}
