import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import React from "react";
import styled from "styled-components";

const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 2px;
  border-left: 5px solid yellow;
  box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
  background: white;
  display: grid;
  grid-gap: 20px;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
`;

const DroppableStyles = styled.div`
  padding: 10px;
  border-radius: 6px;
`;

const DraggableElement = ({ prefix, elements }) => {
  console.log("elements", elements);
  return (
    <DroppableStyles>
      <ColumnHeader>{prefix}</ColumnHeader>
      <Droppable droppableId={`${prefix}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {elements?.map((item, index) => (
              <ListItem key={item.cell} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DroppableStyles>
  );
};

export default DraggableElement;
