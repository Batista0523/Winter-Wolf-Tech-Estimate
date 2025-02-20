// import React, { useState, useEffect } from "react";
// import { useAuth } from "../AuthContext";
// import { fetchAllItems, createItem, fetchOneItem } from "../helpers/ApiCalls";
// import {
//   SemiEstimateContainer,
//   Title,
//   TextInput,
//   NumberInput,
//   ItemListContainer,
//   ItemButton,
//   SelectedItemContainer,
//   SelectionButton,
//   AddItemButton,
//   StyledButton,
//   SummarySection,
//   SummaryItem,
//   OverlayContainer,
//   DisplaySquare,
//   InputRow,
//   NumberInput2,
// } from "../style/SemiEstimateStyled";
// import {  useParams } from "react-router-dom";
// import { StyledLink } from "../style/FinalEstimateStyled";

// function SemiEstimate() {
//   const { currentUser: user } = useAuth();
//   const equipmentEndPoint = import.meta.env.VITE_EQUIPMENTS_ENDPOINT;
//   const accessoryEndPoint = import.meta.env.VITE_ACCESORIES_ENDPOINT;
//   const estimateEndPoint = import.meta.env.VITE_ESTIMATE_ENDPOINT;
//   const finalEstimateEndPoint = import.meta.env.VITE_FINAL_ESTIMATE_ENDPOINT;

//   const [equipments, setEquipments] = useState([]);
//   const [accessories, setAccessories] = useState([]);
//   const [locations, setLocations] = useState([
//     {
//       floorName: "First Floor",
//       rooms: [{ roomName: "Room 1", equipment: [], accessories: [] }],
//     },
//   ]);
//   const [clientName, setClientName] = useState("");
//   const [clientAddress, setClientAddress] = useState("");
//   const [clientPhone, setClientPhone] = useState("");
//   const [laborHours, setLaborHours] = useState("");
//   const [marketCap, setMarketCap] = useState("");
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [isAccessory, setIsAccessory] = useState(false);
//   const [estimate, setEstimate] = useState(null);
//   const [finalEstimate, setFinalEstimate] = useState(null);
//   const [activeFloorIndex, setActiveFloorIndex] = useState(0);
//   const [activeRoomIndex, setActiveRoomIndex] = useState(0);

//   const { id } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       const [equipmentsResponse, accessoriesResponse] = await Promise.all([
//         fetchAllItems(equipmentEndPoint),
//         fetchAllItems(accessoryEndPoint),
//       ]);
//       if (equipmentsResponse.success && accessoriesResponse.success) {
//         setEquipments(equipmentsResponse.payload);
//         setAccessories(accessoriesResponse.payload);
//       }

//       // Load saved estimate progress if available
//       const savedEstimate = localStorage.getItem("estimateProgress");
//       if (savedEstimate) {
//         const estimateData = JSON.parse(savedEstimate);
//         setClientName(estimateData.clientName || "");
//         setClientAddress(estimateData.clientAddress || "");
//         setClientPhone(estimateData.clientPhone || "");
//         setLocations(estimateData.locations || []);
//         setLaborHours(estimateData.laborHours || "");
//         setMarketCap(estimateData.marketCap || "");
//       }
//     };

//     fetchData();
//   }, [equipmentEndPoint, accessoryEndPoint]);

//   const handleSelectItem = (item) => {
//     setSelectedItem(item);
//     setQuantity(1); // Initialize quantity
//   };

//   const handleAddItem = () => {
//     const updatedLocations = [...locations];
//     const currentRoom =
//       updatedLocations[activeFloorIndex].rooms[activeRoomIndex];
//     const itemList = isAccessory
//       ? currentRoom.accessories
//       : currentRoom.equipment;

//     const existingItem = itemList.find((it) => it.id === selectedItem.id);
//     if (existingItem) {
//       existingItem.quantity += quantity; // Add to the quantity of existing items
//     } else {
//       itemList.push({ ...selectedItem, quantity }); // Add new item
//     }

//     setLocations(updatedLocations);
//     setSelectedItem(null);
//     alert(`${quantity} ${selectedItem.name} added to ${currentRoom.roomName}`);
//   };

//   const handleAddRoom = (floorIndex) => {
//     const updatedLocations = [...locations];
//     updatedLocations[floorIndex].rooms.push({
//       roomName: `Room ${updatedLocations[floorIndex].rooms.length + 1}`,
//       equipment: [],
//       accessories: [],
//     });
//     setLocations(updatedLocations);
//   };

//   const handleAddFloor = () => {
//     setLocations([
//       ...locations,
//       {
//         floorName: `Floor ${locations.length + 1}`,
//         rooms: [{ roomName: "Room 1", equipment: [], accessories: [] }],
//       },
//     ]);
//   };

//   const handleCreateEstimate = async () => {
//     const equipmentItems = [];
//     const accessoryItems = [];

//     // Helper function to find and update existing items
//     const updateOrAddItem = (itemsArray, itemToAdd) => {
//       const existingItem = itemsArray.find((item) => item.id === itemToAdd.id);
//       if (existingItem) {
//         existingItem.quantity += itemToAdd.quantity;
//       } else {
//         itemsArray.push(itemToAdd);
//       }
//     };

//     // Iterate over each floor and room to gather all equipment and accessories
//     locations.forEach((floor) => {
//       floor.rooms.forEach((room) => {
//         room.equipment.forEach((eq) => {
//           updateOrAddItem(equipmentItems, { id: eq.id, quantity: eq.quantity });
//         });
//         room.accessories.forEach((acc) => {
//           updateOrAddItem(accessoryItems, {
//             id: acc.id,
//             quantity: acc.quantity,
//           });
//         });
//       });
//     });

//     // Prepare the estimate data with client details, collected items, and locations for the estimate data base
//     const estimateData = {
//       client_name: clientName,
//       client_address: clientAddress,
//       client_phone: clientPhone,
//       labor_hours: Number(laborHours),
//       labor_rate: 68, // fixed labor rate
//       tax_rate: 0.08875, // fixed tax rate
//       market_cap: parseFloat(marketCap).toFixed(2),
//       user_id: user?.id || 1,
//       details: {
//         floors: locations.map((floor) => ({
//           floor_name: floor.floorName,
//           rooms: floor.rooms.map((room) => ({
//             room_name: room.roomName,
//             equipment: room.equipment.map((eq) => ({
//               name: eq.name,
//               quantity: eq.quantity,
//             })),
//             accessories: room.accessories.map((acc) => ({
//               name: acc.name,
//               quantity: acc.quantity,
//             })),
//           })),
//         })),
//       },
//     };

//     // Send all the equipment and accessory data to the backend
//     const estimateResponse = await createItem(estimateEndPoint, {
//       estimateData,
//       equipmentItems,
//       accessoryItems,
//     });

//     if (estimateResponse.success) {
//       localStorage.removeItem("estimateProgress");
//       const estimateId = estimateResponse.payload.estimateId;
//       if (estimateId) {
//         const [estimateData, finalEstimateData] = await Promise.all([
//           fetchOneItem(estimateEndPoint, estimateId),
//           fetchOneItem(finalEstimateEndPoint, estimateId),
//         ]);
//         setEstimate(estimateData.payload);
//         setFinalEstimate(finalEstimateData.payload);
//       }
//     }
//   };
//   const saveEstimateProgress = () => {
//     const estimateProgress = {
//       clientName,
//       clientAddress,
//       clientPhone,
//       locations,
//       laborHours,
//       marketCap,
//     };

//     localStorage.setItem("estimateProgress", JSON.stringify(estimateProgress));
//     alert("Estimate progress has been saved!");
//   };

//   return (
//     <SemiEstimateContainer>
//       <Title>Create a New Estimate</Title>

//       <TextInput
//         type="text"
//         placeholder="Client Name"
//         value={clientName}
//         onChange={(e) => setClientName(e.target.value)}
//       />
//       <TextInput
//         type="text"
//         placeholder="Client Address"
//         value={clientAddress}
//         onChange={(e) => setClientAddress(e.target.value)}
//       />
//       <TextInput
//         type="text"
//         placeholder="Client Phone"
//         value={clientPhone}
//         onChange={(e) => setClientPhone(e.target.value)}
//       />

//       {/* Display for Floors, Rooms, and Items */}
//       <DisplaySquare>
//         {locations.map((floor, floorIndex) => (
//           <div key={floorIndex}>
//             <h3>{floor.floorName}</h3>
//             {floor.rooms.map((room, roomIndex) => (
//               <div key={roomIndex}>
//                 <h4>{room.roomName}</h4>
//                 <ul>
//                   {/* Displaying Equipment for the Room */}
//                   {room.equipment.length > 0 && <h5>Equipment:</h5>}
//                   {room.equipment.map((eq) => (
//                     <li key={eq.id}>
//                       {`${eq.name}  ${eq.brand} (${eq.quantity} pcs)`}
//                     </li>
//                   ))}

//                   {/* Displaying Accessories for the Room */}
//                   {room.accessories.length > 0 && <h5>Accessories:</h5>}
//                   {room.accessories.map((acc) => (
//                     <li key={acc.id}>
//                       {acc.name}: {acc.quantity} pcs
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         ))}
//       </DisplaySquare>

//       {locations.map((floor, floorIndex) => (
//         <div key={floorIndex}>
//           <TextInput
//             type="text"
//             placeholder={`Floor ${floorIndex + 1} Name`}
//             value={floor.floorName}
//             onChange={(e) => {
//               const updatedLocations = [...locations];
//               updatedLocations[floorIndex].floorName = e.target.value;
//               setLocations(updatedLocations);
//             }}
//           />
//           {floor.rooms.map((room, roomIndex) => (
//             <div key={roomIndex}>
//               <TextInput
//                 type="text"
//                 placeholder={`Room ${roomIndex + 1} Name`}
//                 value={room.roomName}
//                 onChange={(e) => {
//                   const updatedLocations = [...locations];
//                   updatedLocations[floorIndex].rooms[roomIndex].roomName =
//                     e.target.value;
//                   setLocations(updatedLocations);
//                 }}
//               />
//               {/* Highlight the currently active room */}
//               <StyledButton
//                 style={{
//                   backgroundColor:
//                     activeFloorIndex === floorIndex &&
//                     activeRoomIndex === roomIndex
//                       ? "#4CAF50"
//                       : "#ccc",
//                 }}
//                 onClick={() => {
//                   setActiveFloorIndex(floorIndex);
//                   setActiveRoomIndex(roomIndex);
//                 }}
//               >
//                 {activeFloorIndex === floorIndex &&
//                 activeRoomIndex === roomIndex
//                   ? `Adding items to ${room.roomName}`
//                   : `Add Items to this Room`}
//               </StyledButton>
//             </div>
//           ))}
//           <StyledButton onClick={() => handleAddRoom(floorIndex)}>
//             Add Room
//           </StyledButton>
//         </div>
//       ))}

//       <StyledButton onClick={handleAddFloor}>Add Floor</StyledButton>

//       {/* Selection of Equipment and Accessories */}
//       <SelectionButton
//         $active={!isAccessory}
//         onClick={() => setIsAccessory(false)}
//       >
//         Equipment
//       </SelectionButton>
//       <SelectionButton
//         $active={isAccessory}
//         onClick={() => setIsAccessory(true)}
//       >
//         Accessories
//       </SelectionButton>

//       {/* List of Items */}
//       <ItemListContainer>
//         {(isAccessory ? accessories : equipments).map((item) => (
//           <ItemButton key={item.id} onClick={() => handleSelectItem(item)}>
//             {item.name}
//             <br />
//             {item.brand}
//           </ItemButton>
//         ))}
//       </ItemListContainer>
//       {selectedItem && (
//         <OverlayContainer>
//           <SelectedItemContainer>
//             <p>Selected Item: {selectedItem.name}</p>
//             <NumberInput2
//               type="number"
//               value={quantity}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//               min="1"
//             />
//             <AddItemButton onClick={handleAddItem}>
//               Add {isAccessory ? "Accessory" : "Equipment"}
//             </AddItemButton>
//           </SelectedItemContainer>
//         </OverlayContainer>
//       )}
//       <InputRow>
//         <NumberInput
//           type="number"
//           placeholder="Labor Hours"
//           value={laborHours}
//           onChange={(e) => setLaborHours(e.target.value)}
//         />

//         <NumberInput
//           type="number"
//           placeholder="Market Cap"
//           value={marketCap}
//           onChange={(e) => setMarketCap(e.target.value)}
//         />
//       </InputRow>
//       <StyledButton onClick={saveEstimateProgress}>Save Progress</StyledButton>

//       <StyledButton onClick={handleCreateEstimate}>
//         Create Estimate
//       </StyledButton>
//       {estimate && finalEstimate && (
//         <SummarySection>
//           <h2>Estimate Summary</h2>
//           <SummaryItem>
//             <strong>Client Name:</strong> {estimate.client_name}
//           </SummaryItem>
//           <SummaryItem>
//             <strong>Client Address:</strong> {estimate.client_address}
//           </SummaryItem>
//           <SummaryItem>
//             <strong>Client Phone:</strong> {estimate.client_phone}
//           </SummaryItem>
//           <SummaryItem>
//             <strong>Equipment Cost:</strong> {finalEstimate.equipment_cost}
//           </SummaryItem>
//           <SummaryItem>
//             <strong>Accessories Cost:</strong> {finalEstimate.accessories_cost}
//           </SummaryItem>
//           <SummaryItem>
//             <strong>Tax:</strong> {finalEstimate.tax}
//           </SummaryItem>
//           <SummaryItem>
//             <strong>Labor Cost:</strong> {finalEstimate.labor_cost}
//           </SummaryItem>
//           <SummaryItem>
//             <strong>Subtotal:</strong> {finalEstimate.subtotal}
//           </SummaryItem>
//           <SummaryItem>
//             <strong>M/C:</strong> {estimate.market_cap}
//           </SummaryItem>
//           <SummaryItem>
//             <strong>Total Cost:</strong> {finalEstimate.total_cost}
//             <StyledLink to={`/estimates`}> Go to Estimates Page</StyledLink>
//           </SummaryItem>
//         </SummarySection>
//       )}
//     </SemiEstimateContainer>
//   );
// }

// export default SemiEstimate;
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../AuthContext";
import { fetchAllItems, createItem, fetchOneItem } from "../helpers/ApiCalls";
import {
  SemiEstimateContainer,
  Title,
  TextInput,
  NumberInput,
  ItemListContainer,
  ItemButton,
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
  LoadingOverlay, // new
  Spinner, // new
} from "../style/SemiEstimateStyled";
import { useParams } from "react-router-dom";
import { StyledLink } from "../style/FinalEstimateStyled";

function SemiEstimate() {
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
  const [marketCap, setMarketCap] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAccessory, setIsAccessory] = useState(false);
  const [estimate, setEstimate] = useState(null);
  const [finalEstimate, setFinalEstimate] = useState(null);
  const [activeFloorIndex, setActiveFloorIndex] = useState(0);
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [isCreating, setIsCreating] = useState(false); // new state
  const summaryRef = useRef(null);
  const { id } = useParams();

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
        setMarketCap(estimateData.marketCap || "");
      }
    };

    fetchData();
  }, [equipmentEndPoint, accessoryEndPoint]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setQuantity(1); // Initialize quantity
  };

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
    // hide loading overlay once complete
  };

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
          <div key={floorIndex}>
            <h3>{floor.floorName}</h3>
            {floor.rooms.map((room, roomIndex) => (
              <div key={roomIndex}>
                <h4>{room.roomName}</h4>
                <ul>
                  {/* Displaying Equipment for the Room */}
                  {room.equipment.length > 0 && <h5>Equipment:</h5>}
                  {room.equipment.map((eq) => (
                    <li key={eq.id}>
                      {`${eq.name}  ${eq.brand} (${eq.quantity} pcs)`}
                    </li>
                  ))}
                  {/* Displaying Accessories for the Room */}
                  {room.accessories.length > 0 && <h5>Accessories:</h5>}
                  {room.accessories.map((acc) => (
                    <li key={acc.id}>
                      {acc.name}: {acc.quantity} pcs
                    </li>
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
                  ? `Adding items to ${room.roomName}`
                  : `Add Items to this Room`}
              </StyledButton>
            </div>
          ))}
          <StyledButton onClick={() => handleAddRoom(floorIndex)}>
            Add Room
          </StyledButton>
        </div>
      ))}

      <StyledButton onClick={handleAddFloor}>Add Floor</StyledButton>

      {/* Selection of Equipment and Accessories */}
      <SelectionButton
        $active={!isAccessory}
        onClick={() => setIsAccessory(false)}
      >
        Equipment
      </SelectionButton>
      <SelectionButton
        $active={isAccessory}
        onClick={() => setIsAccessory(true)}
      >
        Accessories
      </SelectionButton>

      {/* List of Items */}
      <ItemListContainer>
        {(isAccessory ? accessories : equipments).map((item) => (
          <ItemButton key={item.id} onClick={() => handleSelectItem(item)}>
            {item.name}
            <br />
            {item.brand}
          </ItemButton>
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
            <AddItemButton onClick={handleAddItem}>
              Add {isAccessory ? "Accessory" : "Equipment"}
            </AddItemButton>
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

        <NumberInput
          type="number"
          placeholder="Market Cap"
          value={marketCap}
          onChange={(e) => setMarketCap(e.target.value)}
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
          <SummaryItem>
            <strong>Equipment Cost:</strong> {finalEstimate.equipment_cost}
          </SummaryItem>
          <SummaryItem>
            <strong>Accessories Cost:</strong> {finalEstimate.accessories_cost}
          </SummaryItem>
          <SummaryItem>
            <strong>Tax:</strong> {finalEstimate.tax}
          </SummaryItem>
          <SummaryItem>
            <strong>Labor Cost:</strong> {finalEstimate.labor_cost}
          </SummaryItem>
          <SummaryItem>
            <strong>Subtotal:</strong> {finalEstimate.subtotal}
          </SummaryItem>
          <SummaryItem>
            <strong>M/C:</strong> {estimate.market_cap}
          </SummaryItem>
          <SummaryItem>
            <strong>Total Cost:</strong> {finalEstimate.total_cost}
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
