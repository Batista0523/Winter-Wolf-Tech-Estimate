import React, { useState } from "react";
import { jsPDF } from "jspdf";
import {
  PDFContainer,
  StyledSelect,
  StyledButtonG,
} from "../style/PdfGenereStyled";

function PDFGenerator({ estimateItem, finalEstimateData }) {
  const [selectedType, setSelectedType] = useState("type1");
  const [pdfUrl, setPdfUrl] = useState(null);

  const loadImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
    });
  };

  const generatePDFType1 = async () => {
    const doc = new jsPDF({ format: "a4", unit: "pt" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 50;
    let verticalPosition = margin;

    // Load logo images
    const winterWolfLogo = await loadImage("/public/LOGO.svg");
    const logoBBB = await loadImage("/public/BBBlogo.svg");
    const mitsubishiLogo = await loadImage("/public/mitsubishi1.svg");
    // Header section
    doc.addImage(winterWolfLogo, "PNG", margin, 20, 160, 130);
    doc.text(`Estimate ID:  #${estimateItem.id}`, margin, verticalPosition);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor("#182d40");
    // doc.text("Winter Wolf Tech - Premium HVAC Solutions", pageWidth / 2, 60, {
    //   align: "center",
    // });
    verticalPosition += 160;

    // Professional Introduction
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#404040");
    doc.text(
      "At Winter Wolf Tech, we are committed to excellence in HVAC solutions. We prioritize efficiency, reliability, and customer satisfaction, ensuring top-tier craftsmanship and cutting-edge technology.",
      margin,
      verticalPosition,
      { maxWidth: pageWidth - margin * 2, align: "justify" }
    );
    verticalPosition += 80;

    // Client Information
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#182d40");
    doc.text("Client Information:", margin, verticalPosition);
    verticalPosition += 20;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    
    // doc.text(`Estimate ID: ${estimateItem.id}`, margin, verticalPosition);
    verticalPosition += 15;
    doc.text(
      `Client Name: ${estimateItem.client_name}`,
      margin,
      verticalPosition
    );
    verticalPosition += 15;
    doc.text(
      `Client Address: ${estimateItem.client_address}`,
      margin,
      verticalPosition
    );
    verticalPosition += 15;
    doc.text(
      `Client Phone: ${estimateItem.client_phone}`,
      margin,
      verticalPosition
    );
    verticalPosition += 25;

    // Project Details
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#182d40");
    doc.text("Project Details:", margin, verticalPosition);
    verticalPosition += 20;

    if (estimateItem.details?.floors) {
      estimateItem.details.floors.forEach((floor) => {
        floor.rooms.forEach((room) => {
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.setTextColor("#404040");
          doc.text(` ${room.room_name}`, margin, verticalPosition);
          verticalPosition += 15;
          room.equipment.forEach((item) => {
            doc.setFont("helvetica", "normal");
            doc.text(
              `- Installation of (${item.quantity}) ${item.name}  `,
              margin + 20,
              verticalPosition
            );
            verticalPosition += 15;
          });
          verticalPosition += 10;
        });
      });
    }

    // Investment Cost
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#182d40");
    doc.text("Investment Cost:", margin, verticalPosition);
    verticalPosition += 20;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#404040");
    doc.text(
      `$${finalEstimateData.total_cost || "N/A"}`,
      margin,
      verticalPosition
    );
    verticalPosition += 40;

    // Warranty Information
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#182d40");
    doc.text("Warranty & Guarantee", margin, verticalPosition);
    verticalPosition += 20;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#404040");
    doc.text(
      "• 1-year guarantee on service repairs\n" +
        "• 2-year warranty on installation\n" +
        "• 12-year warranty on compressors and parts (Mitsubishi Elite Contractor)",
      margin,
      verticalPosition
    );
    verticalPosition += 60;

    let aspectRatio = 150 / 80;
    let newHeight = 260;
    let newWidth = newHeight * aspectRatio;
    
    let aspectRatio1 = 100 / 80;
    let newHeight1 = 190;
    let newWidth1 = newHeight1 * aspectRatio1;
    
    // Adjust vertical position to place Mitsubishi logo first
    verticalPosition -= 90; // Move up before placing the logo
    
    // Add Mitsubishi Logo on Top
    doc.addImage(
      mitsubishiLogo,
      "SVG",
      pageWidth / 2 - newWidth1 / 2,
      verticalPosition,
      newWidth1,
      newHeight1
    );
    verticalPosition += 100; // Move down for BBB logo
    
    // Add BBB Logo Below
    doc.addImage(
      logoBBB,
      "SVG",
      pageWidth / 2 - newWidth / 2,
      verticalPosition,
      newWidth,
      newHeight
    );
    

    // Generate Blob and show in iframe
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);
  };

  return (
    <PDFContainer>
      <h2>Generate Estimate PDF</h2>
      <StyledSelect
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="type1">Type 1</option>
      </StyledSelect>
      <StyledButtonG onClick={generatePDFType1}>Preview PDF</StyledButtonG>
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          style={{ border: "1px solid #ccc", marginTop: "20px" }}
          title="Generated PDF"
        ></iframe>
      )}
    </PDFContainer>
  );
}

export default PDFGenerator;
