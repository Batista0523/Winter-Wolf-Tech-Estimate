import React, { useEffect, useState } from "react";
import { fetchAllItems } from "../helpers/ApiCalls";
import { StyledLink } from "../style/FinalEstimateStyled";
import {
  EstimateContainer,
  Title,
  ClientInfo,
  ClientInfoTitle,
  ClientDetail,
  CostDetail,
  NoEstimateMessage,
  EstimateListContainer,
  EstimateBox,
  SearchBar,
  SearchOptions,
  Spinner
} from "../style/EstimateStyled";

function Estimates({ formatDateTime }) {
  const [estimates, setEstimates] = useState([]);
  const [filteredEstimates, setFilteredEstimates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("name"); 
  const [isLoading, setIsLoading] = useState(true);
  const estimateEndPoint = import.meta.env.VITE_ESTIMATE_ENDPOINT;
  const finalEstimateEndPoint = import.meta.env.VITE_FINAL_ESTIMATE_ENDPOINT;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [estimateResponse, finalEstimateResponse] = await Promise.all([
          fetchAllItems(estimateEndPoint),
          fetchAllItems(finalEstimateEndPoint),
        ]);

        if (estimateResponse.success && finalEstimateResponse.success) {
          const estimateData = estimateResponse.payload;
          const finalEstimateData = finalEstimateResponse.payload;

          const mergedEstimates = estimateData.map((estimateItem) => {
            const finalEstimate = finalEstimateData.find(
              (finalItem) => finalItem.estimate_id === estimateItem.id
            );
            return {
              ...estimateItem,
              finalEstimate,
            };
          });

          setEstimates(mergedEstimates);
          setFilteredEstimates(mergedEstimates);
        }
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        // Wait 3 seconds before showing the data
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchData();
  }, [estimateEndPoint, finalEstimateEndPoint]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    let filtered = [];
    if (searchBy === "id") {
      filtered = estimates.filter((estimate) =>
        estimate.id.toString().includes(value)
      );
    } else if (searchBy === "name") {
      filtered = estimates.filter((estimate) =>
        estimate.client_name.toLowerCase().includes(value.toLowerCase())
      );
    }

    setFilteredEstimates(filtered);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  return (
    <EstimateContainer>
      <Title>Estimate Details and Costs</Title>

      <SearchBar>
        <input
          type="text"
          placeholder={`Search Estimate by ${
            searchBy === "id" ? "Estimate ID" : "Client Name"
          }`}
          value={searchQuery}
          onChange={handleSearch}
          disabled={isLoading}
        />
      </SearchBar>
      <SearchOptions>
        <label>
          <input
            type="radio"
            name="searchBy"
            value="name"
            checked={searchBy === "name"}
            onChange={handleSearchByChange}
            disabled={isLoading}
          />
          Search by Client Name
        </label>
        <label>
          <input
            type="radio"
            name="searchBy"
            value="id"
            checked={searchBy === "id"}
            onChange={handleSearchByChange}
            disabled={isLoading}
          />
          Search by Estimate ID
        </label>
      </SearchOptions>

      {isLoading ? (
        <Spinner />
      ) : (
        <EstimateListContainer>
          {filteredEstimates.length > 0 ? (
            filteredEstimates.map((estimateItem, index) => (
              <EstimateBox key={index}>
                <StyledLink to={`/oneEstimate/${estimateItem.id}`}>
                  <ClientInfo>
                    <ClientInfoTitle>Client Information</ClientInfoTitle>
                    <ClientDetail>
                      <strong>Name:</strong> {estimateItem.client_name}
                    </ClientDetail>
                    <ClientDetail>
                      <strong>Address:</strong> {estimateItem.client_address}
                    </ClientDetail>
                    <ClientDetail>
                      <strong>Phone:</strong> {estimateItem.client_phone}
                    </ClientDetail>
                  </ClientInfo>
                </StyledLink>
                <CostDetail>
                  <strong>Investment Cost:</strong> $
                  {estimateItem.finalEstimate?.total_cost}
                </CostDetail>
                <ClientDetail>
                  <strong>Created On:</strong>{" "}
                  {formatDateTime(estimateItem.created_at)}
                </ClientDetail>
              </EstimateBox>
            ))
          ) : (
            <NoEstimateMessage>No estimates available</NoEstimateMessage>
          )}
        </EstimateListContainer>
      )}
    </EstimateContainer>
  );
}

export default Estimates;
