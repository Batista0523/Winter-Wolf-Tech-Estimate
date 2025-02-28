
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

//   // Updated loadImage returns an object with data URL and dimensions.
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
//         resolve({
//           data: canvas.toDataURL("image/png"),
//           width: img.width,
//           height: img.height,
//         });
//       };
//     });
//   };

//   const generatePDFType1 = async () => {
//     const doc = new jsPDF({ format: "a4", unit: "pt" });
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const pageHeight = doc.internal.pageSize.getHeight();
//     const margin = 40;
//     let verticalPosition = margin;

//     // Load images
//     const winterWolfLogoObj = await loadImage("/LOGO.svg");
//     const logoBBB = await loadImage("/BBBlogo.svg");
//     const mitsubishiLogo = await loadImage("/mitsubishi1.svg");

//     // ─── Header with Centered WinterWolf Logo (Preserving Aspect Ratio) ─────────────
//     const headerHeight = 150; // increased header height for a larger display

//     // Calculate scaled dimensions to preserve aspect ratio with a larger logo
//     const maxLogoHeight = headerHeight * 0.9; // now 90% of header height
//     const scale = maxLogoHeight / winterWolfLogoObj.height;
//     const logoWidth = winterWolfLogoObj.width * scale;
//     const logoHeight = winterWolfLogoObj.height * scale;
//     const logoX = (pageWidth - logoWidth) / 2;
//     const logoY = (headerHeight - logoHeight) / 2;

//     doc.addImage(
//       winterWolfLogoObj.data,
//       "PNG",
//       logoX,
//       logoY,
//       logoWidth,
//       logoHeight
//     );
//     verticalPosition += 70;

//     // ─── Introductory Paragraph Box ─────────────────────
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(12);
//     doc.setTextColor("#404040");
//     const introText =
//       "We are pleased to present our proposal to install a high-efficiency Mitsubishi System at your residence. We understand the importance of maintaining a comfortable and energy-efficient environment and are committed to providing a seamless and compliant installation process.";
//     const introBoxHeight = 80;
//     doc.setFillColor(245, 245, 245);
//     doc.roundedRect(
//       margin,
//       verticalPosition,
//       pageWidth - 2 * margin,
//       introBoxHeight,
//       5,
//       5,
//       "F"
//     );
//     const introLines = doc.splitTextToSize(
//       introText,
//       pageWidth - 2 * margin - 20
//     );
//     doc.text(introLines, margin + 10, verticalPosition + 32);
//     verticalPosition += introBoxHeight + 20;

//     // ─── Separator Line ────────────────────────────────────
//     doc.setLineWidth(1);
//     doc.setDrawColor(24, 45, 64);
//     doc.line(margin, verticalPosition, pageWidth - margin, verticalPosition);
//     verticalPosition += 20;

//     // ─── Client Section ────────────────────────────────────
//     const clientBoxHeight = 60;
//     doc.setFillColor(240, 240, 240);
//     doc.roundedRect(
//       margin,
//       verticalPosition,
//       pageWidth - 2 * margin,
//       clientBoxHeight,
//       5,
//       5,
//       "F"
//     );
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.setTextColor(24, 45, 64);
//     doc.text(estimateItem.client_name, margin + 10, verticalPosition + 20);
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(12);
//     doc.setTextColor("#404040");
//     doc.text(estimateItem.client_address, margin + 10, verticalPosition + 40);
//     verticalPosition += clientBoxHeight + 20;

//     // ─── Project Details Section ──────────────────────────
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.setTextColor(24, 45, 64);
//     doc.text("Project Details", margin, verticalPosition);
//     verticalPosition += 10;
//     doc.setLineWidth(0.5);
//     doc.line(margin, verticalPosition, pageWidth - margin, verticalPosition);
//     verticalPosition += 20;
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(12);
//     doc.setTextColor("#404040");
//     if (estimateItem.details?.floors) {
//       estimateItem.details.floors.forEach((floor) => {
//         doc.setFont("helvetica", "bold");
//         doc.text(`${floor.floor_name}`, margin, verticalPosition);
//         verticalPosition += 16;
//         if (floor.rooms) {
//           floor.rooms.forEach((room) => {
//             doc.setFont("helvetica", "italic");
//             doc.text(`${room.room_name}`, margin + 20, verticalPosition);
//             verticalPosition += 14;
//             if (room.equipment && room.equipment.length > 0) {
//               room.equipment.forEach((item) => {
//                 doc.setFont("helvetica", "normal");
//                 doc.text(
//                   `- ${item.name} (x${item.quantity})`,
//                   margin + 40,
//                   verticalPosition
//                 );
//                 verticalPosition += 14;
//               });
//             }
//             verticalPosition += 10;
//           });
//         }
//         verticalPosition += 10;
//       });
//     } else {
//       doc.text("No project details available.", margin, verticalPosition);
//       verticalPosition += 16;
//     }
//     verticalPosition += 5;

//     // ─── Investment Cost Section ──────────────────────────
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.setTextColor(24, 45, 64);
//     doc.text("Investment Cost", margin, verticalPosition);
//     verticalPosition += 10;
//     doc.setLineWidth(0.5);
//     doc.line(margin, verticalPosition, pageWidth - margin, verticalPosition);
//     verticalPosition += 20;
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(12);
//     doc.setTextColor("#404040");
//     const costText = `${
//       finalEstimateData.total_cost
//         ? Number(finalEstimateData.total_cost).toLocaleString("en-US", {
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2,
//           })
//         : "N/A"
//     }`;
//     doc.text(costText, margin, verticalPosition);
//     verticalPosition += 30;

//     // ─── Warranty & Quality Guarantee Section ───────────
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.setTextColor(24, 45, 64);
//     doc.text("Warranty & Quality Guarantee", margin, verticalPosition);
//     verticalPosition += 10;
//     doc.setLineWidth(0.5);
//     doc.line(margin, verticalPosition, pageWidth - margin, verticalPosition);
//     verticalPosition += 20;
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(12);
//     doc.setTextColor("#404040");
//     const warrantyText =
//       "We stand firmly behind the quality of our work, offering an extensive warranty package: a one-year guarantee on all service repairs, a two-year warranty on installation work, and an exclusive 12-year warranty on compressors and parts for customers as part of our status as a Mitsubishi Electric Diamond Contractor ELITE.";
//     const warrantyLines = doc.splitTextToSize(
//       warrantyText,
//       pageWidth - margin * 2
//     );
//     doc.text(warrantyLines, margin, verticalPosition);
//     verticalPosition += warrantyLines.length * 14 + 20;

//     // ─── Footer with Company Logos ────────────────────────
//     const footerY = pageHeight - margin - 100;
//     doc.setLineWidth(1);
//     doc.setDrawColor(24, 45, 64);
//     doc.line(margin, footerY, pageWidth - margin, footerY);
//     verticalPosition = footerY + 20;
//     const logoWidthBBB = 160;
//     const logoHeightBBB = 90;
//     const logoWidthMitsubishi = 210;
//     const logoHeightMitsubishi = 80;
//     const spaceBetweenLogos = 20;
//     const totalLogosWidth =
//       logoWidthBBB + logoWidthMitsubishi + spaceBetweenLogos;
//     const logosX = (pageWidth - totalLogosWidth) / 2;
//     doc.addImage(
//       logoBBB.data,
//       "PNG",
//       logosX,
//       verticalPosition,
//       logoWidthBBB,
//       logoHeightBBB
//     );
//     doc.addImage(
//       mitsubishiLogo.data,
//       "PNG",
//       logosX + logoWidthBBB + spaceBetweenLogos,
//       verticalPosition,
//       logoWidthMitsubishi,
//       logoHeightMitsubishi
//     );

//     // ─── Generate and Display PDF ─────────────────────────
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

  // Load image and return data URL with dimensions.
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
        resolve({
          data: canvas.toDataURL("image/png"),
          width: img.width,
          height: img.height,
        });
      };
    });
  };

  const generatePDFType1 = async () => {
    const doc = new jsPDF({ format: "a4", unit: "pt" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;
    let verticalPosition = 0;

    // ─── Header Section ──────────────────────────────────────────────
    const headerHeight = 80;
    // Full-width header background in a professional dark blue
    doc.setFillColor(0); //24, 45, 64
    doc.rect(0, 0, pageWidth, headerHeight, "F");

    // Load images
    const winterWolfLogoObj = await loadImage("/LOGO.svg");
    const logoBBB = await loadImage("/BBBlogo.svg");
    const mitsubishiLogo = await loadImage("/mitsubishi1.svg");

    // Center main logo in header with proper scaling
    const maxLogoHeight = headerHeight * 2.8;
    const logoScale = maxLogoHeight / winterWolfLogoObj.height;
    const logoWidth = winterWolfLogoObj.width * logoScale;
    const logoHeight = winterWolfLogoObj.height * logoScale;
    const logoX = (pageWidth - logoWidth) / 2;
    const logoY = (headerHeight - logoHeight) / 2;
    doc.addImage(winterWolfLogoObj.data, "PNG", logoX, logoY, logoWidth, logoHeight);

    // Set starting position for body content (below header)
    verticalPosition = headerHeight + 60;

    // ─── Introductory Section ─────────────────────────────────────────
    doc.setFillColor(247, 247, 247);
    const introBoxHeight = 85;
    doc.rect(margin, verticalPosition, pageWidth - 2 * margin, introBoxHeight, "F");
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(50, 50, 50);
    const introText =
      "We are pleased to present our proposal to install a high-efficiency Mitsubishi System at your residence. We understand the importance of maintaining a comfortable and energy-efficient environment and are committed to providing a seamless and compliant installation process.";
    const introLines = doc.splitTextToSize(introText, pageWidth - 2 * margin - 20);
    doc.text(introLines, margin + 10, verticalPosition + 20);
    verticalPosition += introBoxHeight + 30;

    // ─── Client Section ──────────────────────────────────────────────
    const clientBoxHeight = 50;
    doc.setFillColor(247, 247, 247);
    doc.rect(margin, verticalPosition, pageWidth - 2 * margin, clientBoxHeight, "F");
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(24, 45, 64);
    doc.text(estimateItem.client_name, margin + 10, verticalPosition + 18);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.text(estimateItem.client_address, margin + 10, verticalPosition + 36);
    verticalPosition += clientBoxHeight + 30;

    // ─── Project Details Section ─────────────────────────────────────
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(24, 45, 64);
    doc.text("Project Details", margin, verticalPosition);
    verticalPosition += 10;
    doc.setLineWidth(0.8);
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, verticalPosition, pageWidth - margin, verticalPosition);
    verticalPosition += 20;
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    if (estimateItem.details?.floors) {
      estimateItem.details.floors.forEach((floor) => {
        doc.setFont("Helvetica", "bold");
        doc.text(floor.floor_name, margin, verticalPosition);
        verticalPosition += 16;
        if (floor.rooms) {
          floor.rooms.forEach((room) => {
            doc.setFont("Helvetica", "italic");
            doc.text(room.room_name, margin + 20, verticalPosition);
            verticalPosition += 14;
            if (room.equipment && room.equipment.length > 0) {
              room.equipment.forEach((item) => {
                doc.setFont("Helvetica", "normal");
                doc.text(`- ${item.name} (x${item.quantity})`, margin + 40, verticalPosition);
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

    // ─── Investment Cost Section ─────────────────────────────────────
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(24, 45, 64);
    doc.text("Investment Cost", margin, verticalPosition);
    verticalPosition += 10;
    doc.setLineWidth(0.8);
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, verticalPosition, pageWidth - margin, verticalPosition);
    verticalPosition += 20;
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    const costText = finalEstimateData.total_cost
      ? Number(finalEstimateData.total_cost).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "N/A";
    doc.text(costText, margin, verticalPosition);
    verticalPosition += 30;

    // ─── Warranty & Quality Guarantee Section ─────────────────────────
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(24, 45, 64);
    doc.text("Warranty & Quality Guarantee", margin, verticalPosition);
    verticalPosition += 10;
    doc.setLineWidth(0.8);
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, verticalPosition, pageWidth - margin, verticalPosition);
    verticalPosition += 20;
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    const warrantyText =
      "We stand firmly behind the quality of our work, offering an extensive warranty package: a one-year guarantee on all service repairs, a two-year warranty on installation work, and an exclusive 12-year warranty on compressors and parts for customers as part of our status as a Mitsubishi Electric Diamond Contractor ELITE.";
    const warrantyLines = doc.splitTextToSize(warrantyText, pageWidth - 2 * margin);
    doc.text(warrantyLines, margin, verticalPosition);
    verticalPosition += warrantyLines.length * 14 + 30;

    // ─── Footer Section ──────────────────────────────────────────────
    const footerHeight = 80;
    const footerY = pageHeight - footerHeight;
    doc.setLineWidth(1);
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, footerY, pageWidth - margin, footerY);

    // Center the secondary logos in the footer
    const logoWidthBBB = 120;
    const logoHeightBBB = 70;
    const logoWidthMitsubishi = 160;
    const logoHeightMitsubishi = 60;
    const spaceBetweenLogos = 30;
    const totalLogosWidth = logoWidthBBB + logoWidthMitsubishi + spaceBetweenLogos;
    const logosX = (pageWidth - totalLogosWidth) / 2;
    const logosY =
      footerY + (footerHeight - Math.max(logoHeightBBB, logoHeightMitsubishi)) / 2;
    doc.addImage(logoBBB.data, "PNG", logosX, logosY, logoWidthBBB, logoHeightBBB);
    doc.addImage(
      mitsubishiLogo.data,
      "PNG",
      logosX + logoWidthBBB + spaceBetweenLogos,
      logosY,
      logoWidthMitsubishi,
      logoHeightMitsubishi
    );

    // ─── Generate and Display PDF ─────────────────────────────────────
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
