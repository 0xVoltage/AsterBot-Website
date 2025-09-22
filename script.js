document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.querySelector('.coming-soon')) {
                return;
            }

            const targetTab = this.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

function calculateAirdrop() {
    const volume = parseFloat(document.getElementById('trading-volume').value) || 0;
    const days = parseInt(document.getElementById('days-active').value) || 0;
    const multiplier = parseFloat(document.getElementById('multiplier').value) || 1;

    if (volume === 0 || days === 0) {
        alert('Por favor, preencha todos os campos');
        return;
    }

    const basePoints = (volume / 1000) * days * 10;
    const totalPoints = Math.floor(basePoints * multiplier);

    const totalSupply = 1000000000;
    const airdropPercentage = 0.15;
    const userPercentage = totalPoints / 10000000;
    const expectedAllocation = Math.floor((totalSupply * airdropPercentage * userPercentage));

    const estimatedTokenPrice = 0.05;
    const estimatedValue = (expectedAllocation * estimatedTokenPrice).toFixed(2);

    document.getElementById('estimated-points').textContent = totalPoints.toLocaleString();
    document.getElementById('expected-allocation').textContent = expectedAllocation.toLocaleString() + ' tokens';
    document.getElementById('estimated-value').textContent = '$' + estimatedValue;

    document.getElementById('airdrop-result').style.display = 'block';
}

document.querySelectorAll('.notify-btn').forEach(button => {
    button.addEventListener('click', function() {
        const emailInput = this.previousElementSibling;
        const email = emailInput.value;

        if (!email || !email.includes('@')) {
            alert('Por favor, insira um email válido');
            return;
        }

        alert('Obrigado! Você será notificado quando o bot estiver disponível.');
        emailInput.value = '';
    });
});

document.querySelectorAll('.download-btn').forEach(button => {
    button.addEventListener('click', function() {
        alert('Download iniciado! O arquivo será baixado em breve.');
    });
});