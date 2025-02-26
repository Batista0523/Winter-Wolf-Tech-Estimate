import React, { useEffect, useState } from "react";
import { fetchAllItems, fetchOneItem, updateItem } from "../helpers/ApiCalls";
import {
  SemiEstimateContainer,
  Title,
  TextInput,
  NumberInput,
  ItemListContainer,
  SelectedItemContainer,
  SelectionButton,
  AddItemButton,
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

function UpdateEstimate() {
  const { id } = useParams();
  const [estimate, setEstimate] = useState(null);
  const [locations, setLocations] = useState([]);
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [laborHours, setLaborHours] = useState("");
  const [marketCap, setMarketCap] = useState("");
  const [equipmentSearchQuery, setEquipmentSearchQuery] = useState("");
  const [availableEquipment, setAvailableEquipment] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);

  const endpointForEstimate = import.meta.env.VITE_ESTIMATE_ENDPOINT;
  const endpointForEquipments = import.meta.env.VITE_EQUIPMENTS_ENDPOINT;

  useEffect(() => {
    const fetchEstimateData = async () => {
      try {
        const estimateData = await fetchOneItem(endpointForEstimate, id);
        if (estimateData.success) {
          const {
            client_name,
            client_address,
            client_phone,
            labor_hours,
            market_cap,
            details,
          } = estimateData.payload;
          setEstimate(estimateData.payload);
          setClientName(client_name);
          setClientAddress(client_address);
          setClientPhone(client_phone);
          setLaborHours(labor_hours);
          setMarketCap(market_cap);
          setLocations(details.floors || []);
        } else {
          console.log("Error fetching estimate", estimateData);
        }
      } catch (err) {
        console.log("Internal error fetching estimate data", err);
      }
    };

    fetchEstimateData();
  }, [id]);

  const handleUpdateEstimate = async () => {
    setIsUpdating(true);

    const updatedEstimate = {
      client_name: clientName,
      client_address: clientAddress,
      client_phone: clientPhone,
      labor_hours: Number(laborHours),
      labor_rate: 68, // Fixed labor rate
      tax_rate: 0.08875, // Fixed tax rate
      market_cap: parseFloat(marketCap).toFixed(2),
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

    try {
      const updateResponse = await updateItem(endpointForEstimate, id, {
        estimateData: updatedEstimate,
      });
      if (updateResponse.success) {
        alert("Estimate updated successfully");
      } else {
        console.log("Error updating estimate", updateResponse);
      }
    } catch (err) {
      console.log("Internal error updating estimate", err);
    }

    setIsUpdating(false);
  };

  // Fetch available equipment based on search query
  const handleSearchEquipment = async (query) => {
    setLoading(true);
    try {
      const response = await fetchAllItems(endpointForEquipments, query);
      if (response.success) {
        setAvailableEquipment(response.payload); // Assuming the response contains an array of equipment
      } else {
        console.log("Error fetching equipment", response);
      }
    } catch (err) {
      console.log("Internal error searching equipment", err);
    }
    setLoading(false);
  };

  const handleEquipmentChange = async (
    e,
    floorIndex,
    roomIndex,
    equipmentIndex
  ) => {
    const equipmentName = e.target.value;
    const updatedLocations = [...locations];

    // Update the equipment name as the user types
    updatedLocations[floorIndex].rooms[roomIndex].equipment[
      equipmentIndex
    ].name = equipmentName;
    setLocations(updatedLocations);

    // Fetch the equipment models based on the equipment name
    if (equipmentName.trim()) {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PRODUCTION_URL}/${
            import.meta.env.VITE_EQUIPMENTS_ENDPOINT
          }?query=${equipmentName}`
        );
        const data = await response.json();
        if (data.success) {
          setAvailableEquipment(data.payload); // Update with the fetched models
        } else {
          console.log("Error fetching equipment models:", data);
        }
      } catch (err) {
        console.log("Internal error fetching equipment models", err);
      }
      setLoading(false);
    } else {
      setAvailableEquipment([]); // Clear suggestions if the input is empty
    }
  };

  const handleQuantityChange = (
    e,
    floorIndex,
    roomIndex,
    equipmentIndex,
    isAccessory = false
  ) => {
    const updatedLocations = [...locations];
    if (isAccessory) {
      updatedLocations[floorIndex].rooms[roomIndex].accessories[
        equipmentIndex
      ].quantity = e.target.value;
    } else {
      updatedLocations[floorIndex].rooms[roomIndex].equipment[
        equipmentIndex
      ].quantity = e.target.value;
    }
    setLocations(updatedLocations);
  };

  return (
    <SemiEstimateContainer>
      <Title>Page Under Construction - More Update Are Coming Soon</Title>
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
      <NumberInput
        type="number"
        placeholder="Labor Hours"
        value={laborHours}
        onChange={(e) => setLaborHours(e.target.value)}
      />
      <NumberInput
        type="number"
        placeholder="Market Cap"
        value={marketCap}
        onChange={(e) => setMarketCap(e.target.value)}
      />

      {/* Search Bar for Equipment */}
      <SearchBar
        type="text"
        value={equipmentSearchQuery}
        onChange={(e) => {
          setEquipmentSearchQuery(e.target.value);
          handleSearchEquipment(e.target.value); // Trigger search on change
        }}
        placeholder="Search Equipment"
      />

      {/* Display available equipment based on search query */}
      {loading ? (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      ) : (
        <div>
          {availableEquipment.length > 0 && (
            <ItemListContainer>
              {availableEquipment.map((equipment, index) => (
                <ListItem
                  key={index}
                  onClick={() => setEquipmentSearchQuery(equipment.name)}
                >
                  {equipment.name}
                </ListItem>
              ))}
            </ItemListContainer>
          )}
        </div>
      )}

      {/* Display for Floors, Rooms, and Items */}
      <DisplaySquare>
        {locations.map((floor, floorIndex) => (
          <div key={floorIndex} className="floor-container">
            <TitleWithRemove>
              <TextInput
                type="text"
                value={floor.floorName}
                onChange={(e) => handleFloorChange(e, floorIndex)}
                placeholder="Floor Name"
              />
            </TitleWithRemove>
            {floor.rooms.map((room, roomIndex) => (
              <div key={roomIndex} className="room-container">
                <TitleWithRemove as="h4">
                  <TextInput
                    type="text"
                    value={room.roomName}
                    onChange={(e) => handleRoomChange(e, floorIndex, roomIndex)}
                    placeholder="Room Name"
                  />
                </TitleWithRemove>
                <ItemListContainer>
                  {room.equipment.map((item, itemIndex) => (
                    <ListItem key={item.id || itemIndex}>
                      <TextInput
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          handleEquipmentChange(
                            e,
                            floorIndex,
                            roomIndex,
                            itemIndex
                          )
                        }
                        placeholder="Equipment Name"
                      />
                      <NumberInput
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            e,
                            floorIndex,
                            roomIndex,
                            itemIndex
                          )
                        }
                        placeholder="Quantity"
                      />
                    </ListItem>
                  ))}
                  {room.accessories.map((item, accIndex) => (
                    <ListItem key={item.id || accIndex}>
                      <TextInput
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          handleEquipmentChange(
                            e,
                            floorIndex,
                            roomIndex,
                            accIndex,
                            true
                          )
                        }
                        placeholder="Accessory Name"
                      />
                      <NumberInput
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            e,
                            floorIndex,
                            roomIndex,
                            accIndex,
                            true
                          )
                        }
                        placeholder="Quantity"
                      />
                    </ListItem>
                  ))}
                </ItemListContainer>
              </div>
            ))}
          </div>
        ))}
      </DisplaySquare>

      {/* <StyledButton onClick={handleUpdateEstimate} disabled={isUpdating}>
        {isUpdating ? "Updating..." : "Update Estimate "}
      </StyledButton> */}
      <p>
        The update functionality has been completed; however, I am currently
        working on the input fields to ensure all necessary information is
        properly updated in the estimate. As a result, the 'Update Estimate'
        button has been temporarily disabled..
      </p>
      <StyledButton>Update estimate </StyledButton>
    </SemiEstimateContainer>
  );
}

export default UpdateEstimate;
