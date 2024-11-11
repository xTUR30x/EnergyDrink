import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateUserOrdersReportPDF = (userOrdersData, userName) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Órdenes del Usuario ${userName}`, 14, 22);

    autoTable(doc, {
        head: [['ID', 'Fecha', 'Monto Total']],
        body: userOrdersData.map(order => [
            order.order_id,
            order.shipping_date,
            order.total_price 
        ]),
        startY: 30,
    });

    doc.save(`reporte_ordenes_${userName}.pdf`);
};