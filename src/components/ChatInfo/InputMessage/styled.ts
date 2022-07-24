import styled from 'styled-components';

export const WrapperInputMessage = styled.div`
  flex: 0 0 auto;
  padding: 0 1rem;
  display: flex;
  gap: 1rem;
  justify-content: space-around;
  align-items: flex-end;
`;

export const WrapperTextarea = styled.div`
  flex: 1 1 auto;
  overflow: hidden;
`;

export const WrapperButton = styled.div`
  flex: 0 0 auto;
  margin-bottom: 8px;

  & > button > i {
    margin: 0;
  }
`;

export const Textarea = styled.textarea`
  overflow: auto !important;
  max-height: 200px;

  &::-webkit-scrollbar {
    width: 0;
  }
`;
