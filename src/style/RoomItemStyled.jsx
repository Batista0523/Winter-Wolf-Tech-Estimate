// RoomItemsStyled.js
import styled from 'styled-components';

export const RoomItemsContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

export const ItemList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ItemButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const QuantityInput = styled.input`
  width: 50px;
  margin-left: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
