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
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 50;
    let verticalPosition = margin;

    // Load images
    const winterWolfLogo = await loadImage("/LOGO.svg");
    const logoBBB = await loadImage("/BBBlogo.svg");
    const mitsubishiLogo = await loadImage("/mitsubishi1.svg");

    // ─── HEADER ───────────────────────────────────────────────
    const headerLogoWidth = 200;
    const headerLogoHeight = 180;
    const headerLogoX = (pageWidth - headerLogoWidth) / 2;
    doc.addImage(
      winterWolfLogo,
      "SVG",
      headerLogoX,
      verticalPosition,
      headerLogoWidth,
      headerLogoHeight
    );
    (verticalPosition += 150),
      // ─── INTRODUCTORY PARAGRAPH ──────────────────────────────
      doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#404040");
    doc.text(
      "We are pleased to present our proposal to install a high-efficiency Mitsubishi System at your residence. We understand the importance of maintaining a comfortable and enery-efficient environment and are committed to providing a seamless and compliant installation process.",
      margin,
      verticalPosition,
      { maxWidth: pageWidth - margin * 2, align: "justify" }
    );
    verticalPosition += 58;

    // ─── SEPARATOR LINE ───────────────────────────────────────
    doc.setLineWidth(1);
    doc.setDrawColor("#182d40");
    doc.line(margin, verticalPosition, pageWidth - margin, verticalPosition);
    verticalPosition += 20;

    // ─── CLIENT SECTION ───────────────────────────────────────
    // Display client's name and property address on a light-gray background.
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, verticalPosition, pageWidth - 2 * margin, 50, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor("#182d40");
    doc.text(estimateItem.client_name, margin + 10, verticalPosition + 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor("#404040");
    doc.text(estimateItem.client_address, margin + 10, verticalPosition + 40);
    verticalPosition += 78;

    // ─── PROJECT DETAILS ────────────────────────────────────
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor("#182d40");
    doc.text("Project Details", margin, verticalPosition);
    verticalPosition += 20;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor("#404040");

    if (estimateItem.details?.floors) {
      estimateItem.details.floors.forEach((floor) => {
        doc.setFont("helvetica", "bold");
        doc.text(`${floor.floor_name}`, margin, verticalPosition);
        verticalPosition += 16;
        if (floor.rooms) {
          floor.rooms.forEach((room) => {
            doc.setFont("helvetica", "italic");
            doc.text(`${room.room_name}`, margin + 20, verticalPosition);
            verticalPosition += 14;
            if (room.equipment && room.equipment.length > 0) {
              room.equipment.forEach((item) => {
                doc.setFont("helvetica", "normal");
                doc.text(
                  `- ${item.name} (x${item.quantity})`,
                  margin + 40,
                  verticalPosition
                );
                verticalPosition += 14;
              });
            }
            verticalPosition += 10;
          });
        }
        verticalPosition += 10;
      });
    } else {
      doc.text("No project details available.", margin, verticalPosition);
      verticalPosition += 16;
    }
    verticalPosition += 5;

    // ─── INVESTMENT COST ─────────────────────────────────────
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor("#182d40");
    doc.text("Investment Cost", margin, verticalPosition);
    verticalPosition += 20;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor("#404040");
    const costText = `${
      finalEstimateData.total_cost
        ? Number(finalEstimateData.total_cost).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : "N/A"
    }`;
    doc.text(costText, margin, verticalPosition);
    verticalPosition += 30;

    // ─── WARRANTY & QUALITY GUARANTEE ───────────────────────
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor("#182d40");
    doc.text("Warranty & Quality Guarantee", margin, verticalPosition);
    verticalPosition += 20;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor("#404040");
    const warrantyText =
      "We stand firmly behind the quality of our work, offering an extensive warranty package: a one-year guarantee on all service repairs, a two-year warranty on installation work, and an exclusive 12-year warranty on compressors and parts for customers as part of our status as a Mitsubishi Electric Diamond Contractor ELITE.";
    const warrantyLines = doc.splitTextToSize(
      warrantyText,
      pageWidth - margin * 2
    );
    doc.text(warrantyLines, margin, verticalPosition);
    verticalPosition += warrantyLines.length * 14 + 20;

    // ─── FOOTER: COMPANY LOGOS ───────────────────────────────
    const logoWidthBBB = 160;
    const logoHeightBBB = 90;
    const logoWidthMitsubishi = 210;
    const logoHeightMitsubishi = 80;
    const spaceBetweenLogos = 20;
    const totalLogosWidth =
      logoWidthBBB + logoWidthMitsubishi + spaceBetweenLogos;
    const logosX = (pageWidth - totalLogosWidth) / 2;
    if (verticalPosition + logoHeightBBB + margin > pageHeight) {
      verticalPosition = pageHeight - logoHeightBBB - margin;
    }
    doc.addImage(
      logoBBB,
      "SVG",
      logosX,
      verticalPosition,
      logoWidthBBB,
      logoHeightBBB
    );
    doc.addImage(
      mitsubishiLogo,
      "SVG",
      logosX + logoWidthBBB + spaceBetweenLogos,
      verticalPosition,
      logoWidthMitsubishi,
      logoHeightMitsubishi
    );

    // ─── GENERATE PDF ─────────────────────────────────────────
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
