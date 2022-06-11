import styled from 'styled-components';

export const MainInput = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
`;

export const WrapperTextarea = styled.div`
  width: 80%;
  overflow: hidden;
`;

export const WrapperButtonSend = styled.div`
  padding: 0.8rem 0 0.8rem;
  margin-bottom: 8px;

  & > button > i {
    margin: 0;
  }
`;

export const Textarea = styled.textarea`
  width: 80%;
  overflow: auto !important;
  max-height: 200px;

  &::-webkit-scrollbar {
    width: 0;
  }
`;
