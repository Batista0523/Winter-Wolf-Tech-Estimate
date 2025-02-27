// import React, { useState } from "react";
// import { jsPDF } from "jspdf";
// import {
//   PDFContainer,
//   StyledSelect,
//   StyledButtonG,
// } from "../style/PdfGenereStyled";

// function PDFGenerator({ estimateItem, finalEstimateData }) {
//   const [selectedType, setSelectedType] = useState("type1");
//   const [pdfUrl, setPdfUrl] = useState(null);

//   const loadImage = (url) => {
//     return new Promise((resolve) => {
//       const img = new Image();
//       img.src = url;
//       img.crossOrigin = "anonymous";
//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         canvas.width = img.width;
//         canvas.height = img.height;
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0);
//         resolve(canvas.toDataURL("image/png"));
//       };
//     });
//   };

//   const generatePDFType1 = async () => {
//     const doc = new jsPDF({ format: "a4", unit: "pt" });
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const margin = 50;
//     let verticalPosition = margin;

//     // Load logo images

//     const winterWolfLogo = await loadImage("/public/LOGO.svg");
//     const logoBBB = await loadImage("/public/BBBlogo.svg");
//     const mitsubishiLogo = await loadImage("/public/mitsubishi1.svg");
//     // Header section
//     const logoWidth = 180;
//     const logoHeight = 160;
//     const centerx = (pageWidth - logoWidth) / 2;
//     doc.addImage(winterWolfLogo, "SVG", centerx, 30, logoWidth, logoHeight);

//     //===========Code to add Estimate ID if requiere====================
//     // const estimateText = `Estimate ID: #${estimateItem.id}`;
//     // const textWidth = doc.getTextWidth(estimateText) + 20;
//     // const rectHeight = 30;

//     // const rectX = pageWidth - textWidth - margin;
//     // const rectY = verticalPosition - 15;

//     // doc.setDrawColor(24, 45, 64);
//     // doc.setLineWidth(1.5);
//     // doc.rect(rectX, rectY, textWidth, rectHeight);

//     // doc.setFont("helvetica", "bold");
//     // doc.setTextColor(24, 45, 64);
//     // doc.text(estimateText, rectX + 10, rectY + rectHeight / 2 + 5);

//     // doc.setFont("helvetica", "bold");
//     // doc.setTextColor(24, 45, 64);
//     // doc.text(estimateText, rectX + 10, rectY + rectHeight / 2 + 5);

//     // doc.setFont("helvetica", "bold");
//     // doc.setFontSize(22);
//     // doc.setTextColor("#182d40");
//     //=====================================================================
//     verticalPosition += 130;

//     // Professional Introduction
//     doc.setFontSize(14);
//     doc.setFont("helvetica", "normal");
//     doc.setTextColor("#404040");
//     doc.text(
//       "At Winter Wolf Tech, we are committed to excellence in HVAC solutions. We prioritize efficiency, reliability, and customer satisfaction, ensuring top-tier craftsmanship and cutting-edge technology.",
//       margin,
//       verticalPosition,
//       { maxWidth: pageWidth - margin * 2, align: "justify" }
//     );
//     verticalPosition += 70;

//     // Client Information
//     doc.setFontSize(16);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor("#182d40");
//     doc.text(`${estimateItem.client_name}`, margin, verticalPosition);
//     verticalPosition += 30;
//     doc.setFontSize(12);
//     doc.setFont("helvetica", "normal");

//     verticalPosition -= 18;

//     doc.setTextColor("#182d40");
//     verticalPosition += 15;
//     doc.setFontSize(14);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor("#404040");
//     doc.text("Property Address:", margin, verticalPosition);
//     doc.setTextColor("#404040");
//     doc.setFont("helvetica", "normal");
//     doc.text(
//       `${estimateItem.client_address}`,
//       margin,
//       (verticalPosition += 15)
//     );

//     verticalPosition += 40;

//     // Project Details
//     doc.setFontSize(16);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor("#182d40");
//     doc.text("Project Details:", margin, verticalPosition);
//     verticalPosition += 20;
//     doc.setFontSize(12);
//     doc.setFont("helvetica", "normal");

//     const pageHeight = doc.internal.pageSize.getHeight();
//     const maxHeight = pageHeight - margin;

//     if (estimateItem.details?.floors) {
//       estimateItem.details.floors.forEach((floor) => {
//         floor.rooms.forEach((room) => {
//           doc.setFontSize(14);
//           doc.setFont("helvetica", "bold");
//           doc.setTextColor("#404040");

//           // Check if adding the room name exceeds page height
//           if (verticalPosition + 30 > maxHeight) {
//             doc.addPage();
//             verticalPosition = margin; // Reset position for new page
//           }

//           doc.text(` ${room.room_name}`, margin, verticalPosition);
//           verticalPosition += 15;

//           room.equipment.forEach((item) => {
//             // Check if adding the equipment details exceeds page height
//             if (verticalPosition + 20 > maxHeight) {
//               doc.addPage();
//               verticalPosition = margin;
//             }

//             doc.setFont("helvetica", "normal");
//             doc.text(
//               `- Installation of (${item.quantity}) ${item.name}`,
//               margin + 20,
//               verticalPosition
//             );
//             verticalPosition += 15;
//           });

//           verticalPosition += 40; // Space after room details
//         });
//       });
//     }

//     // Investment Cost
//     doc.setFontSize(16);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor("#182d40");
//     doc.text("Investment Cost:", margin, verticalPosition);
//     verticalPosition += 20;
//     doc.setFontSize(12);
//     doc.setFont("helvetica", "normal");
//     doc.setTextColor("#404040");
//     doc.text(
//       `${
//         finalEstimateData.total_cost
//           ? Number(finalEstimateData.total_cost).toLocaleString("en-US", {
//               minimumFractionDigits: 2,
//               maximumFractionDigits: 2,
//             })
//           : "N/A"
//       }`,
//       margin,
//       verticalPosition
//     );

//     verticalPosition += 40;

//     // Warranty Information
//     doc.setFontSize(16);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor("#182d40");
//     doc.text("Warranty & Guarantee:", margin, verticalPosition);
//     verticalPosition += 20;
//     doc.setFontSize(12);
//     doc.setFont("helvetica", "normal");
//     doc.setTextColor("#404040");
//     doc.text(
//       "• 1-year guarantee on service repairs\n" +
//         "• 2-year warranty on installation\n" +
//         "• 12-year warranty on compressors and parts (Mitsubishi Elite Contractor)",
//       margin,
//       verticalPosition
//     );
//     // i need here to chnage based on project details contain if there is much information then this get smaller so i dont lose the pictures
//     verticalPosition += 100;

//     const logoWidthBBB = 90;
//     const logoHeightBBB = 80;

//     const logoWidthMitsubishi = 210;
//     const logoHeightMitsubishi = 80;

//     const totalLogosWidth = logoWidthBBB + logoWidthMitsubishi + 100;
//     const startX = (pageWidth - totalLogosWidth) / 2;

//     doc.addImage(
//       logoBBB,
//       "SVG",
//       startX,
//       verticalPosition,
//       logoWidthBBB,
//       logoHeightBBB
//     );

//     doc.addImage(
//       mitsubishiLogo,
//       "SVG",
//       startX + logoWidthBBB + 20,
//       verticalPosition,
//       logoWidthMitsubishi,
//       logoHeightMitsubishi
//     );

//     verticalPosition += logoHeightBBB + 20;

//     // Generate Blob and show in iframe
//     const pdfBlob = doc.output("blob");
//     const pdfUrl = URL.createObjectURL(pdfBlob);
//     setPdfUrl(pdfUrl);
//   };

//   return (
//     <PDFContainer>
//       <h2>Generate Estimate PDF</h2>
//       <StyledSelect
//         value={selectedType}
//         onChange={(e) => setSelectedType(e.target.value)}
//       >
//         <option value="type1">Type 1</option>
//       </StyledSelect>
//       <StyledButtonG onClick={generatePDFType1}>Preview PDF</StyledButtonG>
//       {pdfUrl && (
//         <iframe
//           src={pdfUrl}
//           width="100%"
//           height="600px"
//           style={{ border: "1px solid #ccc", marginTop: "20px" }}
//           title="Generated PDF"
//         ></iframe>
//       )}
//     </PDFContainer>
//   );
// }

// export default PDFGenerator;

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
    const winterWolfLogo = await loadImage("/public/LOGO.svg");
    const logoBBB = await loadImage("/public/BBBlogo.svg");
    const mitsubishiLogo = await loadImage("/public/mitsubishi1.svg");

    // ─── HEADER ───────────────────────────────────────────────
    const headerLogoWidth = 180;
    const headerLogoHeight = 160;
    const headerLogoX = (pageWidth - headerLogoWidth) / 2;
    doc.addImage(
      winterWolfLogo,
      "SVG",
      headerLogoX,
      verticalPosition,
      headerLogoWidth,
      headerLogoHeight
    );
    verticalPosition += headerLogoHeight + 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor("#182d40");
    doc.text("Winter Wolf Tech's Proposal", pageWidth / 2, verticalPosition, {
      align: "center",
    });
    verticalPosition += 30;

    // ─── INTRODUCTORY PARAGRAPH ──────────────────────────────
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#404040");
    doc.text(
      "At Winter Wolf Tech, we are committed to excellence in HVAC solutions. We prioritize efficiency, reliability, and customer satisfaction, ensuring top-tier craftsmanship and cutting-edge technology.",
      margin,
      verticalPosition,
      { maxWidth: pageWidth - margin * 2, align: "justify" }
    );
    verticalPosition += 50;

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
    verticalPosition += 70;

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
        doc.text(`Floor: ${floor.floor_name}`, margin, verticalPosition);
        verticalPosition += 16;
        if (floor.rooms) {
          floor.rooms.forEach((room) => {
            doc.setFont("helvetica", "italic");
            doc.text(`Room: ${room.room_name}`, margin + 20, verticalPosition);
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
    verticalPosition += 10;

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
    const logoWidthBBB = 90;
    const logoHeightBBB = 80;
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
