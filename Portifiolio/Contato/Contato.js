(function() {
    emailjs.init({
      publicKey: "OCJOc0G6Om4iEObv8", 
    });
})();

function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    
    if (isError) {
        toast.classList.add('error');
    } else {
        toast.classList.remove('error');
    }

    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 4000);
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const btn = document.getElementById('button');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    const serviceID = 'service_529h8lz';          
    const templateParaVoce = 'template_u184nja';        

    emailjs.sendForm(serviceID, templateParaVoce, this)
        .then(() => {
            btn.textContent = 'Enviar';
            btn.disabled = false;
            showToast('Mensagem enviada com sucesso! Responderei em breve...');
            document.getElementById('contact-form').reset(); 
        })
        .catch((err) => {
            btn.textContent = 'Enviar';
            btn.disabled = false;
            showToast('Erro ao enviar mensagem. Tente novamente.', true);
            console.error('Erro EmailJS:', err);
        });
});