import React from 'react';
import styled from 'styled-components';

const ItemsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ItemFrame = styled.div`
  width: 100%;
  padding: 4px 0px 4px 15px; 
 
  display: flex;
  align-items: center;
  background-color: ${props => (props.selected ? props.theme.activeBackground : 'transparent')};
  transition: all 0.2s ease;

  font-family: 'Raleway', sans-serif;
  font-size: 15px;
  color: rgb(193, 197, 202);

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.hoverBackground};
  }

  .public-symbol {
    width: 10%:
  }

  .item-name {
    width: 90%;
    padding-left: 5%;
    color: ${props => (props.selected ? '#fff' : '')};
  }
`;

const SectionItemList = ({ items, currentSelection, setCurrentSelection }) => (
  <ItemsContainer>
    {items
      && items.map(({ name, isPublic }) => (
        <ItemFrame
          key={name + isPublic}
          selected={currentSelection === name}
          onClick={() => setCurrentSelection(name)}
        >
          <div className="public-symbol">#</div>
          <div className="item-name">{name}</div>
        </ItemFrame>
      ))}
  </ItemsContainer>
);

export default SectionItemList;
