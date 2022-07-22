import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import ArrowContainer from './styles';

export default function BackArrow() {
  const history = useHistory();

  function handleArrowClick() {
    history.goBack();
  }

  return (
    <ArrowContainer className="arrow">
      <FaArrowLeft
        size={ 30 }
        className="arrow-icon"
        onClick={ () => handleArrowClick() }
      />
    </ArrowContainer>
  );
}
