document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.querySelector('.whatsapp-button');
    const whatsappLink = document.querySelector('.whatsapp-icon');
    const customDialog = document.getElementById('custom-dialog');
    const dialogMessage = document.getElementById('dialog-message');
    const dialogCancel = document.getElementById('dialog-cancel');
    const dialogConfirm = document.getElementById('dialog-confirm');
    const businessHoursStart = 10;  // 10 AM
    const businessHoursEnd = 18;    // 6 PM

    function isBusinessHours() {
        const currentDate = new Date();
        const currentDay = currentDate.getDay(); // 0: Sunday, 6: Saturday
        const currentHour = currentDate.getHours();
        return (currentDay >= 1 && currentDay <= 5) && (currentHour >= businessHoursStart && currentHour < businessHoursEnd);
    }

    function getNextBusinessDayMessage() {
        const currentDate = new Date();
        const currentDay = currentDate.getDay();
        const currentHour = currentDate.getHours();
        const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

        if (currentDay === 5 && currentHour >= businessHoursEnd) {
            return 'Hoy es viernes fuera de horario laboral. El próximo día hábil es el lunes de 10:00 a 18:00.';
        } else if (currentDay === 6) {
            return 'Hoy es sábado. El próximo día hábil es el lunes de 10:00 a 18:00.';
        } else if (currentDay === 0) {
            return 'Hoy es domingo. El próximo día hábil es el lunes de 10:00 a 18:00.';
        } else if (currentHour >= businessHoursEnd) {
            return `Hoy es ${daysOfWeek[currentDay]} fuera de horario laboral. Estaremos disponibles mañana de 10:00 a 18:00.`;
        } else if (currentHour < businessHoursStart) {
            return `Hoy es ${daysOfWeek[currentDay]} antes del horario laboral. Estaremos disponibles hoy de 10:00 a 18:00.`;
        }
    }

    function showCustomDialog(message) {
        dialogMessage.textContent = message;
        customDialog.style.display = 'block';
    }

    function hideCustomDialog() {
        customDialog.style.display = 'none';
    }

    dialogCancel.addEventListener('click', hideCustomDialog);
    dialogConfirm.addEventListener('click', function() {
        hideCustomDialog();
        window.open("https://wa.me/1234567890?text=Hola,%20quiero%20más%20información", '_blank');
    });

    // Mostrar el botón después de 10 segundos o después de hacer scroll
    setTimeout(() => {
        whatsappBtn.style.display = 'block';
    }, 10000);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            whatsappBtn.style.display = 'block';
        }
    });

    // Configurar enlace según el horario laboral
    if (isBusinessHours()) {
        whatsappLink.href = "https://wa.me/1234567890?text=Hola,%20quiero%20más%20información";
    } else {
        whatsappLink.href = "#";
        whatsappLink.addEventListener('click', function(event) {
            event.preventDefault();
            const message = `${getNextBusinessDayMessage()} ¿Deseas enviar el mensaje de todas formas?`;
            showCustomDialog(message);
        });
    }
});