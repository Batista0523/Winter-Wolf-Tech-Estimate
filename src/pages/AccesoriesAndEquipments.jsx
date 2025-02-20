
import React, { useState, useEffect } from "react";
import { fetchAllItems, deleteItem } from "../helpers/ApiCalls";
import {
  AccesoryWrapper,
  AccesoryItem,
  EquipmentWrapper,
  EquipmentItem,
  StyledButton,
  
} from "../style/EquipmentsAndAccesoryStyled";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
function AccesoriesAndEquipments() {
  // const navigate = useNavigate();
  const [equipments, setEquipments] = useState([]);
  const [accessories, setAccessories] = useState([]);
  // const [selectedItems, setSelectedItems] = useState({
  //   equipment: [],
  //   accessories: [],
  // });
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedForDeletion, setSelectedForDeletion] = useState({
    equipment: [],
    accessories: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const [equipmentsResponse, accessoriesResponse] = await Promise.all([
        fetchAllItems(import.meta.env.VITE_EQUIPMENTS_ENDPOINT),
        fetchAllItems(import.meta.env.VITE_ACCESORIES_ENDPOINT),
      ]);
      setEquipments(equipmentsResponse.payload);
      setAccessories(accessoriesResponse.payload);
    };
    fetchData();
  }, []);

  const handleToggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    setSelectedForDeletion({ equipment: [], accessories: [] });
  };

  const handleSelectForDeletion = (type, id) => {
    setSelectedForDeletion((prevState) => {
      const updatedItems = [...prevState[type]];
      if (updatedItems.includes(id)) {
        // Deselect the item
        return {
          ...prevState,
          [type]: updatedItems.filter((itemId) => itemId !== id),
        };
      } else {
        // Select the item
        updatedItems.push(id);
        return {
          ...prevState,
          [type]: updatedItems,
        };
      }
    });
  };

  const handleDeleteSelected = async () => {
    confirmAlert({
      title: "Confirm Deletion of all items selected",
      message: "Are you sure you want to delete theses items",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const deletePromises = [];

              selectedForDeletion.equipment.forEach((id) => {
                deletePromises.push(
                  deleteItem(import.meta.env.VITE_EQUIPMENTS_ENDPOINT, id)
                );
              });

              selectedForDeletion.accessories.forEach((id) => {
                deletePromises.push(
                  deleteItem(import.meta.env.VITE_ACCESORIES_ENDPOINT, id)
                );
              });

              await Promise.all(deletePromises);

              // After deletion, fetch data again
              const [equipmentsResponse, accessoriesResponse] =
                await Promise.all([
                  fetchAllItems(import.meta.env.VITE_EQUIPMENTS_ENDPOINT),
                  fetchAllItems(import.meta.env.VITE_ACCESORIES_ENDPOINT),
                ]);
              setEquipments(equipmentsResponse.payload);
              setAccessories(accessoriesResponse.payload);

              // Clear selection
              setSelectedForDeletion({ equipment: [], accessories: [] });
              setSelectionMode(false);
            } catch (error) {
              console.error("Error deleting items:", error);
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleDeleteItem = (type, id) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const endpoint =
                type === "equipment"
                  ? import.meta.env.VITE_EQUIPMENTS_ENDPOINT
                  : import.meta.env.VITE_ACCESORIES_ENDPOINT;
              await deleteItem(endpoint, id);

              // Refresh data
              const [equipmentsResponse, accessoriesResponse] =
                await Promise.all([
                  fetchAllItems(import.meta.env.VITE_EQUIPMENTS_ENDPOINT),
                  fetchAllItems(import.meta.env.VITE_ACCESORIES_ENDPOINT),
                ]);
              setEquipments(equipmentsResponse.payload);
              setAccessories(accessoriesResponse.payload);
            } catch (error) {
              console.error("Error deleting item:", error);
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div>
      <StyledButton onClick={handleToggleSelectionMode}>
        {selectionMode ? "Cancel Selection" : "Select Items for Deletion"}
      </StyledButton>

      {selectionMode && (
        <StyledButton onClick={handleDeleteSelected}>
          Delete Selected Items
        </StyledButton>
      )}

      <EquipmentWrapper>
        <h3>Equipments</h3>
        <div className="equipment-grid">
          {equipments.map((equipment) => (
            <EquipmentItem key={equipment.id}>
              {selectionMode && (
                <input
                  type="checkbox"
                  checked={selectedForDeletion.equipment.includes(equipment.id)}
                  onChange={() =>
                    handleSelectForDeletion("equipment", equipment.id)
                  }
                />
              )}
              <div>
                <h4>{equipment.name}</h4>
                <p>
                  <strong>Model:</strong> {equipment.model_number}
                </p>
                <p>
                  <strong>Brand:</strong> {equipment.brand}
                </p>
                <p>
                  <strong>Description:</strong> {equipment.description}
                </p>
                <p>
                  <strong>Price:</strong> ${equipment.price}
                </p>
              </div>
              {!selectionMode && (
                <>
                  <StyledButton
                    onClick={() => handleDeleteItem("equipment", equipment.id)}
                  >
                    Delete
                  </StyledButton>
                </>
              )}
            </EquipmentItem>
          ))}
        </div>
      </EquipmentWrapper>

      <AccesoryWrapper>
        <h3>Accessories</h3>
        <div className="accessory-grid">
          {accessories.map((accessory) => (
            <AccesoryItem key={accessory.id}>
              {selectionMode && (
                <input
                  type="checkbox"
                  checked={selectedForDeletion.accessories.includes(
                    accessory.id
                  )}
                  onChange={() =>
                    handleSelectForDeletion("accessories", accessory.id)
                  }
                />
              )}
              <div>
                <h4>{accessory.name}</h4>
                <p>
                  <strong>Description:</strong> {accessory.description}
                </p>
                <p>
                  <strong>Price:</strong> ${accessory.price}
                </p>
              </div>
              {!selectionMode && (
                <>
                  <StyledButton
                    onClick={() =>
                      handleDeleteItem("accessories", accessory.id)
                    }
                  >
                    Delete
                  </StyledButton>
                </>
              )}
            </AccesoryItem>
          ))}
        </div>
      </AccesoryWrapper>
    </div>
  );
}

export default AccesoriesAndEquipments;
