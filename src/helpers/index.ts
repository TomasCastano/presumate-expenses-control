export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount)
}

export function formatDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export function formatYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function formatDayAndMonth(date: Date): string {
    // Obtenemos el número del día (1, 2, 3...)
    const day = date.getDate();
    
    // Usamos el "traductor" nativo para obtener el nombre del mes en minúsculas
    const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date);

    // Unimos las piezas: "7 de febrero"
    return `${day} de ${monthName}`;
}