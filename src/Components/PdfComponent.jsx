import React, { useState } from "react";
import { jsPDF } from "jspdf";
import {
  PDFContainer,
  StyledSelect,
  StyledButtonG,
} from "../style/PdfGenereStyled";

function PDFGenerator({ estimateItem, finalEstimateData }) {
  const [selectedType, setSelectedType] = useState("type1");

  // Function to generate Type 1 PDF
  const generatePDFType1 = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "pt",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;
    let verticalPosition = margin;

    // Define colors
    const primaryColor = "#182d40"; // Dark blue for headers
    const secondaryColor = "#f1f1f1"; // Light gray for table headers
    const textColor = "#404040"; // Dark gray for text
    const separatorColor = "#d1d1d1"; // Light gray for line separator

    // Title Header - Proposal Introduction
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(primaryColor);
    doc.text(
      "Proposal from Winter Wolf Tech",
      pageWidth / 2,
      verticalPosition,
      { align: "center" }
    );

    verticalPosition += 30;

    // Subtitle
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(textColor);
    doc.text(
      "We are pleased to submit our proposal to install a new, high-efficiency Mitsubishi Hyper Heat system at your residence. We understand the importance of maintaining a comfortable and energy-efficient environment and are committed to providing a seamless and compliant process.",
      margin,
      verticalPosition,
      { maxWidth: pageWidth - margin * 2, align: "justify" }
    );

    verticalPosition += 60;

    // Client Information Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor);
    doc.text("Client Information", margin, verticalPosition);

    verticalPosition += 20;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(textColor);
    doc.text(`Estimate ID: ${estimateItem.id}`, margin, verticalPosition);
    verticalPosition += 15;
    doc.text(`Client Name: ${estimateItem.client_name}`, margin, verticalPosition);
    verticalPosition += 15;
    doc.text(`Client Address: ${estimateItem.client_address}`, margin, verticalPosition);
    verticalPosition += 15;
    doc.text(`Client Phone: ${estimateItem.client_phone}`, margin, verticalPosition);

    verticalPosition += 25;

    // Project Details Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor);
    doc.text("Project Details", margin, verticalPosition);

    verticalPosition += 20;

    // Table Headers
    doc.setFillColor(secondaryColor);
    doc.rect(margin, verticalPosition - 15, pageWidth - margin * 2, 20, "F");

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(textColor);
    doc.text("Floor", margin + 10, verticalPosition);
    doc.text("Room", margin + 100, verticalPosition);
    doc.text("Equipments / Materials", margin + 200, verticalPosition);
    doc.text("Quantity", pageWidth - margin - 80, verticalPosition);

    verticalPosition += 20;

    doc.setFont("helvetica", "normal");

    // Project Details Content with Floors and Rooms
    if (estimateItem.details?.floors) {
      estimateItem.details.floors.forEach((floor) => {
        // Display Floor Title
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(primaryColor);
        doc.text(floor.floor_name, margin + 10, verticalPosition);
        verticalPosition += 15;

        floor.rooms.forEach((room) => {
          // Display Room Title only once, then list all items (equipment and accessories) under it
          doc.setFont("helvetica", "normal");
          doc.setTextColor(textColor);
          doc.text(room.room_name, margin + 100, verticalPosition);

          // Loop through both equipment and accessories for each room
          const items = [...room.equipment, ...room.accessories];

          items.forEach((item, index) => {
            if (index > 0) {
              // Indent items under the room name
              verticalPosition += 15;
              doc.text("", margin + 100, verticalPosition); // Leave room name blank for subsequent items
            }

            // Display item name and quantity
            doc.text(item.name, margin + 200, verticalPosition);
            doc.text(
              `${item.quantity}`,
              pageWidth - margin - 60,
              verticalPosition,
              { align: "right" }
            );
          });

          verticalPosition += 15; // Additional space after listing items

          // Add a separator line after each room for clarity
          doc.setDrawColor(separatorColor);
          doc.setLineWidth(0.5);
          doc.line(
            margin,
            verticalPosition,
            pageWidth - margin,
            verticalPosition
          );

          verticalPosition += 10; // Space below line separator
        });

        verticalPosition += 10; // Space between floors
      });
    }

    verticalPosition += 25;

    // Investment Cost Section
    if (verticalPosition > pageHeight - 160) {
      doc.addPage();
      verticalPosition = margin;
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor);
    doc.text("Investment Cost", margin, verticalPosition);

    verticalPosition += 20;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(textColor);
    doc.text(`Investment Cost: `, margin, verticalPosition);
    doc.setFont("helvetica", "bold");
    doc.text(
      `$${finalEstimateData.total_cost || "N/A"}`,
      margin + 110,
      verticalPosition
    );

    verticalPosition += 25;

    // Included Services Section
    if (verticalPosition > pageHeight - 160) {
      doc.addPage();
      verticalPosition = margin;
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor);
    doc.text("Included Services", margin, verticalPosition);

    verticalPosition += 20;

    const includedServicesText = `The project encompasses a comprehensive suite of services, including installation of refrigeration piping supports, copper piping, insulation, and accessories; vacuum and leak testing with dry nitrogen; PVC piping for condensate drains; standalone controls; control wiring for all Mitsubishi units; thorough material delivery; site protection; cleaning of any affected areas; line hide for exterior piping; and electrical work.

Commissioning and Quality Assurance: Upon installation, our expert team will conduct a commissioning and testing process to ensure flawless operation.`;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(textColor);
    doc.text(includedServicesText, margin, verticalPosition, {
      maxWidth: pageWidth - margin * 2,
      align: "justify",
    });

    verticalPosition += 20;

    // Footer - Warranty and Quality Guarantee
    if (verticalPosition > pageHeight - 70) {
      doc.addPage();
      verticalPosition = margin;
    }

    doc.setFillColor(primaryColor);
    doc.rect(0, pageHeight - 70, pageWidth, 70, "F");

    const footerText = `Warranty and Quality:
We stand firmly behind the quality of our work, offering:
- 1-year guarantee on all service repairs
- 2-year warranty on installation work
- 12-year warranty on compressors and parts, as a Mitsubishi Electric Diamond Contractor ELITE`;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(255, 255, 255);
    doc.text(footerText, margin, pageHeight - 60, {
      maxWidth: pageWidth - margin * 2,
      align: "left",
    });

    // Save the PDF
    doc.save(`Estimate_${estimateItem.id}.pdf`);
};


  // Function to generate Type 2 PDF
  const generatePDFType2 = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "pt",
    });
    doc.text("Summary Estimate Report (Type 2)", 20, 20);
    doc.text(`Client Name: ${estimateItem.client_name}`, 20, 40);
    // Add more summarized content for PDF type 2...
    doc.save(`Estimate_Type2_${estimateItem.id}.pdf`);
  };

  // Function to generate Type 3 PDF
  const generatePDFType3 = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "pt",
    });
    doc.text("Custom Estimate Report (Type 3)", 20, 20);
    doc.text(`Client Name: ${estimateItem.client_name}`, 20, 40);
    // Add different content for PDF type 3...
    doc.save(`Estimate_Type3_${estimateItem.id}.pdf`);
  };

  // Function to handle PDF generation based on selected type
  const handleGeneratePDF = () => {
    if (selectedType === "type1") {
      generatePDFType1();
    } 
  };

  return (
    <PDFContainer>
      <h3>Select PDF Version</h3>
      <StyledSelect
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="type1">Clients Version</option>
      


      
      </StyledSelect>
      <StyledButtonG onClick={handleGeneratePDF}>Generate PDF</StyledButtonG>
    </PDFContainer>
  );
}

export default PDFGenerator;
