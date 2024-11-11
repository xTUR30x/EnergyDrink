// src/utils/pdfUtils.js
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Función para generar el reporte de productos
export const generateProductReportPDF = (productsData) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Reporte de Productos', 14, 22);

    autoTable(doc, {
        head: [['ID', 'Nombre', 'Stock', 'Precio', 'Descripción', 'Mililitros']],
        body: productsData.map(product => [
            product.beverage_id,
            product.beverage_name,
            product.beverage_stock,
            product.beverage_price,
            product.beverage_description,
            product.milliliters
        ]),
        startY: 30,
    });

    doc.save('reporte_productos.pdf'); // Descarga el PDF generado
};

// Función para generar el reporte de órdenes del usuario
export const generateUserOrdersReportPDF = (userOrdersData, userName) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Órdenes del Usuario ${userName}`, 14, 22);

    autoTable(doc, {
        head: [['ID', 'Fecha', 'Monto Total']],
        body: userOrdersData.map(order => [
            order.order_id,
            order.shipping_date, // Puedes ajustar esto según tus datos
            order.total_price // Asegúrate de que este campo esté presente en tu respuesta
        ]),
        startY: 30,
    });

    doc.save(`reporte_ordenes_${userName}.pdf`); // Descarga el PDF generado
};