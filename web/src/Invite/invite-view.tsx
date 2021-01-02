import React from "react";
import styled from "styled-components";

const MainContainer = styled.main``;

const FormContainer = styled.section``;

const InputContainer = styled.div``;

const Input = styled.input``;

const InviteButton = styled.button``;

interface IProps {
  handleEmailToInvite: (e: any) => void;
  handleInvitePress: () => void;
}

function InviteView({ handleEmailToInvite, handleInvitePress }: IProps) {
  return (
    <MainContainer>
      <FormContainer>
        <InputContainer>
          <Input onChange={handleEmailToInvite} />
        </InputContainer>
        <InviteButton onClick={handleInvitePress}>Invite</InviteButton>
      </FormContainer>
    </MainContainer>
  );
}

export default InviteView;
