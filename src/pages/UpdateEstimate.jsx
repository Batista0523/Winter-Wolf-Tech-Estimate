import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../AuthContext";
import { fetchAllItems, updateItem, fetchOneItem } from "../helpers/ApiCalls";
import {
  SemiEstimateContainer,
  Title,
  TextInput,
  NumberInput,
  ItemListContainer,
  SelectedItemContainer,
  StyledButton,
  SummarySection,
  SummaryItem,
  OverlayContainer,
  DisplaySquare,
  InputRow,
  NumberInput2,
  ListItem,
  RemoveIcon,
  ListItemContainer,
  TitleWithRemove,
  SearchBar,
  LoadingOverlay,
  Spinner,
} from "../style/SemiEstimateStyled";
import { useParams } from "react-router-dom";
import { StyledLink } from "../style/FinalEstimateStyled";

function UpdateEstimate() {
  const { currentUser: user } = useAuth();
  const { id } = useParams();

  const equipmentEndPoint = import.meta.env.VITE_EQUIPMENTS_ENDPOINT;
  const accessoryEndPoint = import.meta.env.VITE_ACCESORIES_ENDPOINT;
  const estimateEndPoint = import.meta.env.VITE_ESTIMATE_ENDPOINT;
  const finalEstimateEndPoint = import.meta.env.VITE_FINAL_ESTIMATE_ENDPOINT;

  // -------------------- State Declarations --------------------
  const [equipments, setEquipments] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [laborHours, setLaborHours] = useState("");
  const [marketCap, setMarketCap] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAccessory, setIsAccessory] = useState(false);
  const [estimate, setEstimate] = useState(null);
  const [finalEstimate, setFinalEstimate] = useState(null);
  const [activeFloorIndex, setActiveFloorIndex] = useState(0);
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const summaryRef = useRef(null);

  // -------------------- Data Fetching --------------------
  // Fetch available equipments and accessories
  useEffect(() => {
    const fetchData = async () => {
      const [equipmentsResponse, accessoriesResponse] = await Promise.all([
        fetchAllItems(equipmentEndPoint),
        fetchAllItems(accessoryEndPoint),
      ]);
      if (equipmentsResponse.success && accessoriesResponse.success) {
        setEquipments(equipmentsResponse.payload);
        setAccessories(accessoriesResponse.payload);
      }
    };
    fetchData();
  }, [equipmentEndPoint, accessoryEndPoint]);

  // Fetch the existing estimate details for update
  useEffect(() => {
    const fetchEstimateData = async () => {
      const response = await fetchOneItem(estimateEndPoint, id);
      if (response.success) {
        const {
          client_name,
          client_address,
          client_phone,
          labor_hours,
          market_cap,
          details,
        } = response.payload;
        setClientName(client_name);
        setClientAddress(client_address);
        setClientPhone(client_phone);
        setLaborHours(labor_hours);
        setMarketCap(market_cap);
        setLocations(details.floors || []);
        setEstimate(response.payload);
      } else {
        console.error("Error fetching estimate data", response);
      }
    };
    fetchEstimateData();
  }, [estimateEndPoint, id]);

  // -------------------- Item Selection and Filtering --------------------
  const filteredItems = (isAccessory ? accessories : equipments)
    .filter((item) => {
      const nameMatch =
        item.name && typeof item.name === "string"
          ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
          : false;
      const modelMatch =
        item.model_number && typeof item.model_number === "string"
          ? item.model_number.toLowerCase().includes(searchTerm.toLowerCase())
          : false;
      return nameMatch || modelMatch;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setQuantity(1);
  };

  const handleCancelSelection = () => {
    setSelectedItem(null);
    setQuantity(1);
  };

  // -------------------- Adding Items to Room --------------------
  const handleAddItem = () => {
    if (!selectedItem) return;
    const updatedLocations = [...locations];
    const currentRoom =
      updatedLocations[activeFloorIndex].rooms[activeRoomIndex];
    const itemList = isAccessory ? currentRoom.accessories : currentRoom.equipment;
    const existingItem = itemList.find((it) => it.id === selectedItem.id);
    if (existingItem) {
      existingItem.quantity = Number(existingItem.quantity) + Number(quantity);
    } else {
      itemList.push({ ...selectedItem, quantity });
    }
    setLocations(updatedLocations);
    setSelectedItem(null);
    alert(`${quantity} ${selectedItem.name} added to ${currentRoom.roomName}`);
  };

  // -------------------- Managing Floors and Rooms --------------------
  const handleAddRoom = (floorIndex) => {
    const updatedLocations = [...locations];
    updatedLocations[floorIndex].rooms.push({
      roomName: `Room ${updatedLocations[floorIndex].rooms.length + 1}`,
      equipment: [],
      accessories: [],
    });
    setLocations(updatedLocations);
  };

  const handleAddFloor = () => {
    setLocations([
      ...locations,
      {
        floorName: `Floor ${locations.length + 1}`,
        rooms: [{ roomName: "Room 1", equipment: [], accessories: [] }],
      },
    ]);
  };

  const handleRemoveItem = (floorIndex, roomIndex, itemId, itemType) => {
    const updatedLocations = [...locations];
    const room = updatedLocations[floorIndex].rooms[roomIndex];
    if (itemType === "equipment") {
      room.equipment = room.equipment.filter((item) => item.id !== itemId);
    } else if (itemType === "accessory") {
      room.accessories = room.accessories.filter((item) => item.id !== itemId);
    }
    setLocations(updatedLocations);
  };

  const handleRemoveRoom = (floorIndex, roomIndex) => {
    const updatedLocations = [...locations];
    updatedLocations[floorIndex].rooms.splice(roomIndex, 1);
    setLocations(updatedLocations);
  };

  const handleRemoveFloor = (floorIndex) => {
    const updatedLocations = [...locations];
    updatedLocations.splice(floorIndex, 1);
    setLocations(updatedLocations);
  };

  // -------------------- Updating the Estimate --------------------
  const handleUpdateEstimate = async () => {
    setIsUpdating(true);

    // Prepare equipmentItems and accessoryItems arrays from locations
    const equipmentItems = [];
    const accessoryItems = [];
    locations.forEach((floor) => {
      floor.rooms.forEach((room) => {
        room.equipment.forEach((eq) => {
          const existing = equipmentItems.find((item) => item.id === eq.id);
          if (existing) {
            existing.quantity += eq.quantity;
          } else {
            equipmentItems.push({ id: eq.id, quantity: eq.quantity });
          }
        });
        room.accessories.forEach((acc) => {
          const existing = accessoryItems.find((item) => item.id === acc.id);
          if (existing) {
            existing.quantity += acc.quantity;
          } else {
            accessoryItems.push({ id: acc.id, quantity: acc.quantity });
          }
        });
      });
    });

    // Prepare updated estimate data payload
    const estimateData = {
      client_name: clientName,
      client_address: clientAddress,
      client_phone: clientPhone,
      labor_hours: Number(laborHours),
      labor_rate: 68, // fixed labor rate
      tax_rate: 0.08875, // fixed tax rate
      market_cap: parseFloat(marketCap).toFixed(2),
      user_id: user?.id || 1,
      details: {
        floors: locations.map((floor) => ({
          floor_name: floor.floorName,
          rooms: floor.rooms.map((room) => ({
            room_name: room.roomName,
            equipment: room.equipment.map((eq) => ({
              name: eq.name,
              quantity: eq.quantity,
            })),
            accessories: room.accessories.map((acc) => ({
              name: acc.name,
              quantity: acc.quantity,
            })),
          })),
        })),
      },
    };

    // Call the updateItem helper (which performs a PUT request)
    const updateResponse = await updateItem(estimateEndPoint, id, {
      estimateData,
      equipmentItems,
      accessoryItems,
    });

    if (updateResponse.success) {
      // After a successful update, refetch the updated estimate and final estimate details
      const [updatedEstimateResponse, finalEstimateResponse] = await Promise.all([
        fetchOneItem(estimateEndPoint, id),
        fetchOneItem(finalEstimateEndPoint, id),
      ]);
      if (updatedEstimateResponse.success && finalEstimateResponse.success) {
        setEstimate(updatedEstimateResponse.payload);
        setFinalEstimate(finalEstimateResponse.payload);
        alert("Estimate updated successfully!");
      } else {
        console.error("Error fetching updated estimate data");
      }
    } else {
      console.error("Error updating estimate", updateResponse);
    }
    setIsUpdating(false);
  };

  // -------------------- Saving Progress --------------------
  const saveEstimateProgress = () => {
    const estimateProgress = {
      clientName,
      clientAddress,
      clientPhone,
      locations,
      laborHours,
      marketCap,
    };
    localStorage.setItem("estimateProgress", JSON.stringify(estimateProgress));
    alert("Estimate progress has been saved!");
  };

  // -------------------- Render JSX --------------------
  return (
    <SemiEstimateContainer>
      <Title>Update Estimate</Title>
      <TextInput
        type="text"
        placeholder="Client Name"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
      />
      <TextInput
        type="text"
        placeholder="Client Address"
        value={clientAddress}
        onChange={(e) => setClientAddress(e.target.value)}
      />
      <TextInput
        type="text"
        placeholder="Client Phone"
        value={clientPhone}
        onChange={(e) => setClientPhone(e.target.value)}
      />

      {/* Display for Floors, Rooms, and Items */}
      <DisplaySquare>
        {locations.map((floor, floorIndex) => (
          <div key={floorIndex} className="floor-container">
            <TitleWithRemove>
              {floor.floorName}
              <RemoveIcon onClick={() => handleRemoveFloor(floorIndex)}>
                ×
              </RemoveIcon>
            </TitleWithRemove>
            {floor.rooms.map((room, roomIndex) => (
              <div key={roomIndex} className="room-container">
                <TitleWithRemove as="h4">
                  {room.roomName}
                  <RemoveIcon onClick={() => handleRemoveRoom(floorIndex, roomIndex)}>
                    ×
                  </RemoveIcon>
                </TitleWithRemove>
                <ul>
                  {room.equipment.length > 0 && <h5>Equipment:</h5>}
                  {room.equipment.map((eq) => (
                    <ListItemContainer key={eq.id}>
                      {`${eq.name} ${eq.brand} (${eq.quantity} pcs)`}
                      <RemoveIcon
                        onClick={() =>
                          handleRemoveItem(floorIndex, roomIndex, eq.id, "equipment")
                        }
                      >
                        ×
                      </RemoveIcon>
                    </ListItemContainer>
                  ))}
                  {room.accessories.length > 0 && <h5>Accessories:</h5>}
                  {room.accessories.map((acc) => (
                    <ListItemContainer key={acc.id}>
                      {`${acc.name}: ${acc.quantity} pcs`}
                      <RemoveIcon
                        onClick={() =>
                          handleRemoveItem(floorIndex, roomIndex, acc.id, "accessory")
                        }
                      >
                        ×
                      </RemoveIcon>
                    </ListItemContainer>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </DisplaySquare>

      {locations.map((floor, floorIndex) => (
        <div key={floorIndex}>
          <TextInput
            type="text"
            placeholder={`Floor ${floorIndex + 1} Name`}
            value={floor.floorName}
            onChange={(e) => {
              const updatedLocations = [...locations];
              updatedLocations[floorIndex].floorName = e.target.value;
              setLocations(updatedLocations);
            }}
          />
          {floor.rooms.map((room, roomIndex) => (
            <div key={roomIndex}>
              <TextInput
                type="text"
                placeholder={`Room ${roomIndex + 1} Name`}
                value={room.roomName}
                onChange={(e) => {
                  const updatedLocations = [...locations];
                  updatedLocations[floorIndex].rooms[roomIndex].roomName = e.target.value;
                  setLocations(updatedLocations);
                }}
              />
              <StyledButton
                style={{
                  backgroundColor:
                    activeFloorIndex === floorIndex && activeRoomIndex === roomIndex
                      ? "#4CAF50"
                      : "#ccc",
                }}
                onClick={() => {
                  setActiveFloorIndex(floorIndex);
                  setActiveRoomIndex(roomIndex);
                }}
              >
                {activeFloorIndex === floorIndex && activeRoomIndex === roomIndex
                  ? `You are adding items to ${room.roomName}`
                  : `Click here to add items to ${room.roomName}`}
              </StyledButton>
            </div>
          ))}
          <StyledButton onClick={() => handleAddRoom(floorIndex)}>
            {`Add Room to ${floor.floorName}`}
          </StyledButton>
        </div>
      ))}

      <StyledButton onClick={handleAddFloor}>Add Floor</StyledButton>

      {/* Selection of Equipment and Accessories */}
      <StyledButton $active={!isAccessory} onClick={() => setIsAccessory(false)}>
        Equipment
      </StyledButton>
      <StyledButton $active={isAccessory} onClick={() => setIsAccessory(true)}>
        Accessories
      </StyledButton>
      <SearchBar
        type="text"
        placeholder={isAccessory ? "Searching Accessories" : "Searching Equipments"}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ItemListContainer>
        {filteredItems.map((item) => (
          <ListItem key={item.id} onClick={() => handleSelectItem(item)}>
            <strong>{item.model_number}</strong>
            <br />
            <span style={{ color: "#555", fontSize: "0.9rem" }}>{item.name}</span>
          </ListItem>
        ))}
      </ItemListContainer>

      {selectedItem && (
        <OverlayContainer>
          <SelectedItemContainer>
            <p>Selected Item: {selectedItem.name}</p>
            <NumberInput2
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
            />
            <StyledButton onClick={handleAddItem}>
              Add {isAccessory ? "Accessory" : "Equipment"}
            </StyledButton>
            <StyledButton style={{ margin: "20px" }} onClick={handleCancelSelection}>
              Cancel
            </StyledButton>
          </SelectedItemContainer>
        </OverlayContainer>
      )}

      <InputRow>
        <NumberInput
          type="number"
          placeholder="Labor Hours"
          value={laborHours}
          onChange={(e) => setLaborHours(e.target.value)}
        />
      </InputRow>

      <StyledButton onClick={saveEstimateProgress}>Save Progress</StyledButton>
      <StyledButton onClick={handleUpdateEstimate} disabled={isUpdating}>
        {isUpdating ? "Updating..." : "Update Estimate"}
      </StyledButton>

      {estimate && finalEstimate && (
        <SummarySection ref={summaryRef}>
          <h2>Estimate Summary</h2>
          <SummaryItem>
            <strong>Client Name:</strong> {estimate.client_name}
          </SummaryItem>
          <SummaryItem>
            <strong>Client Address:</strong> {estimate.client_address}
          </SummaryItem>
          <SummaryItem>
            <strong>Client Phone:</strong> {estimate.client_phone}
          </SummaryItem>
          <SummaryItem>
            <strong>Equipment Cost:</strong>{" "}
            {Number(finalEstimate.equipment_cost).toLocaleString("es-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </SummaryItem>
          <SummaryItem>
            <strong>Accessories Cost:</strong>{" "}
            {Number(finalEstimate.accessories_cost).toLocaleString("es-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </SummaryItem>
          <SummaryItem>
            <strong>Tax:</strong>{" "}
            {Number(finalEstimate.tax).toLocaleString("es-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </SummaryItem>
          <SummaryItem>
            <strong>Labor Cost:</strong>{" "}
            {Number(finalEstimate.labor_cost).toLocaleString("es-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </SummaryItem>
          <SummaryItem>
            <strong>Subtotal:</strong>{" "}
            {Number(finalEstimate.subtotal).toLocaleString("es-US", {
              maximumFractionDigits: 2,
              minimumIntegerDigits: 2,
            })}
          </SummaryItem>
          <SummaryItem>
            <strong>M/C:</strong>{" "}
            {Number(estimate.market_cap).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </SummaryItem>
          <SummaryItem>
            <strong>Total Cost:</strong>{" "}
            {Number(finalEstimate.total_cost).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            <StyledLink to={`/estimates`}> Go to Estimates Page</StyledLink>
          </SummaryItem>
        </SummarySection>
      )}

      {isUpdating && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}
    </SemiEstimateContainer>
  );
}

export default UpdateEstimate;
