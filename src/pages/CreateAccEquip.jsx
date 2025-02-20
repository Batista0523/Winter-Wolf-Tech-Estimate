import React, { useState } from "react";
import { createItem } from "../helpers/ApiCalls";
import {
  FormContainer,
  FormTitle,
  InputField,
  TextArea,
  SelectField,
  SubmitButton,
  SuccessMessage,
  ErrorMessage,
} from "../style/AccEquipStyled";

const CreateAccEquip = () => {
  const [itemType, setItemType] = useState("accessory"); // Either 'accessory' or 'equipment'
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use the correct endpoint based on the itemType
    const endpoint = itemType === "accessory" 
      ? import.meta.env.VITE_ACCESORIES_ENDPOINT 
      : import.meta.env.VITE_EQUIPMENTS_ENDPOINT;

    const data = {
      name,
      description,
      price,
    };

    // Add model_number and brand for equipment
    if (itemType === "equipment") {
      data.model_number = modelNumber;
      data.brand = brand;
    }

    try {
      const response = await createItem(endpoint, data);
      setSuccess(`Successfully added ${response.payload.name}`);
      alert('Item added succesfully')
      resetForm();
    } catch (err) {
      setError("Error adding item. Please try again.");
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setModelNumber("");
    setBrand("");
    setSuccess(null);
    setError(null);
  };

  return (
    <FormContainer>
      <FormTitle>Add New {itemType === "accessory" ? "Materials" : "Equipment"}</FormTitle>

      <form onSubmit={handleSubmit}>
        <SelectField value={itemType} onChange={(e) => setItemType(e.target.value)}>
          <option value="accessory">Materials</option>
          <option value="equipment">Equipment</option>
        </SelectField>

        <InputField
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <TextArea
          placeholder="eg. Pipe 3/8 or Ceiling cassette"
          value={description}
          
          onChange={(e) => setDescription(e.target.value)}
        />

        <InputField
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        {itemType === "equipment" && (
          <>
            <InputField
              type="text"
              placeholder="Model Number"
              value={modelNumber}
              onChange={(e) => setModelNumber(e.target.value)}
              required
            />
            <InputField
              type="text"
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </>
        )}

        <SubmitButton type="submit">Add {itemType === "accessory" ? "Accessory" : "Equipment"}</SubmitButton>
      </form>

      {success && <SuccessMessage>{success}</SuccessMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormContainer>
  );
};

export default CreateAccEquip;
