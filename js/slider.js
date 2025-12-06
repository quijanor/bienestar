document.addEventListener('DOMContentLoaded', () => {
  try {
    const container = document.querySelector('.slider-container');
    const slidesEl = document.querySelector('.slider .slides');
    const slideItems = slidesEl ? Array.from(slidesEl.children) : [];
    const prevButtons = Array.from(document.querySelectorAll('[data-prev]'));
    const nextButtons = Array.from(document.querySelectorAll('[data-next]'));
    const dotElements = Array.from(document.querySelectorAll('.dots .dot'));
    const radioInputs = Array.from(
      document.querySelectorAll('.slider-container input[type="radio"]')
    );

    console.log('Slider init:', {
      container: !!container,
      slidesEl: !!slidesEl,
      slideCount: slideItems.length
    });

    if (!container || !slidesEl || slideItems.length === 0) {
      console.warn(
        'Slider: elementos clave no encontrados. Comprueba HTML/CSS.'
      );
      return;
    }

    let idx = 0;
    const total = slideItems.length;

    // Sin depender de porcentajes fijos: usamos 100% por slide
    function goTo(index) {
      idx = ((index % total) + total) % total;
      slidesEl.style.transform = `translateX(-${idx * 100}%)`;
      // activar clase en puntos
      dotElements.forEach((d, i) => d.classList.toggle('active', i === idx));
      // sincronizar radios (si existen)
      if (radioInputs && radioInputs[idx]) {
        radioInputs[idx].checked = true;
      }
      console.log('Slider -> goTo:', idx);
    }

    // Prev / Next
    prevButtons.forEach((btn) =>
      btn.addEventListener('click', () => goTo(idx - 1))
    );
    nextButtons.forEach((btn) =>
      btn.addEventListener('click', () => goTo(idx + 1))
    );

    // Dots como botones
    dotElements.forEach((dot, i) => {
      // si el dot es <label for="..."> el navegador ya cambia el radio; igual lo sincronizamos
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        goTo(i);
      });
    });

    // Radios: cuando cambian (por label click), actualizamos idx
    radioInputs.forEach((r, i) => {
      r.addEventListener('change', () => {
        if (r.checked) {
          goTo(i);
        }
      });
    });

    // Autoplay opcional
    let autoplay = true;
    const intervalMs = 4000;
    let timer = setInterval(() => {
      if (autoplay) goTo(idx + 1);
    }, intervalMs);

    container.addEventListener('mouseenter', () => (autoplay = false));
    container.addEventListener('mouseleave', () => (autoplay = true));

    // Touch/Swipe support para móviles
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      autoplay = false;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      autoplay = true;
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next slide
          goTo(idx + 1);
        } else {
          // Swipe right - previous slide
          goTo(idx - 1);
        }
      }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        goTo(idx - 1);
      } else if (e.key === 'ArrowRight') {
        goTo(idx + 1);
      }
    });

    // Inicializar: si hay un radio marcado, lo usamos; si no, 0
    const checkedRadio = radioInputs.find((r) => r.checked);
    if (checkedRadio) {
      idx = radioInputs.indexOf(checkedRadio);
    } else {
      idx = 0;
      if (radioInputs[0]) radioInputs[0].checked = true;
    }
    goTo(idx);

    // Exponer para debugging (opcional)
    window.__sliderDebug = {
      goTo,
      get index() {
        return idx;
      },
      total
    };
  } catch (err) {
    console.error('Slider error:', err);
  }
});
