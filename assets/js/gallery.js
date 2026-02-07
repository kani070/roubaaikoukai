function openModal(imgSrc, title, artist) {
    const modal = document.getElementById('artModal');
    const modalImg = document.getElementById('modalImg');
    const caption = document.getElementById('modalCaption');

    modal.style.display = "block";
    modalImg.src = imgSrc;
    caption.innerHTML = `<span style="font-size: 1.2rem; letter-spacing:0.2em;">${title}</span><br><span style="color:#999; font-size:0.8rem;">${artist}</span>`;
    
    // スクロール禁止
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('artModal');
    modal.style.display = "none";
    
    // スクロール解除
    document.body.style.overflow = '';
}