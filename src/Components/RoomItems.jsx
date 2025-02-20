import React, { useState } from 'react';
import { RoomItemsContainer, ItemButton, ItemList, QuantityInput,Item} from '../style/RoomItemStyled';

const RoomItems = ({ equipments, accessories, onAddItem }) => {
  return (
    <RoomItemsContainer>
      <h3>Select Items to Add</h3>
      <ItemList>
        <h4>Equipment</h4>
        {equipments.map((item) => (
          <Item key={item.id}>
            <span>{item.name}</span>
            <QuantityInput type="number" min="1" defaultValue="1" id={`eq-${item.id}`} />
            <ItemButton onClick={() => onAddItem(item, false, Number(document.getElementById(`eq-${item.id}`).value))}>
              Add
            </ItemButton>
          </Item>
        ))}
        <h4>Accessories</h4>
        {accessories.map((item) => (
          <Item key={item.id}>
            <span>{item.name}</span>
            <QuantityInput type="number" min="1" defaultValue="1" id={`acc-${item.id}`} />
            <ItemButton onClick={() => onAddItem(item, true, Number(document.getElementById(`acc-${item.id}`).value))}>
              Add
            </ItemButton>
          </Item>
        ))}
      </ItemList>
    </RoomItemsContainer>
  );
};

export default RoomItems;
