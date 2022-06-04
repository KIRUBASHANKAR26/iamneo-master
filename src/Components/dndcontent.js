import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";

const DragDropContextContainer = styled.div`
  padding: 20px;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
`;

// fake data generator
const getItems = (count, prefix) =>
  Array.from({ length: count }, (v, k) => k).map((k) => {
    const randomId = Math.floor(Math.random() * 1000);
    return {
      id: `item-${randomId}`,
      prefix,
      content: `item ${randomId}`,
    };
  });

const removeItemItemFromList = (list, index) => {
  const newList = [...list];
  newList.splice(index, 1);
  return newList;
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const lists = ["open", "contacted", "written test"];

const generateLists = () =>
  lists.reduce(
    (acc, listKey) => ({ ...acc, [listKey]: getItems(5, listKey) }),
    {}
  );
export default function DndContent({ users }) {
  const [elements, setElements] = React.useState(generateLists());
  const [elements1, setElements1] = React.useState(users);
  const groupList = Object.keys(users);

  console.log("groupList", groupList);

  //   useEffect(() => {
  //     setElements(generateLists());
  //   }, []);

  //   const reorder = (list, startIndex, endIndex) => {
  //     const result = Array.from(list);
  //     const [removed] = result.splice(startIndex, 1);
  //     result.splice(endIndex, 0, removed);
  //     return result;
  //   };

  const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    console.log("addToList", result);
    return result;
  };

  const onDragEnd = (result) => {
    console.log("result", result);

    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    console.log("source", source, destination);
    console.log("test1", destination.droppableId, {
      ...elements1,
      [destination.droppableId]: addToList(
        elements1[destination.droppableId],
        destination.index,
        elements1[source.droppableId][source.index]
      ),
      [source.droppableId]: removeItemItemFromList(
        elements1[source.droppableId],
        source.index
      ),
    });
    setElements1((prev) => ({
      ...prev,
      [destination.droppableId]: addToList(
        elements1[destination.droppableId],
        destination.index,
        elements1[source.droppableId][source.index]
      ),
      [source.droppableId]: removeItemItemFromList(
        elements1[source.droppableId],
        source.index
      ),
    }));
  };

  return (
    <div className="card-list">
      <DragDropContextContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <ListGrid>
            {/* {lists.map((listKey) => (
              <DraggableElement
                elements={elements[listKey]}
                key={listKey}
                prefix={listKey}
              />
            ))} */}
            {groupList.map((listKey) => (
              <DraggableElement
                key={listKey}
                prefix={listKey}
                elements={elements1[listKey]}
              />
            ))}
          </ListGrid>
        </DragDropContext>
      </DragDropContextContainer>
    </div>
  );
}
