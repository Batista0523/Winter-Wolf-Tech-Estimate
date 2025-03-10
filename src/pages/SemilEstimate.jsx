import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../AuthContext";
import { fetchAllItems, createItem, fetchOneItem } from "../helpers/ApiCalls";
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
  LoadingOverlay, // new
  Spinner, // new
} from "../style/SemiEstimateStyled";
import { useParams } from "react-router-dom";
import { StyledLink } from "../style/FinalEstimateStyled";

function SemiEstimate() {
  // -------------------- State Declarations --------------------
  const { currentUser: user } = useAuth();
  const equipmentEndPoint = import.meta.env.VITE_EQUIPMENTS_ENDPOINT;
  const accessoryEndPoint = import.meta.env.VITE_ACCESORIES_ENDPOINT;
  const estimateEndPoint = import.meta.env.VITE_ESTIMATE_ENDPOINT;
  const finalEstimateEndPoint = import.meta.env.VITE_FINAL_ESTIMATE_ENDPOINT;

  const [equipments, setEquipments] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [locations, setLocations] = useState([
    {
      floorName: "First Floor",
      rooms: [{ roomName: "Room 1", equipment: [], accessories: [] }],
    },
  ]);
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [laborHours, setLaborHours] = useState("");
  const [marketCap, setMarketCap] = useState(
    () => localStorage.getItem("marketCap") || ""
  );
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAccessory, setIsAccessory] = useState(false);
  const [estimate, setEstimate] = useState(null);
  const [finalEstimate, setFinalEstimate] = useState(null);
  const [activeFloorIndex, setActiveFloorIndex] = useState(0);
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [isCreating, setIsCreating] = useState(false); // new state
  const [searchTerm, setSearchTerm] = useState("");
  const summaryRef = useRef(null);
  const { id } = useParams();

  // -------------------- Data Fetching and Initialization --------------------
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

      // Load saved estimate progress if available
      const savedEstimate = localStorage.getItem("estimateProgress");
      if (savedEstimate) {
        const estimateData = JSON.parse(savedEstimate);
        setClientName(estimateData.clientName || "");
        setClientAddress(estimateData.clientAddress || "");
        setClientPhone(estimateData.clientPhone || "");
        setLocations(estimateData.locations || []);
        setLaborHours(estimateData.laborHours || "");
        // setMarketCap(estimateData.marketCap || "");
      }
    };

    fetchData();
  }, [equipmentEndPoint, accessoryEndPoint]);

  useEffect(() => {
    // Optionally update marketCap if it might change while the component is mounted
    const storedMarketCap = localStorage.getItem("marketCap");
    if (storedMarketCap) {
      setMarketCap(storedMarketCap);
    }
  }, []);

  // -------------------- Item Selection and Filtering --------------------
  // Handle when an item is selected from the list
  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setQuantity(1); // Initialize quantity
  };
  // Handle cancel selection
  const handleCancelSelection = () => {
    setSelectedItem(null);
    setQuantity(1);
  };

  // Compute the filtered and alphabetically sorted list based on search term
  const filteredItems = (isAccessory ? accessories : equipments)
    .filter((item) => {
      // Check if item.name and item.model_number are defined and are strings before calling toLowerCase
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

  // -------------------- Adding Items to Room --------------------
  // Handle adding the selected item to the current room
  const handleAddItem = () => {
    const updatedLocations = [...locations];
    const currentRoom =
      updatedLocations[activeFloorIndex].rooms[activeRoomIndex];
    const itemList = isAccessory
      ? currentRoom.accessories
      : currentRoom.equipment;

    const existingItem = itemList.find((it) => it.id === selectedItem.id);
    if (existingItem) {
      existingItem.quantity += quantity; // Add to the quantity of existing items
    } else {
      itemList.push({ ...selectedItem, quantity }); // Add new item
    }

    setLocations(updatedLocations);
    setSelectedItem(null);
    alert(`${quantity} ${selectedItem.name} added to ${currentRoom.roomName}`);
  };

  // -------------------- Managing Floors and Rooms --------------------
  // Handle adding a new room to a given floor
  const handleAddRoom = (floorIndex) => {
    const updatedLocations = [...locations];
    updatedLocations[floorIndex].rooms.push({
      roomName: `Room ${updatedLocations[floorIndex].rooms.length + 1}`,
      equipment: [],
      accessories: [],
    });
    setLocations(updatedLocations);
  };

  // Handle adding a new floor to the estimate
  const handleAddFloor = () => {
    setLocations([
      ...locations,
      {
        floorName: `Floor ${locations.length + 1}`,
        rooms: [{ roomName: "Room 1", equipment: [], accessories: [] }],
      },
    ]);
  };
  // Removal functions added inside your SemiEstimate component
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
    // Optionally, user could check that there is more than one room
    updatedLocations[floorIndex].rooms.splice(roomIndex, 1);
    setLocations(updatedLocations);
  };

  const handleRemoveFloor = (floorIndex) => {
    const updatedLocations = [...locations];
    // Optionally, check if user want at least one floor remaining
    updatedLocations.splice(floorIndex, 1);
    setLocations(updatedLocations);
  };

  // -------------------- Creating and Saving the Estimate --------------------
  // Handle the creation of the estimate by preparing data and sending it to the backend
  const handleCreateEstimate = async () => {
    setIsCreating(true); // show loading overlay

    const equipmentItems = [];
    const accessoryItems = [];

    // Helper function to find and update existing items
    const updateOrAddItem = (itemsArray, itemToAdd) => {
      const existingItem = itemsArray.find((item) => item.id === itemToAdd.id);
      if (existingItem) {
        existingItem.quantity += itemToAdd.quantity;
      } else {
        itemsArray.push(itemToAdd);
      }
    };

    // Iterate over each floor and room to gather all equipment and accessories
    locations.forEach((floor) => {
      floor.rooms.forEach((room) => {
        room.equipment.forEach((eq) => {
          updateOrAddItem(equipmentItems, { id: eq.id, quantity: eq.quantity });
        });
        room.accessories.forEach((acc) => {
          updateOrAddItem(accessoryItems, {
            id: acc.id,
            quantity: acc.quantity,
          });
        });
      });
    });

    // Prepare the estimate data with client details, collected items, and locations for the estimate data base
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

    // Send all the equipment and accessory data to the backend
    const estimateResponse = await createItem(estimateEndPoint, {
      estimateData,
      equipmentItems,
      accessoryItems,
    });

    if (estimateResponse.success) {
      localStorage.removeItem("estimateProgress");
      const estimateId = estimateResponse.payload.estimateId;
      if (estimateId) {
        const [estimateData, finalEstimateData] = await Promise.all([
          fetchOneItem(estimateEndPoint, estimateId),
          fetchOneItem(finalEstimateEndPoint, estimateId),
        ]);
        setEstimate(estimateData.payload);
        setFinalEstimate(finalEstimateData.payload);
      }
    }
    // Wait 2 seconds before hiding the loading overlay
    setTimeout(() => {
      setIsCreating(false);
      if (summaryRef.current) {
        summaryRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 2000);
  };

  // Handle saving the current estimate progress to localStorage
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

  // -------------------- Return JSX (UI Layout) --------------------
  return (
    <SemiEstimateContainer>
      <Title>Create a New Estimate</Title>
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
                  <RemoveIcon
                    onClick={() => handleRemoveRoom(floorIndex, roomIndex)}
                  >
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
                          handleRemoveItem(
                            floorIndex,
                            roomIndex,
                            eq.id,
                            "equipment"
                          )
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
                          handleRemoveItem(
                            floorIndex,
                            roomIndex,
                            acc.id,
                            "accessory"
                          )
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
            onFocus={(e) => {
              if (e.target.value === floor.floorName) {
                e.target.value = "";
              }
            }}
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
                onFocus={(e) => {
                  if (e.target.value === room.roomName) {
                    e.target.value = ""; // Clear the input field if it's the placeholder text
                  }
                }}
                onChange={(e) => {
                  const updatedLocations = [...locations];
                  updatedLocations[floorIndex].rooms[roomIndex].roomName =
                    e.target.value;
                  setLocations(updatedLocations);
                }}
              />

              {/* Highlight the currently active room */}
              <StyledButton
                style={{
                  backgroundColor:
                    activeFloorIndex === floorIndex &&
                    activeRoomIndex === roomIndex
                      ? "#4CAF50"
                      : "#ccc",
                }}
                onClick={() => {
                  setActiveFloorIndex(floorIndex);
                  setActiveRoomIndex(roomIndex);
                }}
              >
                {activeFloorIndex === floorIndex &&
                activeRoomIndex === roomIndex
                  ? `You are adding items to ${room.roomName}`
                  : `Click here to add items to ${room.roomName}`}
              </StyledButton>
            </div>
          ))}
          <StyledButton onClick={() => handleAddRoom(floorIndex)}>
            <span>{`Add Room to ${floor.floorName}`}</span>
          </StyledButton>
        </div>
      ))}

      <StyledButton onClick={handleAddFloor}>Add Floor</StyledButton>
      {/* Selection of Equipment and Accessories */}
      <StyledButton
        $active={!isAccessory}
        onClick={() => setIsAccessory(false)}
      >
        Equipment
      </StyledButton>
      <StyledButton $active={isAccessory} onClick={() => setIsAccessory(true)}>
        Accessories
      </StyledButton>
      {/* User can search for equipements and accesories based on their query */}
      <SearchBar
        type="text"
        placeholder={
          isAccessory ? "Searching Accesories" : "Searching Equipments"
        }
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* List of items */}
      <ItemListContainer>
        {filteredItems.map((item) => (
          <ListItem key={item.id} onClick={() => handleSelectItem(item)}>
            <strong>{item.model_number}</strong>
            <br />
            <span style={{ color: "#555", fontSize: "0.9rem" }}>
              {item.name}
            </span>
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
            <StyledButton
              style={{ margin: "20px" }}
              onClick={handleCancelSelection}
            >
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

      <StyledButton onClick={handleCreateEstimate}>
        Create Estimate
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
          {/*will use Number().toLocalString to  add ',' for each 000 example 1000 ---> 1,000 */}
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
            <strong>Total Cost:</strong>
            {Number(finalEstimate.total_cost).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            <StyledLink to={`/estimates`}> Go to Estimates Page</StyledLink>
          </SummaryItem>
        </SummarySection>
      )}

      {/* Loading overlay when creating estimate */}
      {isCreating && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}
    </SemiEstimateContainer>
  );
}

export default SemiEstimate;
