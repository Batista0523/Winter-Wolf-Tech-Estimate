import React, { useState, useEffect } from "react";
import { fetchOneItem, deleteItem } from "../helpers/ApiCalls";
import { confirmAlert } from "react-confirm-alert";
import { useParams, useNavigate } from "react-router-dom";
import {
  EstimateContainer,
  ClientInfo,
  ClientInfoTitle,
  ClientDetail,
  JobBreakdown,
  JobTitle,
  StyledButton,
  FloorSection,
  FloorTitle,
  RoomSection,
  RoomTitle,
  ItemList,
  Item,
  CostBreakdown,
  CostTitle,
  CostDetail,
  EstimateListContainer,
  EstimateBox,
} from "../style/EstimateStyled";
import PDFGenerator from "../Components/PdfComponent";
import { StyledLink } from "../style/FinalEstimateStyled";

function OneEstimate() {
  const { id } = useParams();
  const [oneEstimate, setOneEstimate] = useState(null);
  const [oneFinalEstimate, setOneFinalEstimate] = useState(null);
  const endpointForFinalEstimate = import.meta.env.VITE_FINAL_ESTIMATE_ENDPOINT;
  const endpointForEstimate = import.meta.env.VITE_ESTIMATE_ENDPOINT;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [estimateData, finalEstimateData] = await Promise.all([
          fetchOneItem(endpointForEstimate, id),
          fetchOneItem(endpointForFinalEstimate, id),
        ]);
        if (estimateData.success && finalEstimateData.success) {
          setOneEstimate(estimateData.payload);
          setOneFinalEstimate(finalEstimateData.payload);
        } else {
          console.error("Error fetching estimate data", estimateData, finalEstimateData);
        }
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, [id, endpointForEstimate, endpointForFinalEstimate]);

  const handleDelete = (id) => {
    const deleteEndpoint = import.meta.env.VITE_ESTIMATE_ENDPOINT;
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this estimate?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const deleteResponse = await deleteItem(deleteEndpoint, id);
              if (deleteResponse.success) {
                alert("Estimate deleted successfully");
                navigate("/estimates");
              } else {
                console.error("Error deleting estimate", deleteResponse);
              }
            } catch (err) {
              console.error("Error deleting estimate", err);
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
    <EstimateContainer>
      <EstimateListContainer>
        <EstimateBox>
          {oneEstimate ? (
            <ClientInfo>
              <ClientDetail>
                <strong>Estimate ID:</strong> {oneEstimate.id}
              </ClientDetail>
              <ClientInfoTitle>Client Information</ClientInfoTitle>
              <ClientDetail>
                <strong>Name:</strong> {oneEstimate.client_name}
              </ClientDetail>
              <ClientDetail>
                <strong>Address:</strong> {oneEstimate.client_address}
              </ClientDetail>
              <ClientDetail>
                <strong>Phone:</strong> {oneEstimate.client_phone}
              </ClientDetail>
            </ClientInfo>
          ) : (
            <p>No estimate available</p>
          )}
          <JobBreakdown>
            <JobTitle>Jobs Breakdown</JobTitle>
            {oneEstimate &&
              oneEstimate.details &&
              oneEstimate.details.floors &&
              oneEstimate.details.floors.map((floor, floorIndex) => (
                <FloorSection key={`floor-${floorIndex}-${floor.floor_name}`}>
                  <FloorTitle>Floor: {floor.floor_name}</FloorTitle>
                  {floor.rooms &&
                    floor.rooms.map((room, roomIndex) => (
                      <RoomSection key={`room-${roomIndex}-${room.room_name}`}>
                        <RoomTitle>Room: {room.room_name}</RoomTitle>
                        {room.equipment && room.equipment.length > 0 && (
                          <div>
                            <strong>Equipment:</strong>
                            <ItemList>
                              {room.equipment.map((equipment, equipmentIndex) => (
                                <Item key={`equipment-${equipmentIndex}-${equipment.name}`}>
                                  {equipment.name} (x{equipment.quantity})
                                </Item>
                              ))}
                            </ItemList>
                          </div>
                        )}
                        {room.accessories && room.accessories.length > 0 && (
                          <div>
                            <strong>Accessories:</strong>
                            <ItemList>
                              {room.accessories.map((accessory, accessoryIndex) => (
                                <Item key={`accessory-${accessoryIndex}-${accessory.name}`}>
                                  {accessory.name} (x{accessory.quantity})
                                </Item>
                              ))}
                            </ItemList>
                          </div>
                        )}
                      </RoomSection>
                    ))}
                </FloorSection>
              ))}
          </JobBreakdown>
          <CostBreakdown>
            <CostTitle>Cost Breakdown</CostTitle>
            {oneFinalEstimate && oneEstimate ? (
              <>
                <CostDetail>
                  <strong>Equipment Cost:</strong> ${oneFinalEstimate.equipment_cost}
                </CostDetail>
                <CostDetail>
                  <strong>Accessories Cost:</strong> ${oneFinalEstimate.accessories_cost}
                </CostDetail>
                <CostDetail>
                  <strong>Tax - 8.875%:</strong> ${oneFinalEstimate.tax}
                </CostDetail>
                <CostDetail>
                  <strong>Labor Cost:</strong> ${oneFinalEstimate.labor_cost}
                </CostDetail>
                <CostDetail>
                  <strong>Subtotal:</strong> ${oneFinalEstimate.subtotal}
                </CostDetail>
                <CostDetail>
                  <strong>M/C:</strong> ${oneEstimate.market_cap}
                </CostDetail>
                <CostDetail>
                  <strong>Investment Cost:</strong> $
                  {oneFinalEstimate.total_cost
                    ? Number(oneFinalEstimate.total_cost).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "N/A"}
                </CostDetail>
              </>
            ) : (
              <p>No cost data available</p>
            )}
          </CostBreakdown>
          <PDFGenerator
            estimateItem={oneEstimate}
            finalEstimateData={oneFinalEstimate}
          />
          <StyledLink to="/estimates">Back To Estimates</StyledLink>
          {oneEstimate && (
            <>
              <StyledButton onClick={() => handleDelete(oneEstimate.id)}>
                Delete Estimate
              </StyledButton>
              <StyledLink to={`/updateEstimate/${oneEstimate.id}`}>
                Update Estimate
              </StyledLink>
            </>
          )}
        </EstimateBox>
      </EstimateListContainer>
    </EstimateContainer>
  );
}

export default OneEstimate;
