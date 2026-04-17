(function(){
            const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            const rosco = document.getElementById('rosco');
            const hub = document.getElementById('hub');
            const questionEl = document.getElementById('question');
            let current = null;

            const size = 520;
            const radius = size/2 - 70;
            rosco.style.width = size + 'px';
            rosco.style.height = size + 'px';

            letters.forEach((ltr,i)=>{
                const angle = (360 / letters.length) * i - 90;
                const rad = angle * Math.PI / 180;
                const x = (size/2) + radius * Math.cos(rad);
                const y = (size/2) + radius * Math.sin(rad);
                const span = document.createElement('button');
                span.className = 'letter';
                span.style.left = (x) + 'px';
                span.style.top = (y) + 'px';
                span.style.transform = 'translate(-50%,-50%) rotate(' + (angle+90) + 'deg)';
                span.textContent = ltr;
                span.setAttribute('data-letter', ltr);
                span.addEventListener('click', ()=>{
                    selectLetter(span);
                });
                rosco.appendChild(span);
            });

            function selectLetter(el){
                if(current) current.classList.remove('active');
                current = el;
                el.classList.add('active');
                const l = el.getAttribute('data-letter');
                questionEl.textContent = 'Pregunta para ' + l + ': (ejemplo) — palabra que empieza por ' + l;
            }
            document.getElementById('rightBtn').addEventListener('click', ()=> {
                if(!current) return;
                current.classList.add('right');
                questionEl.textContent = 'Acertaste la letra ' + current.getAttribute('data-letter');
                current.classList.remove('active');
                current = null;
            });
            document.querySelectorAll('.wrongBtn').forEach(btn => {
            btn.addEventListener('click', () => {
                    if(!current) return;
                    current.classList.add('wrong');
                    questionEl.textContent = 'Fallaste la letra ' + current.getAttribute('data-letter');
                    current.classList.remove('active');
                    current = null;
                });
            });
            // navegación por teclado
            document.addEventListener('keydown', (e)=>{
                if(!current) {
                    const first = document.querySelector('.letter:not(.right):not(.wrong):not(.passed)');
                    if(first) selectLetter(first);
                    return;
                }
                if(e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    navigate(1);
                } else if(e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    navigate(-1);
                } else if(e.key === 'Enter') {
                    document.getElementById('rightBtn').click();
                } else if(e.key === ' ') {
                    document.getElementById('passBtn').click();
                    e.preventDefault();
                }
            });

            function navigate(dir){
                const all = Array.from(document.querySelectorAll('.letter'));
                const idx = all.indexOf(current);
                let next = null;
                for(let i=1;i<=all.length;i++){
                    const cand = all[(idx + dir*i + all.length)%all.length];
                    if(!cand.classList.contains('right') && !cand.classList.contains('wrong') && !cand.classList.contains('passed')){
                        next = cand; break;
                    }
                }
                if(next) selectLetter(next);
            }
})();