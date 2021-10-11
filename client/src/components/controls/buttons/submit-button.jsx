import Button from './button';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default function SubmitButton(props) {
  return <StyledButton type="submit" {...props}></StyledButton>;
}
