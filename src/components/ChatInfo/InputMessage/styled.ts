import styled from 'styled-components';

export const WrapperInputMessage = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
`;

export const WrapperTextarea = styled.div`
  width: 80%;
  overflow: hidden;
`;

export const WrapperButton = styled.div`
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
