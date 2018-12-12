import React from 'react';
import styled from '@emotion/styled';

const PortraitImg = styled.img`
  opacity: ${({state, hovering}) => state !== 'locked' & !hovering ? 0.4 : 1};
  width: 100%;
  padding: ${({hovering}) => hovering ? 0 : 3}px;
  border: ${({hovering}) => hovering ? 3 : 0}px solid blue;
  box-sizing: border-box;
  background-color: ${({state}) => {
    switch (state) {
      case 'unlocked': {
        return 'green';
      }
      case 'missed': {
        return 'red';
      }
      case 'locked':
      default: {
        return 'transparent';
      }
    }
  }};
  cursor: pointer;
  clip-path: ${({state}) => {
    switch (state) { 
      case 'unlocked': {
        return `polygon(0% 25%, 100% 25%, 100% 75%, 0% 75%)`
      }
      case 'missed': {
        return `polygon(25% 0%, 75% 0%, 75% 100%, 25% 100%)`
      }
      case 'locked':
      default: {
        return `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`
      }
    }
  }};
`;

export default function Portrait({character, state, hovering, onMouseMove, onClick}) {
  return <PortraitImg 
    src={`https://ssbworld.com/images/chart/su/${character}.png`}
    state={state}
    hovering={hovering}
    onMouseMove={onMouseMove}
    onClick={onClick}
  />
};
