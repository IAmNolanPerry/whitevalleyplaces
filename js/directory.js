let data, current = 'all';
fetch('https://inthevalley.link/places/directory.json').catch(() => fetch('https://inthevalley.link/places/directory.json')).then(r => r.json()).then(j => {
    data = j;
    nav();
    render();
});

function nav() {
    const n = document.getElementById('directory-nav');
    n.innerHTML = '<button class="active" data-id="all">All Places</button>' + data.categories.map(c => `<button data-id="${c.id}">${c.name}</button>`).join('');
    n.querySelectorAll('button').forEach(b => b.onclick = () => {
        n.querySelectorAll('button').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        current = b.dataset.id;
        render();
    });
}

function render() {
    const d = document.getElementById('directory-content');
    d.innerHTML = '';

    data.categories.forEach(c => {

        if (current != 'all' && current != c.id) return;

        let h = `<h2 class="category-title"><i class="fas ${c.icon}"></i>  ${c.name}</h2>`;

        c.places.forEach(p => h += `
            <div class="place-card">
                <img src="${p.image}">
                <div class="place-info">
                    <div class="place-name">${p.name}</div>

                    <p><b>Address:</b> ${p.address}</p>

                    <p><b>SLURL:</b>
                        <a href="${p.slurl}">
                            Visit
                        </a>
                    </p>

                    <p><b>Community:</b> ${p.community}</p>

                    <p><b>Roleplay Contact:</b> ${p.contact}</p>

                    <p><b>Telephone:</b> ${p.phone}</p>

                    <p>${p.description}</p>

                </div>
            </div>
        `);

        d.innerHTML += h;
    });
}