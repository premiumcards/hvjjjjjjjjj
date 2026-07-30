const modal = document.querySelector('#modal');
const modalTitle = document.querySelector('#modal-title');
const modalCopy = document.querySelector('#modal-copy');

const modalContent = {
  access: ['Edition <em>request.</em>', 'This preview does not process payments. Contact BLACK Z support to ask about an edition.'],
  violet: ['Violet <em>Signal.</em>', 'A vivid first edition for people who choose to be seen.'],
  graphite: ['Graphite <em>Signal.</em>', 'A restrained, considered edition made for a quieter kind of presence.'],
  ice: ['Ice <em>Signal.</em>', 'A limited edition with a clean point of view and cool-toned energy.'],
  electric: ['Electric <em>Signal.</em>', 'A high-voltage edition created for movement after dark.'],
  ember: ['Ember <em>Signal.</em>', 'A warm, limited edition designed to leave a lasting mark.'],
  open: ['Make it <em>yours.</em>', 'The next BLACK Z edition begins with a fresh perspective.']
};

const cardCatalog = [
  { holder: 'Ethan Mercer', number: '1048', limit: '₹13,476', expiry: '06/2029', fee: '₹650', quantity: '12', category: 'core' },
  { holder: 'Emma Sterling', number: '2096', limit: '₹15,799', expiry: '08/2029', fee: '₹800', quantity: '8', category: 'core' },
  { holder: 'Liam Gallagher', number: '8899', limit: '₹19,660', expiry: '12/2029', fee: '₹1,000', quantity: '4', category: 'core', featured: true },
  { holder: 'Christopher Nolan', number: '3492', limit: '₹21,500', expiry: '04/2030', fee: '₹1,250', quantity: '9', category: 'limited' },
  { holder: 'Gabriel Dupont', number: '7744', limit: '₹23,456', expiry: '03/2030', fee: '₹1,550', quantity: '5', category: 'limited' },
  { holder: 'Adrian Sterling', number: '5511', limit: '₹33,496', expiry: '05/2030', fee: '₹2,250', quantity: '3', category: 'limited' },
  { holder: 'Lucas Kane', number: '6021', limit: '₹42,500', expiry: '10/2030', fee: '₹2,950', quantity: '2', category: 'open' },
  { holder: 'Thomas Shelby', number: '9900', limit: '₹56,742', expiry: '12/2030', fee: '₹3,700', quantity: '1', category: 'open' },
  { holder: 'Owen Cross', number: '0077', limit: '₹75,000', expiry: '01/2031', fee: '₹4,500', quantity: '1', category: 'open' }
];

const accessGrid = document.querySelector('.access-grid');
accessGrid.innerHTML = cardCatalog.map((card, index) => `
  <article class="access-card market-card ${card.featured ? 'featured' : ''}" data-category="${card.category}">
    ${card.featured ? '<p class="popular-tag">Most popular</p>' : ''}
    <p class="market-availability">Available</p>
    <button class="pass pass-market" type="button" aria-label="Flip BLACK Z edition ${index + 1}">
      <span class="pass-front">
        <span class="market-card-top"><i class="pass-chip"></i><small>↻&nbsp; Tap to flip</small></span>
        <strong class="market-brand">BLACK <em>Z</em></strong>
        <span class="market-number">•••• &nbsp;•••• &nbsp;•••• &nbsp;${card.number}</span>
        <span class="market-card-bottom"><small>Card Holder<b>${card.holder}</b></small><small>Valid Thru<b>${card.expiry}</b></small><strong>BLACK Z</strong></span>
      </span>
      <span class="pass-back"><small>BLACK Z / PRIVATE EDITION</small><strong>PREVIEW ONLY</strong><i></i><b>TAP TO RETURN</b></span>
    </button>
    <dl class="market-meta">
      <div><dt>Limit</dt><dd>${card.limit}</dd></div>
      <div><dt>Expiry</dt><dd>${card.expiry}</dd></div>
      <div><dt>Refund</dt><dd>Available</dd></div>
      <div><dt>Delivery</dt><dd>10 Mins</dd></div>
    </dl>
    <div class="market-fee"><small>Entry fee</small><strong>${card.fee}</strong><span>Qty : ${card.quantity}</span></div>
    <button
    class="market-preview buy-btn"
    type="button"
    data-index="${index}">
    Buy Now
</button>
  </article>
`).join('');

document.querySelectorAll('[data-open-modal]').forEach((button) => {
  button.addEventListener('click', () => {
    const content = modalContent[button.dataset.openModal] || modalContent.access;
    modalTitle.innerHTML = content[0];
    modalCopy.textContent = content[1];
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    setTimeout(() => modal.querySelector('.telegram-link').focus(), 180);
  });
});

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });

document.querySelectorAll('[data-scroll-to]').forEach((button) => {
  button.addEventListener('click', () => document.querySelector(`#${button.dataset.scrollTo}`).scrollIntoView({ behavior: 'smooth' }));
});

document.querySelectorAll('.pass').forEach((pass) => {
  pass.addEventListener('click', () => {
    if (!pass.classList.contains('pass-open')) pass.classList.toggle('is-flipped');
  });
});

document.querySelectorAll('.filter').forEach((filter) => {
  filter.addEventListener('click', () => {
    document.querySelector('.filter.active').classList.remove('active');
    filter.classList.add('active');
    document.querySelectorAll('.access-card').forEach((card) => {
      card.classList.toggle('hidden', filter.dataset.filter !== 'all' && card.dataset.category !== filter.dataset.filter);
    });
  });
});

window.addEventListener('pointermove', (event) => {
  const glow = document.querySelector('.cursor-glow');
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

document.querySelector('#year').textContent = new Date().getFullYear();
// ===============================
// BUY NOW BUTTON
// ===============================

document.querySelectorAll(".buy-btn").forEach(btn => {

    btn.addEventListener("click", function () {

        const card = cardCatalog[this.dataset.index];

        document.querySelector("#payAmount").innerText = card.fee;

        document.querySelector("#payCardHolder").innerText = card.holder;

        document.querySelector("#payLimit").innerText = card.limit;

        document.querySelector("#payExpiry").innerText = card.expiry;

        document.querySelector("#paymentModal").classList.add("open");

    });

});
//================ STEP 2 ==================

document.getElementById("goStep2").onclick=function(){

paymentStep1.style.display="none";

paymentStep2.style.display="block";

verifyAmount.innerText=payAmount.innerText;

verifyHolder.innerText=payCardHolder.innerText;

verifyLimit.innerText=payLimit.innerText;

}

//================ STEP 3 ==================

document.getElementById("goStep3").onclick=function(){

if(!agree.checked){

alert("Please confirm payment.");

return;

}

paymentStep2.style.display="none";

paymentStep3.style.display="block";

let p=0;

let timer=setInterval(()=>{

p++;

percent.innerHTML=p+"%";

if(p>=100){

clearInterval(timer);

paymentStep3.style.display="none";

paymentStep4.style.display="block";

pendingAmount.innerHTML=payAmount.innerHTML;

showUTR.innerHTML=utrNumber.value;

orderID.innerHTML="BZ"+Math.floor(Math.random()*999999);

}

},25);

}
