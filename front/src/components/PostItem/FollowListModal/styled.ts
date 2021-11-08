import styled from '@emotion/styled';

export const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

export const ModalContent = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 60%;
  width: 40%;
  border-radius: 20px;
  background-color: #fff;
  z-index: 3;

  & > .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dbdbdb;
    padding: 8px 16px;

    & > h1 {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 0;
    }

    & > span {
      width: 1.5rem;
      height: 1.5rem;
      font-size: 1.5rem;
    }
  }

  & > .modal-main {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;
  }
`;

export const MoreButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;

  & > button {
    height: 32px;
    padding: 4px 10px;
  }
`;

export const ModalOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  cursor: pointer;
`;
