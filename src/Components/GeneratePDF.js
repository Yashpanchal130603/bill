import React from "react";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../Assets/email.png'; 
import './BillGenerator.css';

const GeneratePDF = ({ items, calculateTotalAmount }) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add logo
    const imgProps = doc.getImageProperties(logo);
    const imgWidth = 30; 
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width; 
    doc.addImage(logo, 'PNG', 14, 10, imgWidth, imgHeight);

  
    doc.setFontSize(16);
    doc.text("Your Company Name", 50, 15);
    doc.setFontSize(10);
    doc.text("xyz abc pqr,", 50, 21);
    doc.text("ANAND, GUJARAT, KARAMSAD", 50, 26);
    doc.text("Email: contact@.com | Phone:+91 9999999999", 50, 31);

    doc.setFontSize(18);
    doc.text("Bill", 14, imgHeight + 20);

    const tableColumn = ["#", "Item", "Quantity", "Price", "Total"];
    const tableRows = [];

    items.forEach((item, index) => {
      const itemData = [
        index + 1,
        item.item,
        item.quantity,
        `RS ${item.price}`,
        `RS ${item.quantity * item.price}`
      ];
      tableRows.push(itemData);
    });

    autoTable(doc, {
      startY: imgHeight + 30,
      head: [tableColumn],
      body: tableRows,
    });

    const totalAmount = calculateTotalAmount();
    doc.text(`Total Amount: RS ${totalAmount.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save("bill.pdf");
  };

return <button className="download-btn" onClick={handleDownloadPDF}>Download PDF</button>;

};

export default GeneratePDF;
